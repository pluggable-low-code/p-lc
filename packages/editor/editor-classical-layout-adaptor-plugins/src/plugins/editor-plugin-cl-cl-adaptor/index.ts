import type { EditorPlugin } from '@p-lc/editor'
import { editorPluginLayoutStore } from '@p-lc/editor'
import type {
  ClassicalLayoutEditorPlugin,
  ClassicalLayoutLeftItem,
} from '@p-lc/editor-classical-layout-plugins'
import {
  ComponentLibrary,
  ComponentLibraryIcon,
} from '@p-lc/editor-component-library-store-plugins'
import { EN_US, ZH_CN } from '@p-lc/shared'
import { merge } from 'lodash-uni'
import type { EditorPluginClClAdaptorI18nKeyOptions } from './i18n'
import {
  I18N_KEY_COMPONENT_LIBRARY_ICON_TIP,
  editorPluginClClAdaptorI18n,
  editorPluginClClAdaptorI18nEnUs,
  editorPluginClClAdaptorI18nZhCn,
} from './i18n'

export * from './i18n'

/**
 * 编辑器经典布局组件库适配器插件属性扩展
 */
export interface EditorPluginClClAdaptorPropertiesExt {
  editor: {
    /**
     * 国际化仓库
     */
    i18nStore: {
      /**
       * 翻译键值选项
       */
      tKeyOptions: EditorPluginClClAdaptorI18nKeyOptions
    }
  }
}

/**
 * 经典布局组件库左部条目
 */
export const clCLeftItem: ClassicalLayoutLeftItem = {
  id: 'cl',
  index: 150,
  Component: ComponentLibrary,
  Icon: ComponentLibraryIcon,
  iconTip: {
    key: I18N_KEY_COMPONENT_LIBRARY_ICON_TIP,
  },
}

/**
 * 编辑器经典布局组件库适配器插件
 */
export const editorPluginClClAdaptor: EditorPlugin<
  EditorPluginClClAdaptorPropertiesExt,
  ClassicalLayoutEditorPlugin
> = {
  id: 'cl-cl-adaptor',
  // 在 editorPluginLayoutStoreInit 之前，确保不会覆盖 initOptions
  position: {
    target: editorPluginLayoutStore,
  },
  initEditor(ctx) {
    const { i18nStore, layoutStore } = ctx
    //#region i18n 摇树
    // 打包器预处理，只能处理 if-else，不能处理 switch-case
    if (!process.env.LC_LANGUAGE) {
      i18nStore.addResource(editorPluginClClAdaptorI18n)
    } else if (process.env.LC_LANGUAGE === EN_US) {
      i18nStore.addResource({
        [EN_US]: editorPluginClClAdaptorI18nEnUs,
      })
    } else if (process.env.LC_LANGUAGE === ZH_CN) {
      i18nStore.addResource({
        [ZH_CN]: editorPluginClClAdaptorI18nZhCn,
      })
    }
    //#endregion
    merge(layoutStore.config, {
      left: {
        contentItems: {
          [clCLeftItem.id]: clCLeftItem,
        },
      },
    } satisfies typeof layoutStore.config)
  },
}
