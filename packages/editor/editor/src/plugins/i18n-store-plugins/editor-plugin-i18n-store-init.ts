import type { I18nResource } from '@p-lc/pd'
import { defineLazyInitProperty, type DataLoader } from '@p-lc/shared'
import { isNil } from 'lodash-uni'
import type { EditorRawPlugin } from '../../types'
import {
  type editorPluginI18nStore,
  type I18nState,
} from './editor-plugin-i18n-store'

/**
 * 编辑器国际化仓库初始化插件属性扩展
 */
export interface EditorPluginI18nStoreInitPropertiesExt {
  editorInitOptions: {
    /**
     * （当前）语言
     */
    language?: string
    /**
     * 国际化资源，会自动覆盖插件的国际化资源
     */
    i18n?: I18nResource
    /**
     * 语言名称
     */
    languageNames?: Record<string, string>
    /**
     * 国际化状态加载器
     */
    i18nStateLoader?: DataLoader<I18nState | null> | null
  }
}

/**
 * 编辑器国际化仓库初始化插件
 */
export const editorPluginI18nStoreInit: EditorRawPlugin<
  EditorPluginI18nStoreInitPropertiesExt,
  typeof editorPluginI18nStore
> = {
  id: 'i18n-store-init',
  initEditor(ctx) {
    const {
      i18nStore,
      initOptions: { language, i18n, languageNames, i18nStateLoader },
    } = ctx
    if (language) i18nStore.setLanguage(language, false)
    if (languageNames) i18nStore.setLanguageNames(languageNames)
    if (i18n) i18nStore.addResource(i18n, true)
    if (!isNil(i18nStateLoader)) {
      defineLazyInitProperty(
        i18nStore,
        'i18nStateLoader',
        () => i18nStateLoader || null,
      )
    }
  },
}
