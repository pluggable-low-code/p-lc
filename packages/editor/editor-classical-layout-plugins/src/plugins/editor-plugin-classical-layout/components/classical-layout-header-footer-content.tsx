import { withStylePropsMemo } from '@p-lc/react-shared'
import {
  POSITION_TYPE_CENTER,
  POSITION_TYPE_LEFT,
  POSITION_TYPE_RIGHT,
} from '@p-lc/shared'
import { groupBy, sortBy, values } from 'lodash-uni'
import type { FC } from 'react'
import { useMemo } from 'react'
import styled from 'styled-components'
import type {
  ClassicalLayoutHeaderFooterContentProps,
  ClassicalLayoutHeaderFooterItem,
  ClassicalLayoutHeaderFooterItemType,
} from '../types'

/**
 * 所有条目类型
 */
const types: ClassicalLayoutHeaderFooterItemType[] = [
  POSITION_TYPE_LEFT,
  POSITION_TYPE_CENTER,
  POSITION_TYPE_RIGHT,
]

/**
 * 经典布局头部、尾部内容
 */
export const ClassicalLayoutHeaderFooterContent: FC<ClassicalLayoutHeaderFooterContentProps> =
  withStylePropsMemo(({ items }) => {
    const groupedItems = useMemo(() => {
      const ret = groupBy(values(items), 'type') as Record<
        ClassicalLayoutHeaderFooterItemType,
        ClassicalLayoutHeaderFooterItem[]
      >
      for (const type of types) {
        ret[type] = sortBy(ret[type] || [], ({ index = Infinity }) => index)
      }
      return ret
    }, [items])
    return (
      <InternalClassicalLayoutHeaderFooterContentContainer className="lc-cl-hf-content">
        {types.map((type) => (
          <div className={`lc-${type}`} key={type}>
            {groupedItems[type].map((item) => (
              <item.Component key={item.id} />
            ))}
          </div>
        ))}
      </InternalClassicalLayoutHeaderFooterContentContainer>
    )
  })

/**
 * 内部：经典布局头部、尾部内容容器
 */
export const InternalClassicalLayoutHeaderFooterContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  .lc-left,
  .lc-center,
  .lc-right {
    display: flex;
    align-items: center;
  }

  .lc-left,
  .lc-right {
    flex: 1 0 auto;
  }

  .lc-center {
    flex: none;
  }

  .lc-right {
    flex-direction: row-reverse;
  }
`
