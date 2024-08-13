import type { DepPluginUniteEditorPlugin, EditorPlugin } from '@p-lc/editor'
import type {
  UniToolbarEditorPlugin,
  UniToolbarItem,
} from '@p-lc/editor-toolbar-plugins'
import type { LcTypesUidl } from '@p-lc/lc-types-uidl'
import { clearObjectToUndefined, countKeys, EN_US, ZH_CN } from '@p-lc/shared'
import { omit } from 'lodash-uni'
import type { editorPluginLcTypesStore } from '../editor-plugin-lc-types-store'
import type { editorPluginLcTypesUidl } from '../editor-plugin-lc-types-uidl'
import { ActionToolbarSaveAsInitialValueBtn } from './action-toolbar-save-as-initial-value-btn'
import {
  editorPluginSaveAsInitialValueI18n,
  editorPluginSaveAsInitialValueI18nEnUs,
  editorPluginSaveAsInitialValueI18nZhCn,
  type EditorPluginSaveAsInitialValueI18nKeyOptions,
} from './i18n'

export * from './action-toolbar-save-as-initial-value-btn'
export * from './i18n'

/**
 * 编辑器另存为初始值插件属性扩展
 */
export interface EditorPluginSaveAsInitialValuePropertiesExt {
  editor: {
    /**
     * 国际化仓库
     */
    i18nStore: {
      /**
       * 翻译键值选项
       */
      tKeyOptions: EditorPluginSaveAsInitialValueI18nKeyOptions
    }
    /**
     * 通用工具栏仓库
     */
    uniToolbarStore: {
      /**
       * 另存为初始值
       */
      saveAsInitialValue(): void
    }
  }
}

/**
 * 通用工具栏条目：另存为初始值
 */
export const uniToolbarItemSaveAsInitialValue: UniToolbarItem<
  DepPluginUniteEditorPlugin<typeof editorPluginSaveAsInitialValue>
> = {
  id: 'save-as-initial-value',
  actionToolbarItem: {
    index: 150,
    Component: ActionToolbarSaveAsInitialValueBtn,
  },
}

/**
 * 编辑器另存为初始值插件
 */
export const editorPluginSaveAsInitialValue: EditorPlugin<
  EditorPluginSaveAsInitialValuePropertiesExt,
  | UniToolbarEditorPlugin
  | typeof editorPluginLcTypesStore
  | typeof editorPluginLcTypesUidl
> = {
  id: 'save-as-initial-value',
  initEditor(ctx) {
    const { uniToolbarStore, i18nStore, lcTypesStore, uidlStore } = ctx
    //#region i18n 摇树
    // 打包器预处理，只能处理 if-else，不能处理 switch-case
    if (!process.env.LC_LANGUAGE) {
      i18nStore.addResource(editorPluginSaveAsInitialValueI18n)
    } else if (process.env.LC_LANGUAGE === EN_US) {
      i18nStore.addResource({
        [EN_US]: editorPluginSaveAsInitialValueI18nEnUs,
      })
    } else if (process.env.LC_LANGUAGE === ZH_CN) {
      i18nStore.addResource({
        [ZH_CN]: editorPluginSaveAsInitialValueI18nZhCn,
      })
    }
    //#endregion
    uniToolbarStore.addItem(uniToolbarItemSaveAsInitialValue)
    uniToolbarStore.saveAsInitialValue = (): void => {
      const { uidlElement } = lcTypesStore.editingData
      if (!uidlElement) return
      const currentElementPart = omit(uidlElement, ['type', 'id', 'name'])
      uidlStore.edit((uidl: LcTypesUidl) => {
        let { initializer } = uidl
        if (!initializer) {
          initializer = uidl.initializer = {}
        }
        const { partialElement = {} } = initializer
        const { language } = i18nStore
        if (countKeys(currentElementPart)) {
          partialElement[language] = currentElementPart
        } else {
          delete partialElement[language]
        }
        initializer.partialElement = clearObjectToUndefined(partialElement)
        if (!clearObjectToUndefined(initializer)) {
          delete uidl.initializer
        }
      })
    }
  },
}
