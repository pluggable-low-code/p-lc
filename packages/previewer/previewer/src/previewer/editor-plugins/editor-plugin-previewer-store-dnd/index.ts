import type {
  DepPluginUniteEditorPlugin,
  DroppablePositionBase,
  EditorPlugin,
} from '@p-lc/editor'
import {
  DRAGGABLE_ENTITY_TYPE_ELEMENT,
  isDraggableElementOrComponent,
} from '@p-lc/editor'
import type { JsonPath } from '@p-lc/shared'
import {
  POSITION_TYPE_AFTER,
  POSITION_TYPE_BEFORE,
  POSITION_TYPE_BOTTOM,
  type POSITION_TYPE_LEFT,
  POSITION_TYPE_RIGHT,
  type POSITION_TYPE_TOP,
} from '@p-lc/shared'
import { DroppablePreviewerPositionRenderer } from './droppable-previewer-position-renderer'

export * from './droppable-previewer-position-renderer'

/**
 * 编辑器预览器仓库拖放插件属性扩展
 */
export interface EditorPluginPreviewerStoreDndPropertiesExt {
  editor: {
    /**
     * 拖放仓库
     */
    dndStore: {
      /**
       * 可放置位置
       */
      droppablePositions: {
        /**
         * 可放置预览器位置
         */
        [K in DroppablePositionTypePreviewer]: DroppablePreviewerPosition
      }
    }
  }
}

/**
 * 可放置预览器位置
 */
export type DroppablePreviewerPosition =
  | DroppablePreviewerPositionOuter
  | DroppablePreviewerPositionInner

/**
 * 可放置预览器位置基础部分
 */
export interface DroppablePreviewerPositionBase extends DroppablePositionBase {
  /**
   * 类型
   */
  type: DroppablePositionTypePreviewer
}

/**
 * 可放置预览器位置，外部
 */
export interface DroppablePreviewerPositionOuter
  extends DroppablePreviewerPositionBase {
  /**
   * 类型
   */
  type: DroppablePositionTypePreviewer
  /**
   * 顺序
   */
  order:
    | typeof POSITION_TYPE_TOP
    | typeof POSITION_TYPE_RIGHT
    | typeof POSITION_TYPE_BOTTOM
    | typeof POSITION_TYPE_LEFT
  /**
   * 元素 ID
   */
  elementId: string
}

/**
 * 可放置预览器位置，内部
 */
export interface DroppablePreviewerPositionInner
  extends DroppablePreviewerPositionBase {
  /**
   * 类型
   */
  type: DroppablePositionTypePreviewer
  /**
   * 顺序
   */
  order: 'last'
  /**
   * 元素 ID
   */
  elementId: string
  /**
   * 插槽逻辑路径
   */
  slotLogicPath: JsonPath
  /**
   * 动态渲染
   */
  dynamicRender?: boolean
}

/**
 * 可放置位置类型：预览器
 */
export const DROPPABLE_POSITION_TYPE_PREVIEWER = 'previewer'

/**
 * 可放置位置类型：预览器
 */
export type DroppablePositionTypePreviewer =
  typeof DROPPABLE_POSITION_TYPE_PREVIEWER

/**
 * 编辑器预览器仓库拖放插件
 */
export const editorPluginPreviewerStoreDnd: EditorPlugin<EditorPluginPreviewerStoreDndPropertiesExt> =
  {
    id: 'preview-store-dnd',
    initEditor(ctx) {
      const { dndStore, elementStore, uidlStore } = ctx
      dndStore.droppablePositionRendererMap.set(
        DROPPABLE_POSITION_TYPE_PREVIEWER,
        DroppablePreviewerPositionRenderer,
      )
      dndStore.droppablePositionActionMap.set(
        DROPPABLE_POSITION_TYPE_PREVIEWER,
        (entity, pos) => {
          if (
            !isDraggableElementOrComponent<
              DepPluginUniteEditorPlugin<typeof editorPluginPreviewerStoreDnd>
            >(entity)
          ) {
            return
          }
          let elementIdToBeSelected: string | undefined
          uidlStore.edit(() => {
            let draggingElement
            if (entity.type === DRAGGABLE_ENTITY_TYPE_ELEMENT) {
              draggingElement = entity.element
              elementStore.deleteElement(draggingElement.id, false)
            } else {
              draggingElement = elementStore.createElement(
                entity.pkgName,
                entity.componentType,
              )
              elementIdToBeSelected = draggingElement.id
            }
            if (pos.order === 'last') {
              elementStore.appendElement(
                pos.elementId,
                pos.slotLogicPath,
                !!pos.dynamicRender,
                draggingElement,
              )
            } else {
              elementStore.insertElement(
                pos.elementId,
                draggingElement,
                pos.order === POSITION_TYPE_RIGHT ||
                  pos.order === POSITION_TYPE_BOTTOM
                  ? POSITION_TYPE_AFTER
                  : POSITION_TYPE_BEFORE,
              )
            }
          })
          if (elementIdToBeSelected) {
            elementStore.selectElement(elementIdToBeSelected)
          }
        },
      )
    },
  }
