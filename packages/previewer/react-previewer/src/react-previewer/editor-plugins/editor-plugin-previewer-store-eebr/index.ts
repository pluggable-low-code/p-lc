import type { EditorPlugin } from '@p-lc/editor'
import {
  type editorPluginPreviewerStore,
  type editorPluginPreviewerStoreInline,
} from '@p-lc/previewer'
import { EN_US, ZH_CN, definePropertyByGetter } from '@p-lc/shared'
import type { EditorPluginPreviewerStoreEebrI18nKeyOptions } from './i18n'
import {
  I18N_KEY_SOMETHING_WENT_WRONG_IN_THE_ELEMENT,
  editorPluginPreviewerStoreEebrI18n,
  editorPluginPreviewerStoreEebrI18nEnUs,
  editorPluginPreviewerStoreEebrI18nZhCn,
} from './i18n'

export * from './i18n'

/**
 * 编辑器预览器仓库 React 元素错误边界插件属性扩展
 */
export interface EditorPluginPreviewStoreEebrPropertiesExt {
  editor: {
    /**
     * 国际化仓库
     */
    i18nStore: {
      /**
       * 翻译键值选项
       */
      tKeyOptions: EditorPluginPreviewerStoreEebrI18nKeyOptions
    }
    /**
     * 预览器仓库
     */
    previewerStore: {
      /**
       * 内联运行时初始化选项
       */
      inlineRuntimeInitOptions: {
        /**
         * 国际化字符串
         */
        i18nStrings: {
          somethingWentWrongInTheElement: string
        }
      }
    }
  }
}

/**
 * 编辑器预览器仓库 React 元素错误边界插件
 */
export const editorPluginPreviewerStoreEebr: EditorPlugin<
  EditorPluginPreviewStoreEebrPropertiesExt,
  typeof editorPluginPreviewerStore | typeof editorPluginPreviewerStoreInline
> = {
  id: 'previewer-store-eebr',
  initEditor(ctx) {
    const {
      previewerStore: {
        partialInlineRuntimeInitOptions: { i18nStrings },
      },
      i18nStore,
    } = ctx
    //#region i18n 摇树
    // 打包器预处理，只能处理 if-else，不能处理 switch-case
    if (!process.env.LC_LANGUAGE) {
      i18nStore.addResource(editorPluginPreviewerStoreEebrI18n)
    } else if (process.env.LC_LANGUAGE === EN_US) {
      i18nStore.addResource({
        [EN_US]: editorPluginPreviewerStoreEebrI18nEnUs,
      })
    } else if (process.env.LC_LANGUAGE === ZH_CN) {
      i18nStore.addResource({
        [ZH_CN]: editorPluginPreviewerStoreEebrI18nZhCn,
      })
    }
    //#endregion
    if (i18nStrings) {
      definePropertyByGetter(
        i18nStrings,
        I18N_KEY_SOMETHING_WENT_WRONG_IN_THE_ELEMENT,
        () => {
          return i18nStore.t(I18N_KEY_SOMETHING_WENT_WRONG_IN_THE_ELEMENT)
        },
      )
    }
  },
}
