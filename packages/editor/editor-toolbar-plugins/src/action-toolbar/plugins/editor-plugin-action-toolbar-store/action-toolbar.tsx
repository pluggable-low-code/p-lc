import { useEditor } from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import { withStylePropsObserver } from '@p-lc/react-shared'
import { sortBy } from 'lodash-uni'
import type { FC } from 'react'
import { useMemo } from 'react'
import styled from 'styled-components'
import type { ActionToolbarEditor } from '../../types'

/**
 * 操作工具栏属性
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ActionToolbarProps extends StyleProps {}

/**
 * 操作工具栏
 */
export const ActionToolbar: FC<ActionToolbarProps> = withStylePropsObserver(
  () => {
    const {
      actionToolbarStore: { items },
    } = useEditor<ActionToolbarEditor>()
    const finalItems = useMemo(
      () => sortBy(items, ({ index = Infinity }) => index),
      [items],
    )
    return (
      <InternalActionToolbarContainer className="lc-action-toolbar">
        {finalItems.map((item) => (
          <item.Component key={item.id} />
        ))}
      </InternalActionToolbarContainer>
    )
  },
)

/**
 * 内部：操作工具栏容器
 */
export const InternalActionToolbarContainer = styled.div`
  display: flex;
  align-items: center;
`
