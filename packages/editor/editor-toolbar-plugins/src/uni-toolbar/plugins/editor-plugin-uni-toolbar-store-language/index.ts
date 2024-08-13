import type { DepPluginUniteEditorPlugin, EditorPlugin } from '@p-lc/editor'
import { type LiteralObject } from '@p-lc/shared'
import type { UniToolbarItem } from '../editor-plugin-uni-toolbar-store'
import { type editorPluginUniToolbarStore } from '../editor-plugin-uni-toolbar-store'
import { ActionToolbarLanguageSelect } from './action-toolbar-language-select'

/**
 * 通用工具栏条目：语言
 */
export const uniToolbarItemLanguage: UniToolbarItem<
  DepPluginUniteEditorPlugin<typeof editorPluginUniToolbarStoreLanguage>
> = {
  id: 'language',
  actionToolbarItem: {
    index: 350,
    Component: ActionToolbarLanguageSelect,
  },
}

/**
 * 编辑器通用工具栏仓库语言插件
 */
export const editorPluginUniToolbarStoreLanguage: EditorPlugin<
  LiteralObject,
  typeof editorPluginUniToolbarStore
> = {
  id: 'uni-toolbar-store-language',
  initEditor(ctx) {
    const { uniToolbarStore } = ctx
    uniToolbarStore.addItem(uniToolbarItemLanguage)
  },
}
