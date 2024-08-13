import type { SoftAs } from '@p-lc/shared'
import type {
  AnyEditorPlugin,
  EditorDefaultPlugin,
  EditorRawPlugin,
} from '../../types'
import type {
  ContextMenuEntity,
  ContextMenuEntityBase,
} from './editor-plugin-context-menu-store'

/**
 * 编辑器上下文菜单仓库元素插件属性扩展
 */
export interface EditorPluginContextMenuStoreElementPropertiesExt {
  editor: {
    /**
     * 上下文菜单仓库
     */
    contextMenuStore: {
      /**
       * 上下文菜单实体
       */
      contextMenuEntities: {
        /**
         * 上下文菜单元素
         */
        [K in ContextMenuEntityTypeElement]: ContextMenuElement
      }
    }
  }
}

/**
 * 上下文菜单实体类型：元素
 */
export const CONTEXT_MENU_ENTITY_TYPE_ELEMENT = 'element'

/**
 * 上下文菜单实体类型：元素
 */
export type ContextMenuEntityTypeElement =
  typeof CONTEXT_MENU_ENTITY_TYPE_ELEMENT

/**
 * 上下文菜单元素
 */
export interface ContextMenuElement extends ContextMenuEntityBase {
  /**
   * 类型
   */
  type: ContextMenuEntityTypeElement
  /**
   * 元素 ID
   */
  elementId: string
}

/**
 * 是上下文菜单元素
 * @param entity 实体
 */
export function isContextMenuElement<
  Plugin extends AnyEditorPlugin = EditorDefaultPlugin,
>(
  entity: ContextMenuEntity<Plugin>,
): entity is SoftAs<ContextMenuElement, ContextMenuEntity<Plugin>> {
  return entity.type === CONTEXT_MENU_ENTITY_TYPE_ELEMENT
}

/**
 * 编辑器上下文菜单仓库元素插件
 */
export const editorPluginContextMenuStoreElement: EditorRawPlugin<EditorPluginContextMenuStoreElementPropertiesExt> =
  {
    id: 'context-menu-store-element',
  }
