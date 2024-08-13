import type { LcTypesValueOnChange } from '@p-lc/lc-types-uidl-utils'
import type { FC } from 'react'
import { createContext, useContext } from 'react'

/**
 * 绑定对话框属性
 */
export interface BindingDialogProps extends LcTypesValueOnChange {
  /**
   * 是否打开
   */
  open: boolean
  /**
   * 关闭事件
   */
  onClose(): void
  /**
   * 默认绑定器类型
   */
  defaultBinderType?: string
  /**
   * 包含绑定器类型
   */
  includeBinderTypes?: string[]
  /**
   * 不包含绑定器类型，优先级比 `includeBinderTypes` 低
   */
  excludeBinderTypes?: string[]
}

/**
 * 绑定器类型：国际化
 */
export const BINDER_TYPE_I18N = 'i18n'

/**
 * 绑定对话框上下文
 */
const BindingDialogContext = createContext<FC<BindingDialogProps> | null>(null)

/**
 * 绑定对话框上下文提供者
 */
export const BindingDialogContextProvider = BindingDialogContext.Provider

/**
 * 使用绑定对话框
 */
export function useBindingDialog(): FC<BindingDialogProps> | null {
  return useContext(BindingDialogContext)
}
