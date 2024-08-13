import type { ValueOnChangeProps } from '@p-lc/shared'
import { Input, InputNumber, type InputRef } from 'antd'
import { forwardRef, memo, type ChangeEvent, type ComponentProps } from 'react'
import styled from 'styled-components'
import { useLatestFn } from '../hooks'

/**
 * 文本域
 */
export const TextArea = Input.TextArea

/**
 * 宽数字输入框
 */
export const WideInputNumber = styled(InputNumber)`
  width: 100%;
` as typeof InputNumber

/**
 * 可清理的输入框属性
 */
export interface ClearableInputProps
  extends Omit<ComponentProps<typeof Input>, 'value' | 'onChange'>,
    ValueOnChangeProps<string | undefined> {}

/**
 * 可清理的输入框
 */
export const ClearableInput = memo(
  forwardRef<InputRef, ClearableInputProps>(
    ({ value, onChange, allowClear, ...restProps }, ref) => {
      const finalValue = value || ''
      const finalOnChange = useLatestFn((ev: ChangeEvent<HTMLInputElement>) => {
        // click 表示点击清除按钮
        const isClear = ev.type === 'click'
        const str = ev.target.value
        return onChange?.(!str && isClear ? undefined : str)
      })
      return (
        <InternalClearableInput
          {...restProps}
          $allowClear={!!allowClear}
          value={finalValue}
          onChange={finalOnChange}
          ref={ref}
        />
      )
    },
  ),
)

/**
 * 内部可清理的输入框
 */
const InternalClearableInput = styled(Input).attrs({
  allowClear: true,
})<{
  // 自己搞个属性，因为 antd 会报错 https://ant.design/components/input/#FAQ
  $allowClear?: boolean
}>`
  &&& .ant-input-clear-icon-hidden {
    visibility: ${
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      ({ $allowClear }) => $allowClear && 'visible'
    };
  }
`
