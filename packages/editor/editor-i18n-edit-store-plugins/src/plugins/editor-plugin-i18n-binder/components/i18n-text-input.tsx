import { useEditor } from '@p-lc/editor'
import type { ElementAttributesEditor } from '@p-lc/editor-element-attributes-store-plugins'
import type { I18nInputProps } from '@p-lc/lc-types-ui'
import { BindingDialogContextProvider, I18nInput } from '@p-lc/lc-types-ui'
import { textToUidlExpression, uidlExpressionToText } from '@p-lc/pd-utils'
import { useLatestFn } from '@p-lc/react-shared'
import type { Text, ValueOnChangeProps } from '@p-lc/shared'
import type { UidlExpression } from '@p-lc/uidl'
import type { InputRef } from 'antd'
import { forwardRef, memo, useMemo } from 'react'

/**
 * 国际化文本输入框属性
 */
export interface I18nTextInputProps
  extends Omit<I18nInputProps, 'value' | 'onChange'>,
    ValueOnChangeProps<Text | undefined> {}

/**
 * 国际化文本输入框
 */
export const I18nTextInput = memo(
  forwardRef<InputRef, I18nTextInputProps>(
    ({ value, onChange, ...restProps }, ref) => {
      const i18nInputValue: UidlExpression | undefined = useMemo(() => {
        return textToUidlExpression(value)
      }, [value])
      const i18nInputOnChange = useLatestFn((newValue?: UidlExpression) => {
        onChange?.(uidlExpressionToText(newValue))
      })
      const {
        elementAttributesStore: { BindingDialog },
      } = useEditor<ElementAttributesEditor>()
      return (
        <BindingDialogContextProvider value={BindingDialog}>
          <I18nInput
            {...restProps}
            enableI18n
            value={i18nInputValue}
            onChange={i18nInputOnChange}
            ref={ref}
          />
        </BindingDialogContextProvider>
      )
    },
  ),
)
