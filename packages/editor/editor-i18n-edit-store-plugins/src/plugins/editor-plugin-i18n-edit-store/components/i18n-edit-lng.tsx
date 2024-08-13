import { useEditor } from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import {
  IconBtn,
  useLatestFn,
  withStylePropsObserver,
} from '@p-lc/react-shared'
import { VCVN_COLOR_BG } from '@p-lc/shared'
import { Tooltip } from 'antd'
import { PlusCircle } from 'iconoir-react'
import { keys } from 'lodash-uni'
import type { FC } from 'react'
import { useRef } from 'react'
import styled from 'styled-components'
import type { I18nEditEditor } from '../../../types'
import { I18N_KEY_I18N_EDIT_ADD_KEY } from '../i18n'
import { I18nEditItem } from './i18n-edit-item'

/**
 * 国际化编辑语言属性
 */
export interface I18nEditLngProps extends StyleProps {
  /**
   * 语言
   */
  lng: string
}

/**
 * 国际化编辑语言，编辑单个语言下所有文案
 */
export const I18nEditLng: FC<I18nEditLngProps> = withStylePropsObserver(
  ({ lng }) => {
    const {
      i18nStore: { t },
      i18nEditStore,
    } = useEditor<I18nEditEditor>()
    const { getLngRes, openKeyDialog } = i18nEditStore
    const title = t(I18N_KEY_I18N_EDIT_ADD_KEY)
    const handleAddBtnClick = useLatestFn(() => openKeyDialog())
    const refElI18nEditLng = useRef<HTMLDivElement>(null)
    const lngRes = getLngRes(lng)
    const finalKeys = lngRes ? keys(lngRes) : i18nEditStore.keys
    // console.log('I18nEditLng render', lng)
    return (
      <InternalI18nEditLngContainer
        className="lc-i18n-edit-lng"
        ref={refElI18nEditLng}
      >
        <div className="lc-add">
          <Tooltip title={title}>
            <IconBtn onClick={handleAddBtnClick}>
              <PlusCircle />
            </IconBtn>
          </Tooltip>
        </div>
        {finalKeys.map((key) => (
          <I18nEditItem
            lng={lng}
            i18nKey={key}
            text={lngRes?.[key] || ''}
            key={key}
          />
        ))}
      </InternalI18nEditLngContainer>
    )
  },
)

/**
 * 内部：国际化编辑语言容器
 */
export const InternalI18nEditLngContainer = styled.div`
  height: calc(100% + 8px);
  overflow: auto;
  padding: 8px 0;
  margin-top: -8px;

  .lc-add {
    position: sticky;
    top: 0;
    padding: 8px 0;
    transform: translate(0, -8px);
    z-index: 1;
    background: ${VCVN_COLOR_BG};
    display: flex;
    justify-content: center;

    .lc-icon-btn {
      font-size: 14px;
    }
  }
`
