import type { DepPluginUniteEditorPlugin, EditorPlugin } from '@p-lc/editor'
import { EN_US, ZH_CN } from '@p-lc/shared'
import type { UniToolbarItem } from '../editor-plugin-uni-toolbar-store'
import { type editorPluginUniToolbarStore } from '../editor-plugin-uni-toolbar-store'
import type { EditorPluginUniToolbarStoreSelectI18nKeyOptions } from './i18n'
import {
  editorPluginUniToolbarStoreSelectI18n,
  editorPluginUniToolbarStoreSelectI18nEnUs,
  editorPluginUniToolbarStoreSelectI18nZhCn,
} from './i18n'
import { SeitIconBtnSelectParent } from './seit-icon-btn-select-parent'

export * from './i18n'
export * from './seit-icon-btn-select-parent'

/**
 * 编辑器通用工具栏仓库选择插件属性扩展
 */
export interface EditorPluginUniToolbarStoreSelectPropertiesExt {
  editor: {
    /**
     * 国际化仓库
     */
    i18nStore: {
      /**
       * 翻译键值选项
       */
      tKeyOptions: EditorPluginUniToolbarStoreSelectI18nKeyOptions
    }
    /**
     * 通用工具栏仓库
     */
    uniToolbarStore: {
      /**
       * 选择父元素
       */
      selectParentElement(): void
    }
  }
}

/**
 * 通用工具栏条目：选择父元素
 */
export const uniToolbarItemSelectParent: UniToolbarItem<
  DepPluginUniteEditorPlugin<typeof editorPluginUniToolbarStoreSelect>
> = {
  id: 'sp',
  seitItem: {
    groupIndex: 100,
    index: 550,
    Component: SeitIconBtnSelectParent,
    match(selectedElement, ctx) {
      const { elementStore } = ctx
      return !!(selectedElement && !elementStore.isRootElement(selectedElement))
    },
  },
}

/**
 * 编辑器通用工具栏仓库选择插件
 */
export const editorPluginUniToolbarStoreSelect: EditorPlugin<
  EditorPluginUniToolbarStoreSelectPropertiesExt,
  typeof editorPluginUniToolbarStore
> = {
  id: 'uni-toolbar-store-select',
  initEditor(ctx) {
    const { uniToolbarStore, i18nStore, elementStore } = ctx
    //#region i18n 摇树
    // 打包器预处理，只能处理 if-else，不能处理 switch-case
    if (!process.env.LC_LANGUAGE) {
      i18nStore.addResource(editorPluginUniToolbarStoreSelectI18n)
    } else if (process.env.LC_LANGUAGE === EN_US) {
      i18nStore.addResource({
        [EN_US]: editorPluginUniToolbarStoreSelectI18nEnUs,
      })
    } else if (process.env.LC_LANGUAGE === ZH_CN) {
      i18nStore.addResource({
        [ZH_CN]: editorPluginUniToolbarStoreSelectI18nZhCn,
      })
    }
    //#endregion
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    uniToolbarStore.selectParentElement = () => {
      const { selectedElementId, selectElement, getParentElementId } =
        elementStore
      const parentElementId = getParentElementId(selectedElementId)
      if (parentElementId) selectElement(parentElementId)
    }
    uniToolbarStore.addItem(uniToolbarItemSelectParent)
  },
}
