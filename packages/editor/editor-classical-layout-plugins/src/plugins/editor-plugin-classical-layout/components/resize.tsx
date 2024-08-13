import { normalizeStyleValue } from '@p-lc/shared'
import { isNil, uniqueId } from 'lodash-uni'
import type { FC } from 'react'
import { memo, useCallback, useMemo, useState } from 'react'
import { DragSizing } from 'react-drag-sizing'
import type { DragSizingProps } from 'react-drag-sizing/dist/types'
import styled, { css } from 'styled-components'

/**
 * （可以通过拖拽）调整大小（容器）属性
 */
export interface ResizeProps extends DragSizingProps {
  /**
   * 宽度，非拖拽期间受控
   */
  width?: number | string
  /**
   * 最小宽度，默认：100
   */
  minWidth?: number | string
  /**
   * 最大宽度，默认：40%
   */
  maxWidth?: number | string
  /**
   * 可以调整大小，默认：true
   */
  resizable?: boolean
  /**
   * 宽度变化结束
   * @param width （新）宽度
   */
  onWidthChangeEnd?: (width: number) => void
}

/**
 * （可以通过拖拽）调整大小（容器），div
 */
export const Resize: FC<ResizeProps> = memo(
  ({
    resizable = true,
    width,
    minWidth,
    maxWidth,
    onWidthChangeEnd,
    children,
    ...restProps
  }) => {
    const domId = useMemo(() => uniqueId('lc-resize-'), [])
    const [isResizing, setIsResizing] = useState(false)
    const handleResizeStart = useCallback(() => {
      setIsResizing(true)
    }, [])
    const handleResizeEnd = useCallback(() => {
      setIsResizing(false)
      const el = document.getElementById(domId)
      const rect = el?.getBoundingClientRect()
      if (!rect) {
        return
      }
      onWidthChangeEnd?.(rect.width)
    }, [domId, onWidthChangeEnd])
    return (
      <InternalResizeContainer
        id={domId}
        handlerClassName="lc-handler"
        $resizable={resizable}
        $isResizing={isResizing}
        $width={width}
        $minWidth={minWidth}
        $maxWidth={maxWidth}
        onStart={handleResizeStart}
        onEnd={handleResizeEnd}
        {...restProps}
      >
        {children}
      </InternalResizeContainer>
    )
  },
)

/**
 * 内部：调整大小容器
 */
export const InternalResizeContainer = styled(DragSizing)<{
  $resizable: boolean
  $isResizing: boolean
  $width?: number | string
  $minWidth?: number | string
  $maxWidth?: number | string
}>`
  ${
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    (props) => ({
      width: props.$width,
      minWidth: props.$minWidth,
      maxWidth: props.$maxWidth,
    })
  }
  ${
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    (props) =>
      props.$isResizing || isNil(props.$width)
        ? null
        : css`
            width: ${normalizeStyleValue(props.$width)} !important;
          `
  }

  .lc-handler {
    ${
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      (props) => ({
        display: props.$resizable ? undefined : 'none',
      })
    }
  }
`
