import type { DepPluginUniteEditorPlugin, EditorPlugin } from '@p-lc/editor'
import { isContextMenuElement } from '@p-lc/editor'
import { EN_US, ZH_CN } from '@p-lc/shared'
import {
  createBatchMatchSimpleShortcut,
  SIMPLE_SHORTCUT_FLAG_NONE,
} from '../../../shortcut-toolbar'
import type { UniToolbarItem } from '../editor-plugin-uni-toolbar-store'
import { type editorPluginUniToolbarStore } from '../editor-plugin-uni-toolbar-store'
import type { EditorPluginUniToolbarStoreDeleteElementI18nKeyOptions } from './i18n'
import {
  editorPluginUniToolbarStoreDeleteElementI18n,
  editorPluginUniToolbarStoreDeleteElementI18nEnUs,
  editorPluginUniToolbarStoreDeleteElementI18nZhCn,
  I18N_KEY_UNI_TOOLBAR_DELETE_ELEMENT,
} from './i18n'
import { SeitIconBtnDelete } from './seit-icon-btn-delete'

export * from './i18n'
export * from './seit-icon-btn-delete'

/**
 * 编辑器通用工具栏仓库删除元素插件属性扩展
 */
export interface EditorPluginUniToolbarStoreDeleteElementPropertiesExt {
  editor: {
    /**
     * 国际化仓库
     */
    i18nStore: {
      /**
       * 翻译键值选项
       */
      tKeyOptions: EditorPluginUniToolbarStoreDeleteElementI18nKeyOptions
    }
    /**
     * 通用工具栏仓库
     */
    uniToolbarStore: {
      /**
       * 删除选中的元素
       */
      deleteSelectedElement(): void
    }
  }
}

/**
 * 通用工具栏条目：删除元素
 */
export const uniToolbarItemDeleteElement: UniToolbarItem<
  DepPluginUniteEditorPlugin<typeof editorPluginUniToolbarStoreDeleteElement>
> = {
  id: 'de',
  seitItem: {
    groupIndex: 100,
    index: 650,
    Component: SeitIconBtnDelete,
    match(selectedElement, ctx) {
      const { elementStore } = ctx
      return !!(selectedElement && !elementStore.isRootElement(selectedElement))
    },
  },
  contextMenuItem: {
    index: 650,
    label: {
      key: I18N_KEY_UNI_TOOLBAR_DELETE_ELEMENT,
    },
    match(entity, { elementStore }) {
      const { elementId } = entity
      return (
        isContextMenuElement(entity) && !elementStore.isRootElement(elementId)
      )
    },
    action(entity, { elementStore }) {
      const { elementId } = entity
      if (elementStore.isRootElement(elementId)) return
      elementStore.deleteElement(elementId)
    },
  },
  shortcut: {
    match: createBatchMatchSimpleShortcut(
      [SIMPLE_SHORTCUT_FLAG_NONE, 'Backspace'],
      [SIMPLE_SHORTCUT_FLAG_NONE, 'Delete'],
    ),
    action(ev, ctx): void {
      void ev
      const { uniToolbarStore } = ctx
      uniToolbarStore.deleteSelectedElement()
    },
  },
}

/**
 * 编辑器通用工具栏仓库删除元素插件
 */
export const editorPluginUniToolbarStoreDeleteElement: EditorPlugin<
  EditorPluginUniToolbarStoreDeleteElementPropertiesExt,
  typeof editorPluginUniToolbarStore
> = {
  id: 'uni-toolbar-store-de',
  initEditor(ctx) {
    const { uniToolbarStore, i18nStore, elementStore } = ctx
    //#region i18n 摇树
    // 打包器预处理，只能处理 if-else，不能处理 switch-case
    if (!process.env.LC_LANGUAGE) {
      i18nStore.addResource(editorPluginUniToolbarStoreDeleteElementI18n)
    } else if (process.env.LC_LANGUAGE === EN_US) {
      i18nStore.addResource({
        [EN_US]: editorPluginUniToolbarStoreDeleteElementI18nEnUs,
      })
    } else if (process.env.LC_LANGUAGE === ZH_CN) {
      i18nStore.addResource({
        [ZH_CN]: editorPluginUniToolbarStoreDeleteElementI18nZhCn,
      })
    }
    //#endregion
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    uniToolbarStore.deleteSelectedElement = () => {
      const { selectedElement, deleteElement } = elementStore
      if (selectedElement) {
        deleteElement(selectedElement.id)
      }
    }
    uniToolbarStore.addItem(uniToolbarItemDeleteElement)
  },
}
