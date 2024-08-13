import type { EditorPlugin } from '@p-lc/editor'
import { editorPluginLayoutStoreInit } from '@p-lc/editor'
import type { ClassicalLayoutEditorPlugin } from '@p-lc/editor-classical-layout-plugins'
import { EN_US, POSITION_TYPE_BEFORE, ZH_CN } from '@p-lc/shared'
import { merge } from 'lodash-uni'
import { LcTypesLayout } from './components'
import type { EditorPluginLcTypesStoreLayoutI18nKeyOptions } from './i18n'
import {
  editorPluginLcTypesStoreLayoutI18n,
  editorPluginLcTypesStoreLayoutI18nEnUs,
  editorPluginLcTypesStoreLayoutI18nZhCn,
} from './i18n'

export * from './components'

/**
 * 编辑器低代码类型仓库布局插件属性扩展
 */
export interface EditorPluginLcTypesStoreLayoutPropertiesExt {
  editor: {
    /**
     * 国际化仓库
     */
    i18nStore: {
      /**
       * 翻译键值选项
       */
      tKeyOptions: EditorPluginLcTypesStoreLayoutI18nKeyOptions
    }
  }
}

/**
 * 编辑器低代码类型仓库布局插件
 */
export const editorPluginLcTypesStoreLayout: EditorPlugin<
  EditorPluginLcTypesStoreLayoutPropertiesExt,
  ClassicalLayoutEditorPlugin
> = {
  id: 'lc-types-store-layout',
  position: {
    type: POSITION_TYPE_BEFORE,
    target: editorPluginLayoutStoreInit,
  },
  initEditor(ctx) {
    const { layoutStore, i18nStore } = ctx
    //#region i18n 摇树
    // 打包器预处理，只能处理 if-else，不能处理 switch-case
    if (!process.env.LC_LANGUAGE) {
      i18nStore.addResource(editorPluginLcTypesStoreLayoutI18n)
    } else if (process.env.LC_LANGUAGE === EN_US) {
      i18nStore.addResource({
        [EN_US]: editorPluginLcTypesStoreLayoutI18nEnUs,
      })
    } else if (process.env.LC_LANGUAGE === ZH_CN) {
      i18nStore.addResource({
        [ZH_CN]: editorPluginLcTypesStoreLayoutI18nZhCn,
      })
    }
    //#endregion
    merge(layoutStore.config, {
      Component: LcTypesLayout,
    } satisfies typeof layoutStore.config)
  },
}
