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
import { POSITION_TYPE_AFTER, POSITION_TYPE_BEFORE } from '@p-lc/shared'
import { type editorPluginElementTreeStore } from '../editor-plugin-element-tree-store'
import { DroppableElementTreePositionRenderer } from './droppable-element-tree-position-renderer'

export * from './droppable-element-tree-position-renderer'

/**
 * 编辑器元素树仓库拖放插件属性扩展
 */
export interface EditorPluginElementTreeStoreDndPropertiesExt {
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
         * 可放置元素树位置
         */
        [K in DroppablePositionTypeElementTree]: DroppableElementTreePosition
      }
    }
  }
}

/**
 * 可放置元素树位置
 */
export type DroppableElementTreePosition =
  | DroppableElementTreePositionOuter
  | DroppableElementTreePositionInner

/**
 * 可放置元素树位置基础部分
 */
export interface DroppableElementTreePositionBase
  extends DroppablePositionBase {
  /**
   * 类型
   */
  type: DroppablePositionTypeElementTree
}

/**
 * 可放置元素树位置，外部
 */
export interface DroppableElementTreePositionOuter
  extends DroppableElementTreePositionBase {
  /**
   * 类型
   */
  type: DroppablePositionTypeElementTree
  /**
   * 顺序
   */
  order: typeof POSITION_TYPE_BEFORE | typeof POSITION_TYPE_AFTER
  /**
   * 元素 ID
   */
  elementId: string
}

/**
 * 可放置元素树位置，内部
 */
export interface DroppableElementTreePositionInner
  extends DroppableElementTreePositionBase {
  /**
   * 类型
   */
  type: DroppablePositionTypeElementTree
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
 * 可放置位置类型：元素树
 */
export const DROPPABLE_POSITION_TYPE_ELEMENT_TREE = 'element-tree'

/**
 * 可放置位置类型：元素树
 */
export type DroppablePositionTypeElementTree =
  typeof DROPPABLE_POSITION_TYPE_ELEMENT_TREE

/**
 * 编辑器元素树仓库拖放插件
 */
export const editorPluginElementTreeStoreDnd: EditorPlugin<
  EditorPluginElementTreeStoreDndPropertiesExt,
  typeof editorPluginElementTreeStore
> = {
  id: 'element-tree-store-dnd',
  initEditor(ctx) {
    const { dndStore, elementStore, uidlStore } = ctx
    dndStore.droppablePositionRendererMap.set(
      DROPPABLE_POSITION_TYPE_ELEMENT_TREE,
      DroppableElementTreePositionRenderer,
    )
    dndStore.droppablePositionActionMap.set(
      DROPPABLE_POSITION_TYPE_ELEMENT_TREE,
      (entity, pos) => {
        if (
          !isDraggableElementOrComponent<
            DepPluginUniteEditorPlugin<typeof editorPluginElementTreeStoreDnd>
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
              pos.order === POSITION_TYPE_AFTER
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
