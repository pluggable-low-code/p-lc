import type {
  AnyEditorPlugin,
  ContextMenuItem,
  EditorDefaultPropertiesExtHkt,
  EditorDefaultPropertiesExtHktPlugin,
  EditorPlugin,
} from '@p-lc/editor'
import type {
  ActionToolbarEditorPlugin,
  ActionToolbarItem,
} from '../../action-toolbar'
import type {
  SeitEditorPlugin,
  SeitItem,
} from '../../selected-element-inline-toolbar'
import type {
  Shortcut,
  ShortcutFilter,
  ShortcutToolbarEditorPlugin,
} from '../../shortcut-toolbar'
import type { ToolbarEditorPlugin } from '../../types'

/**
 * 编辑器通用工具栏仓库插件属性扩展高等类型
 */
export interface EditorPluginUniToolbarStorePropertiesExtHkt<
  Plugin extends AnyEditorPlugin,
> {
  editor: {
    /**
     * 通用工具栏仓库
     */
    uniToolbarStore: {
      /**
       * 添加条目
       * @param item 条目
       */
      addItem(item: UniToolbarItem<Plugin>): void
    }
  }
}

/**
 * 通用工具栏条目
 */
export interface UniToolbarItem<
  Plugin extends AnyEditorPlugin = ToolbarEditorPlugin,
> {
  /**
   * 唯一标识
   */
  id: string
  /**
   * 上下文菜单条目
   */
  contextMenuItem?: Omit<ContextMenuItem<Plugin>, 'id'>
  /**
   * 操作工具栏条目
   */
  actionToolbarItem?: Omit<ActionToolbarItem, 'id'>
  /**
   * 选中元素内联工具栏条目
   */
  seitItem?: Omit<SeitItem<Plugin>, 'id'>
  /**
   * 快捷键
   */
  shortcut?: Omit<Shortcut<Plugin>, 'id'>
  /**
   * 快捷键过滤器
   */
  shortcutFilter?: Omit<ShortcutFilter<Plugin>, 'id'>
}

/**
 * EditorPluginUniToolbarStorePropertiesExtHkt 辅助类型
 */
export interface $EditorPluginUniToolbarStorePropertiesExtHkt
  extends EditorDefaultPropertiesExtHkt {
  type: EditorPluginUniToolbarStorePropertiesExtHkt<
    EditorDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 编辑器通用工具栏仓库插件
 */
export const editorPluginUniToolbarStore: EditorPlugin<
  $EditorPluginUniToolbarStorePropertiesExtHkt,
  ActionToolbarEditorPlugin | SeitEditorPlugin | ShortcutToolbarEditorPlugin
> = {
  id: 'uni-toolbar-store',
  initEditor(ctx) {
    const {
      contextMenuStore,
      actionToolbarStore,
      seitStore,
      shortcutToolbarStore,
    } = ctx
    const uniToolbarStore = (ctx.uniToolbarStore =
      {} as typeof ctx.uniToolbarStore)
    uniToolbarStore.addItem = ({
      id,
      contextMenuItem,
      actionToolbarItem,
      seitItem,
      shortcut,
      shortcutFilter,
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    }) => {
      if (contextMenuItem) {
        contextMenuStore.items[id] = {
          id,
          ...contextMenuItem,
        }
      }
      if (actionToolbarItem) {
        actionToolbarStore.items[id] = {
          id,
          ...actionToolbarItem,
        }
      }
      if (seitItem) {
        seitStore.items[id] = {
          id,
          ...seitItem,
        }
      }
      if (shortcut) {
        shortcutToolbarStore.shortcuts[id] = {
          id,
          ...shortcut,
        }
      }
      if (shortcutFilter) {
        shortcutToolbarStore.shortcutFilters[id] = {
          id,
          ...shortcutFilter,
        }
      }
    }
  },
}
