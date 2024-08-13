import { useEditor } from '@p-lc/editor'
import type { Pd } from '@p-lc/pd'
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
import type { ComponentLibraryEditor } from '../../../types'
import { I18N_KEY_COMPONENT_LIBRARY_TITLE } from '../i18n'
import { ComponentLibraryGroups } from './component-library-groups'

/**
 * 组件库属性
 */
export interface ComponentLibraryProps extends StyleProps {
  /**
   * 是激活状态
   */
  isActive: boolean
}

/**
 * 组件库
 */
export const ComponentLibrary: FC<ComponentLibraryProps> =
  withStylePropsObserver(() => {
    const {
      pdStore: { pds },
      componentLibraryStore: { activePkgName, selectComponentLibrary },
      i18nStore: { t, tText },
    } = useEditor<ComponentLibraryEditor>()
    const tabItems = useMemo(() => {
      const items: NonNullable<ComponentProps<typeof Tabs>['items']> = []
      for (const pkgName in pds) {
        const pd = pds[pkgName] as Pd
        items.push({
          key: pd.pkgName,
          label: tText(pd.name, { pkgName }),
          children: <ComponentLibraryGroups pd={pd} />,
        })
      }
      return items
    }, [pds, tText])
    const handleTabsChange = useLatestFn((activeKey: string) => {
      selectComponentLibrary(activeKey)
    })
    return (
      <InternalComponentLibraryContainer className="lc-clib">
        <TypographyTitleSmall5>
          {t(I18N_KEY_COMPONENT_LIBRARY_TITLE)}
        </TypographyTitleSmall5>
        {/* FIXME: 等 antd 修复 Tabs 滚动事件 warning：https://github.com/ant-design/ant-design/issues/44499 */}
        <Tabs
          activeKey={activePkgName || undefined}
          onChange={handleTabsChange}
          items={tabItems}
          type="card"
          className="lc-clib-lib-tabs"
        />
      </InternalComponentLibraryContainer>
    )
  })

/**
 * 内部：组件库容器
 */
export const InternalComponentLibraryContainer = styled.div`
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
