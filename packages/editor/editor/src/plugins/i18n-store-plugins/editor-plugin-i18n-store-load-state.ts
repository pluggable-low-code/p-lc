import { promisableThen } from '@p-lc/shared'
import { type editorPluginI18nStore } from './editor-plugin-i18n-store'

/**
 * 编辑器国际化仓库加载状态插件
 */
export const editorPluginI18nStoreLoadState: typeof editorPluginI18nStore = {
  id: 'i18n-store-load-state',
  initEditor(ctx) {
    const { i18nStore } = ctx
    promisableThen(
      i18nStore.i18nStateLoader?.load(),
      (ret) => ret && i18nStore.setLanguage(ret.language, false),
    )
  },
}
