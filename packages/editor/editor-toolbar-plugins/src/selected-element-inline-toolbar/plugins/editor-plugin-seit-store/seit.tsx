import { useEditor } from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import { withStylePropsObserver } from '@p-lc/react-shared'
import { VCVN_COLOR_HIGHLIGHT, VCVN_COLOR_INVERT } from '@p-lc/shared'
import type { FC } from 'react'
import { Fragment } from 'react'
import styled from 'styled-components'
import type { SeitEditor } from '../../types'

/**
 * 选中元素内联工具栏属性
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SeitProps extends StyleProps {}

/**
 * 选中元素内联工具栏
 */
export const Seit: FC<SeitProps> = withStylePropsObserver(() => {
  const {
    seitStore: { groupedItems },
  } = useEditor<SeitEditor>()
  return (
    <InternalSeitContainer className="lc-seit">
      {groupedItems.map(([groupIndex, items], index) => (
        <Fragment key={groupIndex}>
          {index ? <InternalSeitDivider /> : null}
          {items.map((item) => (
            <item.Component key={item.id} />
          ))}
        </Fragment>
      ))}
    </InternalSeitContainer>
  )
})

/**
 * 内部：选中元素内联工具栏容器
 */
export const InternalSeitContainer = styled.div`
  background: ${VCVN_COLOR_HIGHLIGHT};
  color: ${VCVN_COLOR_INVERT};
  display: flex;
  align-items: center;
  padding: 0 4px;
`

/**
 * 内部：选中元素内联工具栏分割器
 */
export const InternalSeitDivider = styled.div`
  width: 1px;
  height: 10px;
  margin: 0 8px;
  background: currentColor;
  opacity: 0.6;
`
