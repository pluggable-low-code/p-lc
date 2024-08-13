import type { LcTypesValueOnChange } from '@p-lc/lc-types-uidl-utils'
import {
  ClearableInput,
  IconBtn,
  useLatestFn,
  type ClearableInputProps,
} from '@p-lc/react-shared'
import type { UidlExpression } from '@p-lc/uidl'
import { isI18nExpression } from '@p-lc/uidl-ext-i18n'
import {
  BOX_TYPE_SWITCH,
  isSwitchBoxExpression,
  type UidlExpressionSwitchBox,
} from '@p-lc/uidl-ext-switch-box'
import { EXPRESSION_TYPE_BOX } from '@p-lc/uidl-utils'
import type { InputRef } from 'antd'
import { Translate } from 'iconoir-react'
import { isString, isUndefined } from 'lodash-uni'
import { forwardRef, memo, useId, useMemo, useState, type FC } from 'react'
import { BINDER_TYPE_I18N, useBindingDialog } from './binding-dialog-context'
import { useStaticValueOnChange } from './use-static-value-on-change'

/**
 * 国际化输入框属性
 */
export interface I18nInputProps
  extends Omit<ClearableInputProps, 'value' | 'onChange' | 'ref'>,
    LcTypesValueOnChange {
  /**
   * 启用国际化
   */
  enableI18n?: boolean
}

/**
 * 国际化输入框
 */
export const I18nInput = memo(
  forwardRef<InputRef, I18nInputProps>(({ enableI18n, ...restProps }, ref) => {
    const transformedProps = useStaticValueOnChange(restProps, isString, true)
    const recipeId = useId()
    const { value: transformedValue, onChange: transformedOnChange } =
      transformedProps
    const { value: rawValue, onChange: rawOnChange } = restProps
    const i18nExpr = useMemo(() => {
      if (isI18nExpression(rawValue)) return rawValue
    }, [rawValue])
    const i18nBtnValue = useMemo(() => {
      if (i18nExpr) {
        return {
          type: EXPRESSION_TYPE_BOX,
          expr: i18nExpr,
          boxType: BOX_TYPE_SWITCH,
          case: BINDER_TYPE_I18N,
          oldExprs: {},
        } satisfies UidlExpressionSwitchBox
      }
    }, [i18nExpr])
    const i18nBtnOnChange = useLatestFn((newExpr?: UidlExpression) => {
      rawOnChange?.(isSwitchBoxExpression(newExpr) ? newExpr.expr : undefined)
    })
    const inputValue =
      (enableI18n && i18nExpr ? i18nExpr.key : transformedValue) || ''
    const inputOnChange = useLatestFn((str?: string) => {
      if (enableI18n && i18nExpr && isString(str)) return
      transformedOnChange?.(str, {
        recipeId,
      })
    })
    return (
      <ClearableInput
        {...transformedProps}
        allowClear={!isUndefined(transformedValue)}
        value={inputValue}
        onChange={inputOnChange}
        addonAfter={
          enableI18n && (
            <I18nBtn value={i18nBtnValue} onChange={i18nBtnOnChange} />
          )
        }
        ref={ref}
      />
    )
  }),
)

/**
 * 国际化按钮绑定器类型，限定为国际化绑定器
 */
export const i18nBtnBinderTypes = [BINDER_TYPE_I18N]

/**
 * 国际化按钮
 */
export const I18nBtn: FC<LcTypesValueOnChange> = memo(({ value, onChange }) => {
  const BindingDialog = useBindingDialog()
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const handleButtonClick = useLatestFn(() => setDialogIsOpen(true))
  const handleDialogClose = useLatestFn(() => setDialogIsOpen(false))
  return (
    <>
      <IconBtn onClick={handleButtonClick} $actived={!!value}>
        <Translate />
      </IconBtn>
      {BindingDialog && (
        <BindingDialog
          open={dialogIsOpen}
          onClose={handleDialogClose}
          defaultBinderType={BINDER_TYPE_I18N}
          includeBinderTypes={i18nBtnBinderTypes}
          value={value}
          onChange={onChange}
        />
      )}
    </>
  )
})
