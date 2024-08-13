import type {
  AnyEditorPlugin,
  EditorDefaultPropertiesExtHkt,
  EditorDefaultPropertiesExtHktPlugin,
  EditorRawPlugin,
} from '../../types'
import type { UidlStoreUidlElement } from '../uidl-store-plugins'
import { type editorPluginUidlStore } from '../uidl-store-plugins'
import { DraggableElementRenderer } from './components'
import type { DraggableEntityBase } from './editor-plugin-dnd-store'
import { type editorPluginDndStoreMask } from './editor-plugin-dnd-store-mask'

/**
 * 编辑器拖放仓库元素渲染器插件属性扩展高等类型
 */
export interface EditorPluginDndStoreElementRendererPropertiesExtHkt<
  Plugin extends AnyEditorPlugin,
> {
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
         * 可拖拽元素
         */
        [K in DraggableEntityTypeElement]: DraggableElement<Plugin>
      }
    }
  }
}

/**
 * 可拖拽元素
 */
export interface DraggableElement<Plugin extends AnyEditorPlugin>
  extends DraggableEntityBase {
  /**
   * 类型
   */
  type: DraggableEntityTypeElement
  /**
   * 元素
   */
  element: UidlStoreUidlElement<Plugin>
}

/**
 * 可拖拽实体类型：元素
 */
export const DRAGGABLE_ENTITY_TYPE_ELEMENT = 'element'

/**
 * 可拖拽实体类型：元素
 */
export type DraggableEntityTypeElement = typeof DRAGGABLE_ENTITY_TYPE_ELEMENT

/**
 * EditorPluginDndStoreElementRendererPropertiesExtHkt 辅助类型
 */
export interface $EditorPluginDndStoreElementRendererPropertiesExtHkt
  extends EditorDefaultPropertiesExtHkt {
  type: EditorPluginDndStoreElementRendererPropertiesExtHkt<
    EditorDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 编辑器拖放仓库元素渲染器插件
 */
export const editorPluginDndStoreElementRenderer: EditorRawPlugin<
  $EditorPluginDndStoreElementRendererPropertiesExtHkt,
  typeof editorPluginDndStoreMask | typeof editorPluginUidlStore
> = {
  id: 'dnd-store-element-renderer',
  initEditor(ctx) {
    const { dndStore } = ctx
    dndStore.draggableEntityRendererMap.set(
      DRAGGABLE_ENTITY_TYPE_ELEMENT,
      DraggableElementRenderer,
    )
  },
}
