import type { StyleProps } from '@p-lc/react-shared'
import { withStylePropsMemo } from '@p-lc/react-shared'
import type { FC } from 'react'
import type { AttrWrapperPropsBase, I18nInputProps } from '../shared'
import { AttrWrapper, I18nInput, splitAttrWrapperPropsBase } from '../shared'

/**
 * 字符串属性（Attribute）属性
 */
export interface StringAttrProps
  extends StyleProps,
    AttrWrapperPropsBase,
    I18nInputProps {}

/**
 * 字符串属性
 */
export const StringAttr: FC<StringAttrProps> = withStylePropsMemo((props) => {
  const [baseProps, restProps] = splitAttrWrapperPropsBase(props)
  return (
    <AttrWrapper {...baseProps} className="lc-string-attr">
      <I18nInput size="small" {...restProps} />
    </AttrWrapper>
  )
})
