import type { LcTypesValueOnChange } from '@p-lc/lc-types-uidl-utils'
import type { StyleProps } from '@p-lc/react-shared'
import { WideSelect, withStylePropsMemo } from '@p-lc/react-shared'
import { isBoolean, isNumber, isString } from 'lodash-uni'
import type { ComponentProps, FC } from 'react'
import type { AttrWrapperPropsBase } from '../shared'
import {
  AttrWrapper,
  splitAttrWrapperPropsBase,
  useStaticValueOnChange,
} from '../shared'

/**
 * 枚举属性（Attribute）属性
 */
export interface EnumAttrProps
  extends StyleProps,
    AttrWrapperPropsBase,
    Omit<
      ComponentProps<typeof WideSelect>,
      'value' | 'onChange' | 'defaultValue'
    >,
    LcTypesValueOnChange {}

/**
 * 枚举属性
 */
export const EnumAttr: FC<EnumAttrProps> = withStylePropsMemo((props) => {
  const [baseProps, restProps] = splitAttrWrapperPropsBase(props)
  const transformedProps = useStaticValueOnChange(
    restProps,
    (v) => isString(v) || isNumber(v) || isBoolean(v),
  )
  return (
    <AttrWrapper {...baseProps} className="lc-boolean-attr">
      <WideSelect size="small" allowClear {...transformedProps} />
    </AttrWrapper>
  )
})
