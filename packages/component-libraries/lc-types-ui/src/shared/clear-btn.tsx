import type { LcTypesValueOnChange } from '@p-lc/lc-types-uidl-utils'
import { IconBtn, useLatestFn } from '@p-lc/react-shared'
import { Tooltip } from 'antd'
import { XmarkCircle } from 'iconoir-react'
import { isUndefined } from 'lodash-uni'
import type { FC } from 'react'
import { memo } from 'react'
import styled from 'styled-components'
import { useI18nText } from '../i18n/context'
import { I18N_KEY_CLEAR } from '../i18n/keys'

/**
 * 清除按钮
 */
export const ClearBtn: FC<LcTypesValueOnChange> = memo(
  ({ value, onChange }) => {
    const handleBtnClick = useLatestFn(() => {
      onChange?.(undefined)
    })
    const textClear = useI18nText(I18N_KEY_CLEAR)
    return (
      isUndefined(value) || (
        <Tooltip title={textClear}>
          <InternalClearBtn onClick={handleBtnClick}>
            <XmarkCircle />
          </InternalClearBtn>
        </Tooltip>
      )
    )
  },
)

/**
 * 内部：清除按钮
 */
export const InternalClearBtn = styled(IconBtn)`
  margin-left: 6px;
`
