import type { EditorPlugin } from '@p-lc/editor'
import type { LiteralObject } from '@p-lc/shared'
import { isHtmlElement } from '@p-lc/shared'
import type { ShortcutFilter } from './editor-plugin-shortcut-toolbar-store'
import { type editorPluginShortcutToolbarStore } from './editor-plugin-shortcut-toolbar-store'

/**
 * 可编辑（元素）快捷键过滤器
 */
export const editableShortcutFilter: ShortcutFilter = {
  id: 'editable',
  index: 550,
  filter({ target }) {
    if (isHtmlElement(target)) {
      if (
        target.isContentEditable ||
        target instanceof HTMLSelectElement ||
        ((target instanceof HTMLTextAreaElement ||
          (target instanceof HTMLInputElement &&
            ![
              'checkbox',
              'radio',
              'range',
              'button',
              'file',
              'reset',
              'submit',
              'color',
            ].includes(target.type))) &&
          !target.readOnly)
      ) {
        return false
      }
    }
    return true
  },
}

/**
 * 编辑器快捷键工具栏仓库可编辑过滤器插件
 */
export const editorPluginShortcutToolbarStoreEditableFilter: EditorPlugin<
  LiteralObject,
  typeof editorPluginShortcutToolbarStore
> = {
  id: 'shortcut-toolbar-store-editable',
  initEditor(ctx) {
    const { shortcutToolbarStore } = ctx
    shortcutToolbarStore.shortcutFilters[editableShortcutFilter.id] =
      editableShortcutFilter
  },
}
