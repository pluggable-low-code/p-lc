import type {
  HardAs,
  LiteralObject,
  Point,
  Rectangle,
  ReturnValueFn,
} from '@p-lc/shared'
import {
  createPointByEventClient,
  distanceSquare,
  getClosestHtmlElementBy,
  zeroPoint,
} from '@p-lc/shared'
import { isNull, now } from 'lodash-uni'
import { action, autorun, makeObservable, observable } from 'mobx'
import type { Get } from 'type-fest'
import type {
  AnyEditorPlugin,
  Editor,
  EditorDefaultPropertiesExtHkt,
  EditorDefaultPropertiesExtHktPlugin,
  EditorRawPlugin,
} from '../../types'
import { type editorPluginEmitter } from '../editor-plugin-emitter'
import { type editorPluginRootHost } from '../editor-plugin-root-host'

/**
 * 编辑器拖放仓库插件属性扩展高等类型
 */
export interface EditorPluginDndStorePropertiesExtHkt<
  Plugin extends AnyEditorPlugin,
> {
  editor: {
    /**
     * 发射器事件
     */
    emitterEvents: {
      /**
       * 拖拽开始
       */
      dragStart: {
        /**
         * 实体
         */
        entity: DraggableEntity<Plugin>
        /**
         * 点
         */
        point: Point
      }
      /**
       * 拖拽移动
       */
      dragMove: {
        /**
         * 点
         */
        point: Point
        /**
         * 事件目标
         */
        target: EventTarget | null
      }
      /**
       * 拖拽移动带位置
       */
      dragMoveWithPos: {
        /**
         * 点
         */
        point: Point
        /**
         * 位置
         */
        pos: DroppablePosition<Plugin> | null
      }
      /**
       * 拖拽结束
       */
      dragEnd: void
    }
    /**
     * 拖放仓库
     */
    dndStore: {
      /**
       * 可拖拽实体，由其他插件扩展，只用于类型推导
       */
      draggableEntities: LiteralObject
      /**
       * 可放置位置，由其他插件扩展，只用于类型推导
       */
      droppablePositions: LiteralObject
      /**
       * 拖拽中的实体
       */
      draggingEntity: DraggableEntity<Plugin> | null
      /**
       * 准备距离
       */
      preparingDistance: number
      /**
       * 准备（拖拽）中
       */
      isPreparing: boolean
      /**
       * 拖拽中
       */
      isDragging: boolean
      /**
       * 拖拽中的点
       */
      draggingPoint: Point
      /**
       * 可放置选项映射表
       */
      droppableOptionsMap: Map<
        HTMLElement,
        ReturnValueFn<DroppableOptions<Plugin>>
      >
      /**
       * 悬浮的（可放置）位置
       */
      hoveringPosition: DroppablePosition<Plugin> | null
      /**
       * 可放置位置操作映射表
       */
      droppablePositionActionMap: Map<
        DroppablePositionType<Plugin>,
        DroppablePositionAction<Plugin>
      >
      /**
       * 自动滚动（判定）距离，默认：50
       */
      autoScrollDistance: number
      /**
       * 自动滚动速度，每秒滚动的像素值，默认：500
       */
      autoScrollSpeed: number
      /**
       * 拖拽开始
       * @param entity 实体
       * @param point 点
       */
      dragStart(entity: DraggableEntity<Plugin>, point: Point): void
      /**
       * 拖拽移动
       * @param point 点
       * @param target 事件目标
       */
      dragMove(point: Point, target: EventTarget | null): void
      /**
       * 拖拽结束
       */
      dragEnd(): void
      /**
       * 应该阻止点击事件，拖拽后产生的点击事件需要被阻止
       */
      shouldPreventClick(): boolean
      /**
       * 应该阻止点击事件时长，默认 100 毫秒
       */
      shouldPreventClickDuration: number
    }
  }
}

/**
 * 编辑器事件键值：拖拽开始
 */
export const EDITOR_EVENT_KEY_DRAG_START = 'dragStart'

/**
 * 编辑器事件键值：拖拽移动
 */
export const EDITOR_EVENT_KEY_DRAG_MOVE = 'dragMove'

