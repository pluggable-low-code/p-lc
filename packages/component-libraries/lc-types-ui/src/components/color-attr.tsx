import type { LcTypesValueOnChange } from '@p-lc/lc-types-uidl-utils'
import type { StyleProps } from '@p-lc/react-shared'
import { useLatestFn, withStylePropsMemo } from '@p-lc/react-shared'
import { ColorPicker } from 'antd'
import type { Color } from 'antd/es/color-picker'
import type { ModeType } from 'antd/es/color-picker/interface'
import { isString } from 'lodash-uni'
import { useId, type ComponentProps, type FC } from 'react'
import type { AttrWrapperPropsBase } from '../shared'
import {
  AttrWrapper,
  splitAttrWrapperPropsBase,
  useStaticValueOnChange,
} from '../shared'

/**
 * 颜色属性（Attribute）属性
 */
export interface ColorAttrProps
  extends StyleProps,
    AttrWrapperPropsBase,
    Omit<ComponentProps<typeof ColorPicker>, 'value' | 'onChange'>,
    LcTypesValueOnChange {}

/**
 * 颜色模式
 */
const colorModes: ModeType[] = ['single', 'gradient']

/**
 * 颜色属性
 */
export const ColorAttr: FC<ColorAttrProps> = withStylePropsMemo((props) => {
  const [baseProps, restProps] = splitAttrWrapperPropsBase(props)
  const transformedProps = useStaticValueOnChange(restProps, isString, true)
  const { value: transformedValue, onChange: transformedOnChange } =
    transformedProps
  const recipeId = useId()
  const colorPickerValue = transformedValue
  const handleColorPickerOnChange = useLatestFn((color: Color) => {
    transformedOnChange?.(color.cleared ? undefined : color.toCssString(), {
      recipeId,
    })
  })
  return (
    <AttrWrapper {...baseProps} className="lc-color-attr">
      <ColorPicker
        size="small"
        showText
        mode={colorModes}
        allowClear
        {...transformedProps}
        value={colorPickerValue}
        onChange={handleColorPickerOnChange}
      />
    </AttrWrapper>
  )
})
