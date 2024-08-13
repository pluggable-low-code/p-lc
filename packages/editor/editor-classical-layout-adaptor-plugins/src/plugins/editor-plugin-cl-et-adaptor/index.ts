import type { EditorPlugin } from '@p-lc/editor'
import { editorPluginLayoutStore } from '@p-lc/editor'
import type {
  ClassicalLayoutEditorPlugin,
  ClassicalLayoutLeftItem,
} from '@p-lc/editor-classical-layout-plugins'
import type { ElementTreeEditorPlugin } from '@p-lc/editor-element-tree-store-plugins'
import {
  ElementTree,
  ElementTreeIcon,
} from '@p-lc/editor-element-tree-store-plugins'
import { EN_US, ZH_CN } from '@p-lc/shared'
import { merge } from 'lodash-uni'
import type { EditorPluginClEtAdaptorI18nKeyOptions } from './i18n'
import {
  I18N_KEY_ELEMENT_TREE_ICON_TIP,
  editorPluginClEtAdaptorI18n,
  editorPluginClEtAdaptorI18nEnUs,
  editorPluginClEtAdaptorI18nZhCn,
} from './i18n'

export * from './i18n'

/**
 * 编辑器经典布局元素树适配器插件属性扩展
 */
export interface EditorPluginClEtAdaptorPropertiesExt {
  editor: {
    /**
     * 国际化仓库
     */
    i18nStore: {
      /**
       * 翻译键值选项
       */
      tKeyOptions: EditorPluginClEtAdaptorI18nKeyOptions
    }
  }
}

/**
 * 经典布局元素树左部条目
 */
export const clEtLeftItem: ClassicalLayoutLeftItem = {
  id: 'et',
  index: 250,
  Component: ElementTree,
  Icon: ElementTreeIcon,
  iconTip: {
    key: I18N_KEY_ELEMENT_TREE_ICON_TIP,
  },
}

/**
 * 编辑器经典布局元素树适配器插件
 */
export const editorPluginClEtAdaptor: EditorPlugin<
  EditorPluginClEtAdaptorPropertiesExt,
  ClassicalLayoutEditorPlugin | ElementTreeEditorPlugin
> = {
  id: 'cl-et-adaptor',
  // 在 editorPluginLayoutStoreInit 之前，确保不会覆盖 initOptions
  position: {
    target: editorPluginLayoutStore,
  },
  initEditor(ctx) {
    const { i18nStore, layoutStore } = ctx
    //#region i18n 摇树
    // 打包器预处理，只能处理 if-else，不能处理 switch-case
    if (!process.env.LC_LANGUAGE) {
      i18nStore.addResource(editorPluginClEtAdaptorI18n)
    } else if (process.env.LC_LANGUAGE === EN_US) {
      i18nStore.addResource({
        [EN_US]: editorPluginClEtAdaptorI18nEnUs,
      })
    } else if (process.env.LC_LANGUAGE === ZH_CN) {
      i18nStore.addResource({
        [ZH_CN]: editorPluginClEtAdaptorI18nZhCn,
      })
    }
    //#endregion
    merge(layoutStore.config, {
      left: {
        contentItems: {
          [clEtLeftItem.id]: clEtLeftItem,
        },
      },
    } satisfies typeof layoutStore.config)
  },
}
