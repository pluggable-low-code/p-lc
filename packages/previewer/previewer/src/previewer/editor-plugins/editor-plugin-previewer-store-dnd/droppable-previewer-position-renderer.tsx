import {
  POSITION_TYPE_BOTTOM,
  POSITION_TYPE_RIGHT,
  POSITION_TYPE_TOP,
  VCVN_BORDER_RADIUS,
  VCVN_COLOR_HIGHLIGHT,
} from '@p-lc/shared'
import type { FC } from 'react'
import { memo } from 'react'
import styled from 'styled-components'
import type { DroppablePreviewerPosition } from '.'

/**
 * 可放置预览器位置渲染器
 */
export const DroppablePreviewerPositionRenderer: FC<DroppablePreviewerPosition> =
  memo(({ order }) => {
    switch (order) {
      case 'last': {
        return <InternalDppInner />
      }
      default: {
        return <InternalDppOuter $order={order} />
      }
    }
  })

/**
 * 内部：可放置预览器位置，内部
 */
export const InternalDppInner = styled.div`
  position: absolute;
  inset: 0;
  background-color: ${VCVN_COLOR_HIGHLIGHT};
  border-radius: ${VCVN_BORDER_RADIUS};
  opacity: 0.1;
`

/**
 * 内部：可放置预览器位置，外部
 */
export const InternalDppOuter = styled.div<{
  $order: DroppablePreviewerPosition['order']
}>`
  position: absolute;
  background-color: ${VCVN_COLOR_HIGHLIGHT};
  border-radius: 50%;
  opacity: 0.6;
  ${
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    (props) =>
      props.$order === POSITION_TYPE_TOP
        ? {
            top: -2,
            left: 0,
            width: '100%',
            height: 4,
          }
        : props.$order === POSITION_TYPE_RIGHT
          ? { top: 0, right: -2, width: 4, height: '100%' }
          : props.$order === POSITION_TYPE_BOTTOM
            ? { bottom: -2, left: 0, width: '100%', height: 4 }
            : { top: 0, left: -2, width: 4, height: '100%' }
  }
`