/**
 * 编辑器事件键值：拖拽移动带位置
 */
export const EDITOR_EVENT_KEY_DRAG_MOVE_WITH_POS = 'dragMoveWithPos'

/**
 * 编辑器事件键值：拖拽结束
 */
export const EDITOR_EVENT_KEY_DRAG_END = 'dragEnd'

/**
 * 可拖拽实体基础部分
 */
export interface DraggableEntityBase {
  /**
   * 类型
   */
  type: string
}

/**
 * 可拖拽实体
 */
export type DraggableEntities<Plugin extends AnyEditorPlugin> = Get<
  Editor<Plugin>,
  ['dndStore', 'draggableEntities']
>

/**
 * 可拖拽实体
 */
export type DraggableEntity<Plugin extends AnyEditorPlugin> = HardAs<
  Get<DraggableEntities<Plugin>, [DraggableEntityType<Plugin>]>,
  DraggableEntityBase
>

/**
 * 可拖拽实体类型
 */
export type DraggableEntityType<Plugin extends AnyEditorPlugin> = HardAs<
  keyof DraggableEntities<Plugin>,
  string
>

/**
 * 可放置位置基础部分
 */
export interface DroppablePositionBase {
  /**
   * 类型
   */
  type: string
  /**
   * 边界
   */
  bounding: Rectangle
}

/**
 * 可放置位置
 */
export type DroppablePositions<Plugin extends AnyEditorPlugin> = Get<
  Editor<Plugin>,
  ['dndStore', 'droppablePositions']
>

/**
 * 可放置位置
 */
export type DroppablePosition<Plugin extends AnyEditorPlugin> = HardAs<
  Get<DroppablePositions<Plugin>, [DroppablePositionType<Plugin>]>,
  DroppablePositionBase
>

/**
 * 可放置位置类型
 */
export type DroppablePositionType<Plugin extends AnyEditorPlugin> = HardAs<
  keyof DroppablePositions<Plugin>,
  string
>

/**
 * 可放置位置操作
 */
export interface DroppablePositionAction<Plugin extends AnyEditorPlugin> {
  /**
   * 可放置位置操作
   * @param entity 实体
   * @param pos 位置
   */
  (entity: DraggableEntity<Plugin>, pos: DroppablePosition<Plugin>): void
}

/**
 * 可放置选项
 */
export interface DroppableOptions<Plugin extends AnyEditorPlugin> {
  /**
   * 计算悬浮的位置
   */
  calcHoveringPosition: CaclHoveringPosition<Plugin>
}

/**
 * 计算悬浮的位置，当拖拽到当前原生元素上方时会触发
 */
export interface CaclHoveringPosition<Plugin extends AnyEditorPlugin> {
  /**
   * 计算悬浮的位置，当拖拽到当前原生元素上方时会触发
   * @param entity 实体
   * @param point 鼠标悬浮的点
   * @param el HTML 元素
   * @returns 返回位置或 null 将不会继续遍历原生父元素
   */
  (
    entity: DraggableEntity<Plugin>,
    point: Point,
    el: HTMLElement,
  ): DroppablePosition<Plugin> | null | void
}

/**
 * EditorPluginDndStorePropertiesExtHkt 辅助类型
 */
