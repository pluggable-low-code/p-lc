import { useEditor } from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import {
  RadioGroup,
  TypographyTextTip,
  useLatestFn,
  VirtualList,
  withStylePropsObserver,
} from '@p-lc/react-shared'
import {
  filterStringsByRegExp,
  jsonStringify,
  type ValueOnChangeProps,
} from '@p-lc/shared'
import type { UidlExpression } from '@p-lc/uidl'
import type { UidlExpressionI18n } from '@p-lc/uidl-ext-i18n'
import { EXPRESSION_TYPE_I18N, isI18nExpression } from '@p-lc/uidl-ext-i18n'
import type { RadioChangeEvent } from 'antd'
import { Input, Radio } from 'antd'
import { chunk, isString } from 'lodash-uni'
import type { ChangeEvent, FC } from 'react'
import { useMemo, useState } from 'react'
import styled from 'styled-components'
import type { I18nEditEditor } from '../../../types'
import { I18N_KEY_I18N_EDIT_SEARCH } from '../../editor-plugin-i18n-edit-store'

/**
 * 国际化键值条目最小高度
 */
const I18N_KEY_ITEM_MIN_HEIGHT = 56

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
      i18nStore: { language, t },
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
    const [searchText, setSearchText] = useState('')
    const handleInputChange = useLatestFn(
      (ev: ChangeEvent<HTMLInputElement>) => {
        setSearchText(ev.target.value)
      },
    )
    const keyChunks = useMemo(() => {
      return chunk(filterStringsByRegExp(keys, searchText), 4)
    }, [keys, searchText])
    // console.log('I18nBinderBody render')
    return (
      <InternalI18nBinderBodyContainer className="lc-i18n-binder-body">
        <Input
          value={searchText}
          onChange={handleInputChange}
          placeholder={t(I18N_KEY_I18N_EDIT_SEARCH)}
          allowClear
          autoFocus
        />
        <RadioGroup value={expr?.key} onChange={handleRadioGroupChange}>
          <VirtualList
            data={keyChunks}
            itemHeight={I18N_KEY_ITEM_MIN_HEIGHT}
            itemKey={jsonStringify}
          >
            {(ks) => (
              <div>
                {ks.map((key) => (
                  <Radio key={key} value={key}>
                    <div className="lc-key">
                      <TypographyTextTip>{key}</TypographyTextTip>
                    </div>
                    <div className="lc-text">
                      <TypographyTextTip type="secondary">
                        {getText(language, key)}
                      </TypographyTextTip>
                    </div>
                  </Radio>
                ))}
              </div>
            )}
          </VirtualList>
        </RadioGroup>
      </InternalI18nBinderBodyContainer>
    )
  },
)

/**
 * 内部：国际化绑定器主体容器
 */
export const InternalI18nBinderBodyContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  .ant-input-affix-wrapper {
    margin: 24px 0 12px;
  }

  .ant-radio-group {
    height: 0;
    flex: auto;
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
