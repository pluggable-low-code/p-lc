import type { EditorPlugin } from '@p-lc/editor'
import type { FC } from 'react'
import { ActionToolbar } from './action-toolbar'

export * from './action-toolbar'

/**
 * 编辑器操作工具栏仓库插件属性扩展
 */
export interface EditorPluginActionToolbarStorePropertiesExt {
  editor: {
    /**
     * 操作工具栏仓库
     */
    actionToolbarStore: {
      /**
       * 组件
       */
      Component: FC
      /**
       * 条目，id -> 条目
       */
      items: Record<string, ActionToolbarItem>
    }
  }
}

/**
 * 操作工具栏条目
 */
export interface ActionToolbarItem {
  /**
   * 唯一标识
   */
  id: string
  /**
   * 下标，小的在前，默认：Infinity
   */
  index?: number
  /**
   * 组件
   */
  Component: FC
}

/**
 * 编辑器操作工具栏仓库插件
 */
export const editorPluginActionToolbarStore: EditorPlugin<EditorPluginActionToolbarStorePropertiesExt> =
  {
    id: 'action-toolbar-store',
    initEditor(ctx) {
      const actionToolbarStore = (ctx.actionToolbarStore =
        {} as typeof ctx.actionToolbarStore)
      actionToolbarStore.Component = ActionToolbar
      actionToolbarStore.items = {}
    },
  }
