import type { EditorPlugin } from '@p-lc/editor'
import { editorPluginLayoutStore } from '@p-lc/editor'
import type {
  ClassicalLayoutEditorPlugin,
  ClassicalLayoutLeftItem,
} from '@p-lc/editor-classical-layout-plugins'
import type { ElementTreeEditorPlugin } from '@p-lc/editor-element-tree-store-plugins'
import { I18nEdit, I18nEditIcon } from '@p-lc/editor-i18n-edit-store-plugins'
import { EN_US, ZH_CN } from '@p-lc/shared'
import { merge } from 'lodash-uni'
import type { EditorPluginClIeAdaptorI18nKeyOptions } from './i18n'
import {
  I18N_KEY_I18N_EDIT_ICON_TIP,
  editorPluginClIeAdaptorI18n,
  editorPluginClIeAdaptorI18nEnUs,
  editorPluginClIeAdaptorI18nZhCn,
} from './i18n'

export * from './i18n'

/**
 * 编辑器经典布局国际化编辑适配器插件属性扩展
 */
export interface EditorPluginClIeAdaptorPropertiesExt {
  editor: {
    /**
     * 国际化仓库
     */
    i18nStore: {
      /**
       * 翻译键值选项
       */
      tKeyOptions: EditorPluginClIeAdaptorI18nKeyOptions
    }
  }
}

/**
 * 经典布局国际化编辑左部条目
 */
export const clIeLeftItem: ClassicalLayoutLeftItem = {
  id: 'ie',
  index: 350,
  Component: I18nEdit,
  Icon: I18nEditIcon,
  iconTip: {
    key: I18N_KEY_I18N_EDIT_ICON_TIP,
  },
}

/**
 * 编辑器经典布局国际化编辑适配器插件
 */
export const editorPluginClIeAdaptor: EditorPlugin<
  EditorPluginClIeAdaptorPropertiesExt,
  ClassicalLayoutEditorPlugin | ElementTreeEditorPlugin
> = {
  id: 'cl-ie-adaptor',
  // 在 editorPluginLayoutStoreInit 之前，确保不会覆盖 initOptions
  position: {
    target: editorPluginLayoutStore,
  },
  initEditor(ctx) {
    const { i18nStore, layoutStore } = ctx
    //#region i18n 摇树
    // 打包器预处理，只能处理 if-else，不能处理 switch-case
    if (!process.env.LC_LANGUAGE) {
      i18nStore.addResource(editorPluginClIeAdaptorI18n)
    } else if (process.env.LC_LANGUAGE === EN_US) {
      i18nStore.addResource({
        [EN_US]: editorPluginClIeAdaptorI18nEnUs,
      })
    } else if (process.env.LC_LANGUAGE === ZH_CN) {
      i18nStore.addResource({
        [ZH_CN]: editorPluginClIeAdaptorI18nZhCn,
      })
    }
    //#endregion
    merge(layoutStore.config, {
      left: {
        contentItems: {
          [clIeLeftItem.id]: clIeLeftItem,
        },
      },
    } satisfies typeof layoutStore.config)
  },
}