export interface $EditorPluginDndStorePropertiesExtHkt
  extends EditorDefaultPropertiesExtHkt {
  type: EditorPluginDndStorePropertiesExtHkt<
    EditorDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 编辑器拖放仓库插件
 */
export const editorPluginDndStore: EditorRawPlugin<
  $EditorPluginDndStorePropertiesExtHkt,
  typeof editorPluginEmitter | typeof editorPluginRootHost
> = {
  id: 'dnd-store',
  initEditor(ctx) {
    const { emitter } = ctx
    const dndStore = (ctx.dndStore = {} as typeof ctx.dndStore)
    resetDraggingState()
    dndStore.preparingDistance = 10
    dndStore.draggingPoint = zeroPoint
    const droppableOptionsMap = (dndStore.droppableOptionsMap =
      new Map()) as typeof dndStore.droppableOptionsMap
    const droppablePositionActionMap = (dndStore.droppablePositionActionMap =
      new Map()) as typeof dndStore.droppablePositionActionMap
    dndStore.autoScrollDistance = 50
    dndStore.autoScrollSpeed = 500
    dndStore.dragStart = action((entity, point) => {
      resetDraggingState()
      dndStore.draggingEntity = entity
      dndStore.draggingPoint = point
      addDragEventListeners()
      emitter.emit(EDITOR_EVENT_KEY_DRAG_START, { entity, point })
    })
    dndStore.dragMove = action((point, target) => {
      emitter.emit(EDITOR_EVENT_KEY_DRAG_MOVE, { point, target })
      const entity = dndStore.draggingEntity
      if (!entity) {
        return
      }
      if (dndStore.isDragging) {
        dndStore.draggingPoint = point
      } else if (
        distanceSquare(point, dndStore.draggingPoint) >
        dndStore.preparingDistance ** 2
      ) {
        dndStore.isDragging = true
        dndStore.draggingPoint = point
      } else {
        return
      }
      let pos: typeof dndStore.hoveringPosition = null
      getClosestHtmlElementBy(target, (el) => {
        const p = droppableOptionsMap
          .get(el)?.()
          .calcHoveringPosition(entity, point, el)
        if (p || isNull(p)) {
          pos = p
          return true
        }
        return false
      })
      dndStore.hoveringPosition = pos
      emitter.emit(EDITOR_EVENT_KEY_DRAG_MOVE_WITH_POS, { point, pos })
    })
    dndStore.dragEnd = action(() => {
      const { draggingEntity, hoveringPosition, isDragging } = dndStore
      if (isDragging) {
        lastDragEndTime = now()
      }
      if (draggingEntity && hoveringPosition) {
        droppablePositionActionMap.get(hoveringPosition.type)?.(
          draggingEntity,
          hoveringPosition,
        )
      }
      resetDraggingState()
      removeDragEventListeners()
      emitter.emit(EDITOR_EVENT_KEY_DRAG_END)
    })
    makeObservable(dndStore, {
      draggingEntity: observable.ref,
      isPreparing: observable,
      isDragging: observable,
      draggingPoint: observable.ref,
      hoveringPosition: observable.ref,
    })
    const preventUserSelectDisposer = autorun(() => {
      document.body.style.userSelect = dndStore.draggingEntity ? 'none' : ''
    })
    let lastDragEndTime = 0
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    dndStore.shouldPreventClick = () => {
      const currentTime = now()
      const preventTime = lastDragEndTime + dndStore.shouldPreventClickDuration
      return currentTime < preventTime
    }
    dndStore.shouldPreventClickDuration = 100
    addClickEventListener()
    return () => {
      removeDragEventListeners()
      removeClickEventListener()
      preventUserSelectDisposer()
    }

    function resetDraggingState(): void {
      dndStore.draggingEntity = null
      dndStore.isPreparing = false
      dndStore.isDragging = false
      dndStore.hoveringPosition = null
    }

    function handleMouseMove(ev: MouseEvent): void {
      if (!ctx.elRoot) {
        // 没有挂载，取消事件处理
        return
      }
      const point = createPointByEventClient(ev)
      dndStore.dragMove(point, ev.target)
    }

    function handleMouseUp(): void {
      if (!ctx.elRoot) {
        // 没有挂载，取消事件处理
        return
      }
      dndStore.dragEnd()
    }

    function addDragEventListeners(): void {
      addEventListener('mousemove', handleMouseMove)
      addEventListener('mouseup', handleMouseUp)
    }

    function removeDragEventListeners(): void {
      removeEventListener('mousemove', handleMouseMove)
      removeEventListener('mouseup', handleMouseUp)
    }

    function handleWinClickCapture(ev: MouseEvent): void {
      if (!ctx.elRoot) {
        // 没有挂载，取消事件处理
        return
      }
      if (dndStore.shouldPreventClick()) ev.stopImmediatePropagation()
    }

    function addClickEventListener(): void {
      addEventListener('click', handleWinClickCapture, true)
    }

    function removeClickEventListener(): void {
      removeEventListener('click', handleWinClickCapture, true)
    }
  },
}
