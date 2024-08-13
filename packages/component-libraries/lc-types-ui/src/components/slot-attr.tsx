import type { LcTypesValueOnChange } from '@p-lc/lc-types-uidl-utils'
import type { StyleProps } from '@p-lc/react-shared'
import { useLatestFn, withStylePropsMemo } from '@p-lc/react-shared'
import { EXPRESSION_TYPE_SLOT, isSlotExpression } from '@p-lc/uidl-utils'
import { Switch } from 'antd'
import type { FC } from 'react'
import { useMemo } from 'react'
import { useI18nText } from '../i18n/context'
import { I18N_KEY_SLOT } from '../i18n/keys'
import type { AttrWrapperPropsBase } from '../shared'
import { AttrWrapper, splitAttrWrapperPropsBase } from '../shared'

/**
 * 插槽属性（Attribute）属性
 */
export interface SlotAttrProps
  extends StyleProps,
    AttrWrapperPropsBase,
    LcTypesValueOnChange {
  /**
   * 动态渲染
   */
  dynamic?: boolean
}

/**
 * 插槽属性
 */
export const SlotAttr: FC<SlotAttrProps> = withStylePropsMemo((props) => {
  const [baseProps, { dynamic, value, onChange }] =
    splitAttrWrapperPropsBase(props)
  const expr = useMemo(() => {
    if (isSlotExpression(value)) return value
  }, [value])
  const handleSwitchChange = useLatestFn((v: boolean) => {
    onChange?.(
      v
        ? {
            type: EXPRESSION_TYPE_SLOT,
            value: [],
            dynamic,
          }
        : undefined,
    )
  })
  const textSlot = useI18nText(I18N_KEY_SLOT)
  return (
    <AttrWrapper {...baseProps} className="lc-string-attr">
      <Switch
        checkedChildren={textSlot}
        unCheckedChildren={textSlot}
        value={!!expr}
        onChange={handleSwitchChange}
      />
    </AttrWrapper>
  )
})
