import type { EditorPlugin } from '@p-lc/editor'
import { editorPluginLayoutStore } from '@p-lc/editor'
import type {
  ClassicalLayoutEditorPlugin,
  ClassicalLayoutLeftItem,
} from '@p-lc/editor-classical-layout-plugins'
import { Data, DataIcon } from '@p-lc/editor-data-store-plugins'
import type { ElementTreeEditorPlugin } from '@p-lc/editor-element-tree-store-plugins'
import { EN_US, ZH_CN } from '@p-lc/shared'
import { merge } from 'lodash-uni'
import type { EditorPluginClDataAdaptorI18nKeyOptions } from './i18n'
import {
  I18N_KEY_DATA_ICON_TIP,
  editorPluginClDataAdaptorI18n,
  editorPluginClDataAdaptorI18nEnUs,
  editorPluginClDataAdaptorI18nZhCn,
} from './i18n'

export * from './i18n'

/**
 * 编辑器经典布局数据适配器插件属性扩展
 */
export interface EditorPluginClDataAdaptorPropertiesExt {
  editor: {
    /**
     * 国际化仓库
     */
    i18nStore: {
      /**
       * 翻译键值选项
       */
      tKeyOptions: EditorPluginClDataAdaptorI18nKeyOptions
    }
  }
}

/**
 * 经典布局数据左部条目
 */
export const clDataLeftItem: ClassicalLayoutLeftItem = {
  id: 'data',
  index: 750,
  Component: Data,
  Icon: DataIcon,
  iconTip: {
    key: I18N_KEY_DATA_ICON_TIP,
  },
}

/**
 * 编辑器经典布局数据适配器插件
 */
export const editorPluginClDataAdaptor: EditorPlugin<
  EditorPluginClDataAdaptorPropertiesExt,
  ClassicalLayoutEditorPlugin | ElementTreeEditorPlugin
> = {
  id: 'cl-data-adaptor',
  // 在 editorPluginLayoutStoreInit 之前，确保不会覆盖 initOptions
  position: {
    target: editorPluginLayoutStore,
  },
  initEditor(ctx) {
    const { i18nStore, layoutStore } = ctx
    //#region i18n 摇树
    // 打包器预处理，只能处理 if-else，不能处理 switch-case
    if (!process.env.LC_LANGUAGE) {
      i18nStore.addResource(editorPluginClDataAdaptorI18n)
    } else if (process.env.LC_LANGUAGE === EN_US) {
      i18nStore.addResource({
        [EN_US]: editorPluginClDataAdaptorI18nEnUs,
      })
    } else if (process.env.LC_LANGUAGE === ZH_CN) {
      i18nStore.addResource({
        [ZH_CN]: editorPluginClDataAdaptorI18nZhCn,
      })
    }
    //#endregion
    merge(layoutStore.config, {
      left: {
        contentItems: {
          [clDataLeftItem.id]: clDataLeftItem,
        },
      },
    } satisfies typeof layoutStore.config)
  },
}
