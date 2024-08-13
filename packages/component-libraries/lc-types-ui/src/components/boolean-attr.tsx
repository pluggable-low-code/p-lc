import type { LcTypesValueOnChange } from '@p-lc/lc-types-uidl-utils'
import type { StyleProps } from '@p-lc/react-shared'
import { withStylePropsMemo } from '@p-lc/react-shared'
import { Switch } from 'antd'
import { isBoolean } from 'lodash-uni'
import type { ComponentProps, FC } from 'react'
import type { AttrWrapperPropsBase } from '../shared'
import {
  AttrWrapper,
  ClearBtn,
  splitAttrWrapperPropsBase,
  useStaticValueOnChange,
} from '../shared'

/**
 * 布尔属性（Attribute）属性
 */
export interface BooleanAttrProps
  extends StyleProps,
    AttrWrapperPropsBase,
    Omit<ComponentProps<typeof Switch>, 'value' | 'onChange'>,
    LcTypesValueOnChange {}

/**
 * 布尔属性
 */
export const BooleanAttr: FC<BooleanAttrProps> = withStylePropsMemo((props) => {
  const [baseProps, { defaultValue, ...restProps }] =
    splitAttrWrapperPropsBase(props)
  const transformedProps = useStaticValueOnChange(restProps, isBoolean)
  const { value } = transformedProps
  return (
    <AttrWrapper {...baseProps} className="lc-boolean-attr">
      <Switch
        size="small"
        {...transformedProps}
        value={value ?? defaultValue}
      />
      <ClearBtn {...restProps} />
    </AttrWrapper>
  )
})
