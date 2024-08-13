import type {
  LcTypesOnChangeOptions,
  LcTypesValueOnChange,
} from '@p-lc/lc-types-uidl-utils'
import { useLatestFn } from '@p-lc/react-shared'
import type { Predicate, ValueOnChangeProps } from '@p-lc/shared'
import {
  createStaticExpression,
  getStaticExpressionValue,
} from '@p-lc/uidl-utils'
import { isUndefined } from 'lodash-uni'
import { useMemo } from 'react'

/**
 * 使用静态（表达式）的 value、onChange，切换为具体类型
 * @param props 表达式 value、onChange 属性
 * @param predicate 预测函数
 */
export function useStaticValueOnChange<
  T,
  Props extends LcTypesValueOnChange,
  WithOptions extends boolean = false,
>(
  { value: rawValue, onChange: rawOnChange, ...restProps }: Props,
  predicate?: Predicate<T>,
  withOptions?: WithOptions,
): Omit<Props, 'value' | 'onChange'> &
  ValueOnChangeProps<
    T | undefined,
    WithOptions extends true ? [LcTypesOnChangeOptions | void] : []
  > {
  const value: T | undefined = useMemo(() => {
    const v = rawValue && getStaticExpressionValue(rawValue)
    return !predicate || predicate(v) ? (v as T) : undefined
  }, [predicate, rawValue])
  const onChange = useLatestFn(
    (v?: T, ...args: [LcTypesOnChangeOptions | void]) => {
      rawOnChange?.(
        isUndefined(v) ? v : createStaticExpression(v),
        ...(withOptions ? args : []),
      )
    },
  )
  return { ...restProps, value, onChange }
}
