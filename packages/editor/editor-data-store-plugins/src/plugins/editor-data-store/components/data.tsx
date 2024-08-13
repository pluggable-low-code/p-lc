import { useEditor } from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import {
  MonacoJson,
  TypographyTitleSmall5,
  useLatestFn,
  withStylePropsObserver,
} from '@p-lc/react-shared'
import { isObjectButNotArray } from '@p-lc/shared'
import type { UidlData } from '@p-lc/uidl-ext-data'
import type { FC } from 'react'
import styled from 'styled-components'
import type { DataEditor } from '../../../types'
import { I18N_KEY_DATA_TITLE } from '../i18n'

/**
 * 数据属性
 */
export interface DataProps extends StyleProps {
  /**
   * 是激活状态
   */
  isActive: boolean
}

/**
 * 数据
 */
export const Data: FC<DataProps> = withStylePropsObserver(() => {
  const {
    i18nStore: { t },
    dataStore: { data, setData },
  } = useEditor<DataEditor>()
  const handleMonacoJsonChange = useLatestFn((json: unknown) => {
    setData(isObjectButNotArray(json) ? (json as UidlData) : undefined)
  })
  return (
    <InternalDataContainer className="lc-data">
      <TypographyTitleSmall5>{t(I18N_KEY_DATA_TITLE)}</TypographyTitleSmall5>
      <MonacoJson value={data} onChange={handleMonacoJsonChange} />
    </InternalDataContainer>
  )
})

/**
 * 内部：数据容器
 */
export const InternalDataContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .lc-clib-lib-tabs {
    height: 0;
    flex: auto;

    .ant-tabs-nav {
      margin-bottom: 8px;
    }

    .ant-tabs-content {
      height: 100%;
    }

    .ant-tabs-tabpane {
      height: 100%;
    }
  }
`
