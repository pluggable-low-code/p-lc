import { useEditor } from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import {
  RadioGroup,
  typographyEllipsisWithTooltip,
  TypographyText,
  useLatestFn,
  withStylePropsObserver,
} from '@p-lc/react-shared'
import type { ValueOnChangeProps } from '@p-lc/shared'
import type { UidlExpression } from '@p-lc/uidl'
import type { UidlExpressionI18n } from '@p-lc/uidl-ext-i18n'
import { EXPRESSION_TYPE_I18N, isI18nExpression } from '@p-lc/uidl-ext-i18n'
import type { RadioChangeEvent } from 'antd'
import { Radio } from 'antd'
import { isString } from 'lodash-uni'
import type { FC } from 'react'
import { useMemo } from 'react'
import styled from 'styled-components'
import type { I18nEditEditor } from '../../../types'

/**
 * 国际化绑定器主体属性
 */
export interface I18nBinderBodyProps
  extends StyleProps,
    ValueOnChangeProps<UidlExpression | undefined> {}

/**
 * 国际化绑定器主体
 */
export const I18nBinderBody: FC<I18nBinderBodyProps> = withStylePropsObserver(
  ({ value, onChange }) => {
    const {
      i18nStore: { language },
      i18nEditStore: { keys, getText },
    } = useEditor<I18nEditEditor>()
    const expr: UidlExpressionI18n | undefined = useMemo(() => {
      if (isI18nExpression(value)) return value
    }, [value])
    const handleRadioGroupChange = useLatestFn((ev: RadioChangeEvent) => {
      const key = ev.target.value
      if (isString(key)) {
        onChange?.({
          type: EXPRESSION_TYPE_I18N,
          key,
        })
      }
    })
    // console.log('I18nBinderBody render')
    return (
      <InternalI18nBinderBodyContainer className="lc-i18n-binder-body">
        <RadioGroup value={expr?.key} onChange={handleRadioGroupChange}>
          {keys.map((key) => (
            <Radio key={key} value={key}>
              <div className="lc-key">
                <TypographyText ellipsis={typographyEllipsisWithTooltip}>
                  {key}
                </TypographyText>
              </div>
              <div className="lc-text">
                <TypographyText
                  type="secondary"
                  ellipsis={typographyEllipsisWithTooltip}
                >
                  {getText(language, key)}
                </TypographyText>
              </div>
            </Radio>
          ))}
        </RadioGroup>
      </InternalI18nBinderBodyContainer>
    )
  },
)

/**
 * 内部：国际化绑定器主体容器
 */
export const InternalI18nBinderBodyContainer = styled.div`
  .ant-radio-group {
    width: 100%;
  }

  .ant-radio-wrapper {
    width: 25%;
    margin: 0 0 12px 0;

    > span:nth-child(2) {
      width: 0;
      flex: auto;
    }
  }
`
