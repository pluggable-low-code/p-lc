import { useEditor } from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import {
  TypographyTitleSmall5,
  useLatestFn,
  withStylePropsObserver,
} from '@p-lc/react-shared'
import { Tabs } from 'antd'
import type { ComponentProps, FC } from 'react'
import { useMemo } from 'react'
import styled from 'styled-components'
import type { I18nEditEditor } from '../../../types'
import { I18N_KEY_I18N_EDIT_TITLE } from '../i18n'
import { I18nEditKeyDialog } from './i18n-edit-key-dialog'
import { I18nEditLng } from './i18n-edit-lng'

/**
 * 国际化编辑属性
 */
export interface I18nEditProps extends StyleProps {
  /**
   * 是激活状态
   */
  isActive: boolean
}

/**
 * 国际化编辑
 */
export const I18nEdit: FC<I18nEditProps> = withStylePropsObserver(() => {
  const {
    i18nStore: { t, languageNames },
    i18nEditStore: { setEl, editingLng, setEditingLng, lngs },
  } = useEditor<I18nEditEditor>()
  const tabItems = useMemo(() => {
    const items: NonNullable<ComponentProps<typeof Tabs>['items']> = []
    for (const lng of lngs) {
      items.push({
        key: lng,
        label: languageNames[lng],
        children: <I18nEditLng lng={lng} />,
      })
    }
    return items
  }, [languageNames, lngs])
  const handleTabsChange = useLatestFn((activeKey: string) => {
    setEditingLng(activeKey)
  })
  // console.log('I18nEdit')
  return (
    <InternalI18nEditContainer className="lc-i18n-edit" ref={setEl}>
      <TypographyTitleSmall5>
        {t(I18N_KEY_I18N_EDIT_TITLE)}
      </TypographyTitleSmall5>
      <Tabs
        activeKey={editingLng}
        onChange={handleTabsChange}
        items={tabItems}
        type="card"
        className="lc-i18n-edit-tabs"
      />
      <I18nEditKeyDialog />
    </InternalI18nEditContainer>
  )
})

/**
 * 内部：元素属性容器
 */
export const InternalI18nEditContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .lc-i18n-edit-tabs {
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
