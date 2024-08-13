import type { LcTypesValueOnChange } from '@p-lc/lc-types-uidl-utils'
import type { StyleProps } from '@p-lc/react-shared'
import { useLatestFn, withStylePropsMemo } from '@p-lc/react-shared'
import { Button } from 'antd'
import { isUndefined } from 'lodash-uni'
import type { ComponentProps, FC } from 'react'
import { useState } from 'react'
import { useI18nText } from '../i18n/context'
import { I18N_KEY_BIND, I18N_KEY_BOUND } from '../i18n/keys'
import type { AttrWrapperPropsBase, BindingDialogProps } from '../shared'
import {
  AttrWrapper,
  ClearBtn,
  splitAttrWrapperPropsBase,
  useBindingDialog,
} from '../shared'

/**
 * 绑定属性（Attribute）属性
 */
export interface BindingAttrProps
  extends StyleProps,
    AttrWrapperPropsBase,
    Omit<ComponentProps<typeof Button>, 'value' | 'onChange'>,
    Pick<
      BindingDialogProps,
      'defaultBinderType' | 'includeBinderTypes' | 'excludeBinderTypes'
    >,
    LcTypesValueOnChange {}

/**
 * 绑定属性
 */
export const BindingAttr: FC<BindingAttrProps> = withStylePropsMemo((props) => {
  const [
    baseProps,
    {
      defaultBinderType,
      includeBinderTypes,
      excludeBinderTypes,
      value,
      onChange,
      ...restProps
    },
  ] = splitAttrWrapperPropsBase(props)
  const BindingDialog = useBindingDialog()
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const handleButtonClick = useLatestFn(() => setDialogIsOpen(true))
  const handleDialogClose = useLatestFn(() => setDialogIsOpen(false))
  const isBound = !isUndefined(value)
  const textBind = useI18nText(I18N_KEY_BIND)
  const textBound = useI18nText(I18N_KEY_BOUND)
  return (
    <AttrWrapper {...baseProps} className="lc-binding-attr">
      <Button
        size="small"
        type={isBound ? 'primary' : value}
        onClick={handleButtonClick}
        {...restProps}
      >
        {isBound ? textBound : textBind}
      </Button>
      <ClearBtn value={value} onChange={onChange} />
      {BindingDialog && (
        <BindingDialog
          open={dialogIsOpen}
          onClose={handleDialogClose}
          defaultBinderType={defaultBinderType}
          includeBinderTypes={includeBinderTypes}
          excludeBinderTypes={excludeBinderTypes}
          value={value}
          onChange={onChange}
        />
      )}
    </AttrWrapper>
  )
})
