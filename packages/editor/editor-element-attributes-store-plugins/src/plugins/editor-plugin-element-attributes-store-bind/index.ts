import type { EditorPlugin } from '@p-lc/editor'
import type { BindingDialogProps } from '@p-lc/lc-types-ui'
import type { Text, ValueOnChangeProps } from '@p-lc/shared'
import { create } from '@p-lc/shared'
import type { UidlExpression } from '@p-lc/uidl'
import type { FC } from 'react'
import { BindingDialog } from './components'

export * from './components'

/**
 * 编辑器元素属性仓库绑定插件属性扩展
 */
export interface EditorPluginElementAttributesStoreBindPropertiesExt {
  editor: {
    /**
     * 元素属性仓库
     */
    elementAttributesStore: {
      /**
       * 绑定对话框
       */
      BindingDialog: FC<BindingDialogProps>
      /**
       * 绑定器，绑定类型 -> 绑定器
       */
      binders: Record<string, Binder>
    }
  }
}

/**
 * 绑定器
 */
export interface Binder {
  /**
   * 类型，唯一
   */
  type: string
  /**
   * 名称
   */
  name: Text
  /**
   * 下标，小的在前，默认：Infinity
   */
  index?: number
  /**
   * 组件
   */
  Component: FC<ValueOnChangeProps<UidlExpression | undefined>>
}

/**
 * 编辑器元素属性仓库绑定插件
 */
export const editorPluginElementAttributesStoreBind: EditorPlugin<EditorPluginElementAttributesStoreBindPropertiesExt> =
  {
    id: 'ea-store-bind',
    initEditor(ctx) {
      const { elementAttributesStore } = ctx
      elementAttributesStore.BindingDialog = BindingDialog
      elementAttributesStore.binders = create(null)
    },
  }
