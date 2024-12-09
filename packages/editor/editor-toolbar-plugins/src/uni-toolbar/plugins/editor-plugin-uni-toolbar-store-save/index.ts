import {
  EDITOR_EVENT_KEY_SAVE_FAILED,
  EDITOR_EVENT_KEY_SAVE_SUCCESSFUL,
  type DepPluginUniteEditorPlugin,
  type EditorPlugin,
} from '@p-lc/editor'
import { EN_US, ZH_CN } from '@p-lc/shared'
import { message } from 'antd'
import {
  createBatchMatchSimpleShortcut,
  editableShortcutFilter,
  SIMPLE_SHORTCUT_FLAG_MOD,
} from '../../../shortcut-toolbar'
import type { UniToolbarItem } from '../editor-plugin-uni-toolbar-store'
import { type editorPluginUniToolbarStore } from '../editor-plugin-uni-toolbar-store'
import { ActionToolbarSaveBtn } from './action-toolbar-save-btn'
import type { EditorPluginUniToolbarStoreSaveI18nKeyOptions } from './i18n'
import {
  editorPluginUniToolbarStoreSaveI18n,
  editorPluginUniToolbarStoreSaveI18nEnUs,
  editorPluginUniToolbarStoreSaveI18nZhCn,
  I18N_KEY_UNI_TOOLBAR_SAVE_FAILED,
  I18N_KEY_UNI_TOOLBAR_SAVE_SUCCESSFUL,
} from './i18n'

export * from './action-toolbar-save-btn'
export * from './i18n'

/**
 * 编辑器通用工具栏仓库保存插件属性扩展
 */
export interface EditorPluginUniToolbarStoreSavePropertiesExt {
  editor: {
    /**
     * 国际化仓库
     */
    i18nStore: {
      /**
       * 翻译键值选项
       */
      tKeyOptions: EditorPluginUniToolbarStoreSaveI18nKeyOptions
    }
  }
}

/**
 * 保存匹配快捷键
 */
const saveMatchShortcut = createBatchMatchSimpleShortcut([
  SIMPLE_SHORTCUT_FLAG_MOD,
  's',
])

/**
 * 通用工具栏条目：保存
 */
export const uniToolbarItemSave: UniToolbarItem<
  DepPluginUniteEditorPlugin<typeof editorPluginUniToolbarStoreSave>
> = {
  id: 'save',
  actionToolbarItem: {
    index: 1000,
    Component: ActionToolbarSaveBtn,
  },
  shortcut: {
    match: saveMatchShortcut,
    action(ev, ctx): void {
      ev.preventDefault()
      const { saveStore } = ctx
      saveStore.save()
    },
  },
  shortcutFilter: {
    index: 50,
    filter(ev) {
      if (saveMatchShortcut(ev)) {
        return [editableShortcutFilter.id]
      }
      return true
    },
  },
}

/**
 * 编辑器通用工具栏仓库保存插件
 */
export const editorPluginUniToolbarStoreSave: EditorPlugin<
  EditorPluginUniToolbarStoreSavePropertiesExt,
  typeof editorPluginUniToolbarStore
> = {
  id: 'uni-toolbar-store-save',
  initEditor(ctx) {
    const { uniToolbarStore, i18nStore, emitter } = ctx
    //#region i18n 摇树
    // 打包器预处理，只能处理 if-else，不能处理 switch-case
    if (!process.env.LC_LANGUAGE) {
      i18nStore.addResource(editorPluginUniToolbarStoreSaveI18n)
    } else if (process.env.LC_LANGUAGE === EN_US) {
      i18nStore.addResource({
        [EN_US]: editorPluginUniToolbarStoreSaveI18nEnUs,
      })
    } else if (process.env.LC_LANGUAGE === ZH_CN) {
      i18nStore.addResource({
        [ZH_CN]: editorPluginUniToolbarStoreSaveI18nZhCn,
      })
    }
    //#endregion
    uniToolbarStore.addItem(uniToolbarItemSave)
    emitter.on(EDITOR_EVENT_KEY_SAVE_SUCCESSFUL, () => {
      message.success(i18nStore.t(I18N_KEY_UNI_TOOLBAR_SAVE_SUCCESSFUL))
    })
    emitter.on(EDITOR_EVENT_KEY_SAVE_FAILED, ({ err }) => {
      let msg = i18nStore.t(I18N_KEY_UNI_TOOLBAR_SAVE_FAILED)
      if (err instanceof Error) {
        msg = `${msg}: ${err.message}`
      }
      message.error(msg)
    })
  },
}
