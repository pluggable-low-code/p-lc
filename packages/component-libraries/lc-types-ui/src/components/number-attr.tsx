import type { LcTypesValueOnChange } from '@p-lc/lc-types-uidl-utils'
import type { StyleProps } from '@p-lc/react-shared'
import {
  useLatestFn,
  WideInputNumber,
  withStylePropsMemo,
} from '@p-lc/react-shared'
import { isNumber, isString } from 'lodash-uni'
import { useId, type ComponentProps, type FC } from 'react'
import type { AttrWrapperPropsBase } from '../shared'
import {
  AttrWrapper,
  splitAttrWrapperPropsBase,
  useStaticValueOnChange,
} from '../shared'

/**
 * 数字属性（Attribute）属性
 */
export interface NumberAttrProps
  extends StyleProps,
    AttrWrapperPropsBase,
    Omit<ComponentProps<typeof WideInputNumber>, 'value' | 'onChange'>,
    LcTypesValueOnChange {}

/**
 * 数字属性
 */
export const NumberAttr: FC<NumberAttrProps> = withStylePropsMemo((props) => {
  const [baseProps, restProps] = splitAttrWrapperPropsBase(props)
  const transformedProps = useStaticValueOnChange(
    restProps,
    (v) => isString(v) || isNumber(v),
    true,
  )
  const recipeId = useId()
  const { value: transformedValue, onChange: transformedOnChange } =
    transformedProps
  const inputNumberValue = transformedValue ?? null
  const inputNumberOnChange = useLatestFn((value: string | number | null) => {
    if (!transformedOnChange) return
    if (isNumber(value) || isString(value)) {
      transformedOnChange?.(value, { recipeId })
    } else {
      transformedOnChange?.(undefined)
    }
  })
  return (
    <AttrWrapper {...baseProps} className="lc-boolean-attr">
      <WideInputNumber
        size="small"
        {...transformedProps}
        value={inputNumberValue}
        onChange={inputNumberOnChange}
      />
    </AttrWrapper>
  )
})
