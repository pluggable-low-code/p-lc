import { useEditor } from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import {
  TypographyTitleSmall5,
  useLatestFn,
  VirtualList,
  withStylePropsObserver,
} from '@p-lc/react-shared'
import { echo } from '@p-lc/shared'
import type { ListRef } from 'rc-virtual-list'
import { useEffect, type FC } from 'react'
import styled from 'styled-components'
import type { I18nEditEditor } from '../../../types'
import { I18N_KEY_I18N_EDIT_NONE } from '../i18n'
import { I18N_EDIT_ITEM_MIN_HEIGHT, I18nEditItem } from './i18n-edit-item'

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
      i18nEditStore: {
        filteredKeys,
        getLngRes,
        setRefVirtualList,
        autoScrollToNewKey,
      },
    } = useEditor<I18nEditEditor>()
    const refList = useLatestFn((refVirtualList: ListRef | null) => {
      setRefVirtualList(lng, refVirtualList)
    })
    const lngRes = getLngRes(lng)
    useEffect(() => {
      autoScrollToNewKey(lng)
    })
    // console.log('I18nEditLng render', lng)
    return (
      <InternalI18nEditLngContainer className="lc-i18n-edit-lng">
        <VirtualList
          data={filteredKeys}
          itemHeight={I18N_EDIT_ITEM_MIN_HEIGHT}
          itemKey={echo}
          refList={refList}
        >
          {(key) => {
            return (
              <I18nEditItem
                lng={lng}
                i18nKey={key}
                text={lngRes?.[key] || ''}
              />
            )
          }}
        </VirtualList>
        {!filteredKeys.length && (
          <div className="lc-none">
            <TypographyTitleSmall5 type="secondary">
              {t(I18N_KEY_I18N_EDIT_NONE)}
            </TypographyTitleSmall5>
          </div>
        )}
      </InternalI18nEditLngContainer>
    )
  },
)

/**
 * 内部：国际化编辑语言容器
 */
export const InternalI18nEditLngContainer = styled.div`
  position: relative;
  height: 100%;

  .lc-none {
    position: absolute;
    inset: 100px 0;
    text-align: center;

    &&& .ant-typography {
      font-weight: normal;
    }
  }
`
