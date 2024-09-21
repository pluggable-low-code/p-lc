import { arrayMove } from '@dnd-kit/sortable'
import { useEditor } from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import {
  SortableTabs,
  TypographyTextTip,
  withStylePropsObserver,
} from '@p-lc/react-shared'
import { type Tabs } from 'antd'
import { isString } from 'lodash-uni'
import type { ComponentProps, FC } from 'react'
import { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import type { LcTypesEditor } from '../../../types'

/**
 * 组件声明标签页
 */
export const CdTabs: FC<StyleProps> = withStylePropsObserver(() => {
  const {
    lcTypesStore: {
      pd: { components },
      selectedComponentType,
      editPd,
      createCd,
      deleteCd,
      selectCd,
    },
    i18nEditStore: { tEditingText },
  } = useEditor<LcTypesEditor>()
  const items = useMemo(() => {
    return components.map(({ type, name }) => ({
      key: type,
      label: <TypographyTextTip>{tEditingText(name)}</TypographyTextTip>,
      closable: components.length > 1,
    })) satisfies NonNullable<ComponentProps<typeof Tabs>['items']>
  }, [components, tEditingText])
  const handleSortDragEnd = useCallback(
    (fromIndex: number, toIndex: number): void => {
      editPd((pd) => {
        const { components: comps } = pd
        pd.components = arrayMove(comps, fromIndex, toIndex)
      })
    },
    [editPd],
  )
  const handleEdit = useCallback(
    (
      ev: React.MouseEvent | React.KeyboardEvent | string,
      action: 'add' | 'remove',
    ) => {
      if (action === 'add') {
        createCd()
      } else if (isString(ev)) {
        deleteCd(ev)
      }
    },
    [createCd, deleteCd],
  )
  const handleChange = useCallback(
    (key: string) => {
      selectCd(key)
    },
    [selectCd],
  )
  return (
    <InternalCdTabsSortableTabs
      type="editable-card"
      tabPosition="left"
      items={items}
      onSortDragEnd={handleSortDragEnd}
      onEdit={handleEdit}
      activeKey={selectedComponentType}
      onChange={handleChange}
      className="lc-cd-tabs"
    />
  )
})

/**
 * 内部：组件声明标签页标签页
 */
export const InternalCdTabsSortableTabs = styled(SortableTabs)`
  .ant-tabs-nav {
    width: 100%;
  }

  .ant-tabs-tab-btn {
    width: calc(100% - 26px);
    text-align: left;
  }

  .ant-tabs-content-holder {
    display: none;
  }
`
