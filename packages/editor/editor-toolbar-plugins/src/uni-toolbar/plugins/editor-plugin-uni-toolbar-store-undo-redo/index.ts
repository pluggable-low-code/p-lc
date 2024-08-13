import type { DepPluginUniteEditorPlugin, EditorPlugin } from '@p-lc/editor'
import { EN_US, IS_APPLE_DEVICE, ZH_CN } from '@p-lc/shared'
import {
  createBatchMatchSimpleShortcut,
  SIMPLE_SHORTCUT_FLAG_CTRL,
  SIMPLE_SHORTCUT_FLAG_META,
  SIMPLE_SHORTCUT_FLAG_MOD,
  SIMPLE_SHORTCUT_FLAG_SHIFT,
} from '../../../shortcut-toolbar'
import type { UniToolbarItem } from '../editor-plugin-uni-toolbar-store'
import { type editorPluginUniToolbarStore } from '../editor-plugin-uni-toolbar-store'
import { ActionToolbarRedoBtn } from './action-toolbar-redo-btn'
import { ActionToolbarUndoBtn } from './action-toolbar-undo-btn'
import type { EditorPluginUniToolbarStoreUndoRedoI18nKeyOptions } from './i18n'
import {
  editorPluginUniToolbarStoreUndoRedoI18n,
  editorPluginUniToolbarStoreUndoRedoI18nEnUs,
  editorPluginUniToolbarStoreUndoRedoI18nZhCn,
} from './i18n'

export * from './action-toolbar-redo-btn'
export * from './action-toolbar-undo-btn'
export * from './i18n'

/**
 * 编辑器通用工具栏仓库撤销重做插件属性扩展
 */
export interface EditorPluginUniToolbarStoreUndoRedoPropertiesExt {
  editor: {
    /**
     * 国际化仓库
     */
    i18nStore: {
      /**
       * 翻译键值选项
       */
      tKeyOptions: EditorPluginUniToolbarStoreUndoRedoI18nKeyOptions
    }
  }
}

/**
 * 通用工具栏条目：撤销
 */
export const uniToolbarItemUndo: UniToolbarItem<
  DepPluginUniteEditorPlugin<typeof editorPluginUniToolbarStoreUndoRedo>
> = {
  id: 'undo',
  actionToolbarItem: {
    index: 550,
    Component: ActionToolbarUndoBtn,
  },
  shortcut: {
    match: createBatchMatchSimpleShortcut([SIMPLE_SHORTCUT_FLAG_MOD, 'z']),
    action(ev, ctx): void {
      void ev
      const { uidlStore } = ctx
      uidlStore.undo()
    },
  },
}

/**
 * 通用工具栏条目：重做
 */
export const uniToolbarItemRedo: UniToolbarItem<
  DepPluginUniteEditorPlugin<typeof editorPluginUniToolbarStoreUndoRedo>
> = {
  id: 'redo',
  actionToolbarItem: {
    index: 560,
    Component: ActionToolbarRedoBtn,
  },
  shortcut: {
    match: createBatchMatchSimpleShortcut(
      IS_APPLE_DEVICE
        ? [SIMPLE_SHORTCUT_FLAG_META | SIMPLE_SHORTCUT_FLAG_SHIFT, 'z']
        : [SIMPLE_SHORTCUT_FLAG_CTRL, 'y'],
    ),
    action(ev, ctx): void {
      void ev
      const { uidlStore } = ctx
      uidlStore.redo()
    },
  },
}

/**
 * 编辑器通用工具栏仓库撤销重做插件
 */
export const editorPluginUniToolbarStoreUndoRedo: EditorPlugin<
  EditorPluginUniToolbarStoreUndoRedoPropertiesExt,
  typeof editorPluginUniToolbarStore
> = {
  id: 'uni-toolbar-store-undo-redo',
  initEditor(ctx) {
    const {
      uniToolbarStore: { addItem },
      i18nStore,
    } = ctx
    //#region i18n 摇树
    // 打包器预处理，只能处理 if-else，不能处理 switch-case
    if (!process.env.LC_LANGUAGE) {
      i18nStore.addResource(editorPluginUniToolbarStoreUndoRedoI18n)
    } else if (process.env.LC_LANGUAGE === EN_US) {
      i18nStore.addResource({
        [EN_US]: editorPluginUniToolbarStoreUndoRedoI18nEnUs,
      })
    } else if (process.env.LC_LANGUAGE === ZH_CN) {
      i18nStore.addResource({
        [ZH_CN]: editorPluginUniToolbarStoreUndoRedoI18nZhCn,
      })
    }
    //#endregion
    addItem(uniToolbarItemUndo)
    addItem(uniToolbarItemRedo)
  },
}
