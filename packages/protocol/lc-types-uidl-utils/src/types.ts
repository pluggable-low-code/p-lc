import type { ValueOnChangeProps } from '@p-lc/shared'
import type { UidlExpression } from '@p-lc/uidl'

/**
 * 低代码类型 onChange 选项
 */
export interface LcTypesOnChangeOptions {
  /**
   * 配方 ID
   */
  recipeId?: string | number | null
}

/**
 * 低代码类型 value + onChange 属性
 */
export type LcTypesValueOnChange = ValueOnChangeProps<
  UidlExpression | undefined,
  [LcTypesOnChangeOptions | void]
>
