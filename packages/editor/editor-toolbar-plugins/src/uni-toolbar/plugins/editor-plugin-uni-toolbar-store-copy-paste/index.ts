import type {
  ContextMenuElement,
  DepPluginUniteEditorPlugin,
  EditorPlugin,
} from '@p-lc/editor'
import { isContextMenuElement } from '@p-lc/editor'
import { EN_US, ZH_CN } from '@p-lc/shared'
import {
  createBatchMatchSimpleShortcut,
  SIMPLE_SHORTCUT_FLAG_MOD,
} from '../../../shortcut-toolbar'
import type { UniToolbarItem } from '../editor-plugin-uni-toolbar-store'
import { type editorPluginUniToolbarStore } from '../editor-plugin-uni-toolbar-store'
import type { EditorPluginUniToolbarStoreCopyPasteI18nKeyOptions } from './i18n'
import {
  editorPluginUniToolbarStoreCopyPasteI18n,
  editorPluginUniToolbarStoreCopyPasteI18nEnUs,
  editorPluginUniToolbarStoreCopyPasteI18nZhCn,
  I18N_KEY_UNI_TOOLBAR_COPY,
  I18N_KEY_UNI_TOOLBAR_PASTE,
} from './i18n'

export * from './i18n'

/**
 * 编辑器通用工具栏仓库复制粘贴插件属性扩展
 */
export interface EditorPluginUniToolbarStoreCopyPastePropertiesExt {
  editor: {
    /**
     * 国际化仓库
     */
    i18nStore: {
      /**
       * 翻译键值选项
       */
      tKeyOptions: EditorPluginUniToolbarStoreCopyPasteI18nKeyOptions
    }
  }
}

/**
 * 通用工具栏条目：复制
 */
export const uniToolbarItemCopy: UniToolbarItem<
  DepPluginUniteEditorPlugin<typeof editorPluginUniToolbarStoreCopyPaste>
> = {
  id: 'copy',
  contextMenuItem: {
    index: 550,
    label: {
      key: I18N_KEY_UNI_TOOLBAR_COPY,
    },
    match(entity, { elementStore }) {
      return (
        isContextMenuElement(entity) &&
        !elementStore.isRootElement(entity.elementId)
      )
    },
    action(entity, { elementStore }) {
      const { elementId } = entity as ContextMenuElement
      elementStore.copy(elementId)
    },
  },
  shortcut: {
    match: createBatchMatchSimpleShortcut([SIMPLE_SHORTCUT_FLAG_MOD, 'c']),
    action(ev, ctx): void {
      void ev
      const { elementStore } = ctx
      const { selectedElementId } = elementStore
      if (!selectedElementId || elementStore.isRootElement(selectedElementId)) {
        return
      }
      elementStore.copy(selectedElementId)
    },
  },
}

/**
 * 通用工具栏条目：粘贴
 */
export const uniToolbarItemPaste: UniToolbarItem<
  DepPluginUniteEditorPlugin<typeof editorPluginUniToolbarStoreCopyPaste>
> = {
  id: 'paste',
  contextMenuItem: {
    index: 560,
    label: {
      key: I18N_KEY_UNI_TOOLBAR_PASTE,
    },
    match(entity) {
      return isContextMenuElement(entity)
    },
    action(entity, { elementStore }) {
      const { elementId } = entity
      elementStore.paste(elementId)
    },
  },
  shortcut: {
    match: createBatchMatchSimpleShortcut([SIMPLE_SHORTCUT_FLAG_MOD, 'v']),
    action(ev, ctx): void {
      void ev
      const { elementStore } = ctx
      elementStore.paste(elementStore.selectedElementId)
    },
  },
}

/**
 * 编辑器通用工具栏仓库复制粘贴插件
 */
export const editorPluginUniToolbarStoreCopyPaste: EditorPlugin<
  EditorPluginUniToolbarStoreCopyPastePropertiesExt,
  typeof editorPluginUniToolbarStore
> = {
  id: 'uni-toolbar-store-copy-paste',
  initEditor(ctx) {
    const { uniToolbarStore, i18nStore } = ctx
    //#region i18n 摇树
    // 打包器预处理，只能处理 if-else，不能处理 switch-case
    if (!process.env.LC_LANGUAGE) {
      i18nStore.addResource(editorPluginUniToolbarStoreCopyPasteI18n)
    } else if (process.env.LC_LANGUAGE === EN_US) {
      i18nStore.addResource({
        [EN_US]: editorPluginUniToolbarStoreCopyPasteI18nEnUs,
      })
    } else if (process.env.LC_LANGUAGE === ZH_CN) {
      i18nStore.addResource({
        [ZH_CN]: editorPluginUniToolbarStoreCopyPasteI18nZhCn,
      })
    }
    //#endregion
    uniToolbarStore.addItem(uniToolbarItemCopy)
    uniToolbarStore.addItem(uniToolbarItemPaste)
  },
}
