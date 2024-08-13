import {
  POSITION_TYPE_BEFORE,
  VCVN_BORDER_RADIUS,
  VCVN_COLOR_HIGHLIGHT,
} from '@p-lc/shared'
import type { FC } from 'react'
import { memo } from 'react'
import styled from 'styled-components'
import type {
  DroppableElementTreePosition,
  DroppableElementTreePositionOuter,
} from '.'

/**
 * 可放置元素树位置渲染器
 */
export const DroppableElementTreePositionRenderer: FC<DroppableElementTreePosition> =
  memo(({ order }) => {
    switch (order) {
      case 'last': {
        return <InternalDetpInner />
      }
      default: {
        return <InternalDetpOuter $order={order} />
      }
    }
  })

/**
 * 内部：可放置元素树位置，内部
 */
export const InternalDetpInner = styled.div`
  position: absolute;
  inset: 0;
  background-color: ${VCVN_COLOR_HIGHLIGHT};
  border-radius: ${VCVN_BORDER_RADIUS};
  opacity: 0.1;
`

/**
 * 内部：可放置元素树位置，外部
 */
export const InternalDetpOuter = styled.div<{
  $order: DroppableElementTreePositionOuter['order']
}>`
  position: absolute;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: ${VCVN_COLOR_HIGHLIGHT};
  border-radius: 50%;
  opacity: 0.6;
  ${
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    (props) =>
      props.$order === POSITION_TYPE_BEFORE ? { top: -2 } : { bottom: -2 }
  }
`
