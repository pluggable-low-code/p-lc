import type { EditorPlugin } from '@p-lc/editor'
import type { Binder } from '@p-lc/editor-element-attributes-store-plugins'
import { type editorPluginElementAttributesStoreBind } from '@p-lc/editor-element-attributes-store-plugins'
import { BINDER_TYPE_I18N } from '@p-lc/lc-types-ui'
import { EN_US, ZH_CN } from '@p-lc/shared'
import { I18nBinderBody } from './components'
import type { EditorPluginI18nBinderI18nKeyOptions } from './i18n'
import {
  I18N_KEY_I18N_BINDER_NAME,
  editorPluginI18nBinderI18n,
  editorPluginI18nBinderI18nEnUs,
  editorPluginI18nBinderI18nZhCn,
} from './i18n'

export * from './components'
export * from './i18n'

/**
 * 编辑器国际化绑定器插件属性扩展
 */
export interface EditorPluginI18nBinderPropertiesExt {
  editor: {
    /**
     * 国际化仓库
     */
    i18nStore: {
      /**
       * 翻译键值选项
       */
      tKeyOptions: EditorPluginI18nBinderI18nKeyOptions
    }
  }
}

/**
 * 国际化绑定器
 */
export const i18nBinder: Binder = {
  type: BINDER_TYPE_I18N,
  name: {
    key: I18N_KEY_I18N_BINDER_NAME,
  },
  index: 550,
  Component: I18nBinderBody,
}

/**
 * 编辑器国际化绑定器插件
 */
export const editorPluginI18nBinder: EditorPlugin<
  EditorPluginI18nBinderPropertiesExt,
  typeof editorPluginElementAttributesStoreBind
> = {
  id: 'i18n-binder',
  initEditor(ctx) {
    const { elementAttributesStore, i18nStore } = ctx
    //#region i18n 摇树
    // 打包器预处理，只能处理 if-else，不能处理 switch-case
    if (!process.env.LC_LANGUAGE) {
      i18nStore.addResource(editorPluginI18nBinderI18n)
    } else if (process.env.LC_LANGUAGE === EN_US) {
      i18nStore.addResource({
        [EN_US]: editorPluginI18nBinderI18nEnUs,
      })
    } else if (process.env.LC_LANGUAGE === ZH_CN) {
      i18nStore.addResource({
        [ZH_CN]: editorPluginI18nBinderI18nZhCn,
      })
    }
    //#endregion
    elementAttributesStore.binders[i18nBinder.type] = i18nBinder
  },
}
