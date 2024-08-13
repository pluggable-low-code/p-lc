import type { EditorRawPlugin } from '../../types'
import { type editorPluginUidlStore } from '../uidl-store-plugins'
import { DraggableComponentRenderer } from './components'
import type { DraggableEntityBase } from './editor-plugin-dnd-store'
import { type editorPluginDndStoreMask } from './editor-plugin-dnd-store-mask'

/**
 * 编辑器拖放仓库组件渲染器插件属性扩展
 */
export interface EditorPluginDndStoreComponentRendererPropertiesExt {
  editor: {
    /**
     * 拖放仓库
     */
    dndStore: {
      /**
       * 可拖拽实体
       */
      draggableEntities: {
        /**
         * 可拖拽组件
         */
        [K in DraggableEntityTypeComponent]: DraggableComponent
      }
    }
  }
}

/**
 * 可拖拽组件
 */
export interface DraggableComponent extends DraggableEntityBase {
  /**
   * 类型
   */
  type: DraggableEntityTypeComponent
  /**
   * 包名
   */
  pkgName: string
  /**
   * 组件类型
   */
  componentType: string
}

/**
 * 可拖拽实体类型：组件
 */
export const DRAGGABLE_ENTITY_TYPE_COMPONENT = 'component'

/**
 * 可拖拽实体类型：组件
 */
export type DraggableEntityTypeComponent =
  typeof DRAGGABLE_ENTITY_TYPE_COMPONENT

/**
 * 编辑器拖放仓库组件渲染器插件
 */
export const editorPluginDndStoreComponentRenderer: EditorRawPlugin<
  EditorPluginDndStoreComponentRendererPropertiesExt,
  typeof editorPluginDndStoreMask | typeof editorPluginUidlStore
> = {
  id: 'dnd-store-component-renderer',
  initEditor(ctx) {
    const { dndStore } = ctx
    dndStore.draggableEntityRendererMap.set(
      DRAGGABLE_ENTITY_TYPE_COMPONENT,
      DraggableComponentRenderer,
    )
  },
}
