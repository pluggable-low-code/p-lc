import type { Editor } from '@p-lc/editor'
import { useEditor } from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import { withStylePropsObserver } from '@p-lc/react-shared'
import {
  POSITION_TYPE_BOTTOM,
  VCVN_COLOR_HIGHLIGHT,
  addCssClass,
  createRectangleByHtmlElement,
  getRectangleHeight,
  getRectangleWidth,
  removeCssClass,
} from '@p-lc/shared'
import type { FC } from 'react'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { type editorPluginPreviewerStoreMaskSelect } from '.'

/**
 * 位置类型：内部上
 */
export const POSITION_TYPE_INNER_TOP = 'inner-top'

/**
 * 位置类型：内部下
 */
export const POSITION_TYPE_INNER_BOTTOM = 'inner-bottom'

// TODO: top-left、top-right、bottom-left、bottom-right

/**
 * 预览器遮罩选中的元素边界
 */
export const PreviewerMaskSeb: FC<StyleProps> = withStylePropsObserver(() => {
  const {
    previewerStore: { selectedElementBounding: bounding, sebWidth },
    seitStore: { Component: SeitComponent } = {},
  } = useEditor<Editor<typeof editorPluginPreviewerStoreMaskSelect>>()
  const refElTools = useRef<HTMLDivElement>(null)
  useEffect(() => {
    void bounding
    const elTools = refElTools.current
    if (!elTools) return
    const elSeb = elTools.parentElement
    if (!elSeb) return
    const elContainer = elSeb.parentElement
    if (!elContainer) return
    const rectContainer = createRectangleByHtmlElement(elContainer)
    const rectSeb = createRectangleByHtmlElement(elSeb)
    const rectTools = createRectangleByHtmlElement(elTools)
    // 默认 top
    removeCssClass(elTools, POSITION_TYPE_BOTTOM)
    removeCssClass(elTools, POSITION_TYPE_INNER_TOP)
    removeCssClass(elTools, POSITION_TYPE_INNER_BOTTOM)
    const toolsHeight = getRectangleHeight(rectTools)
    const rectSebSY = rectSeb.s.y
    const rectSebEY = rectSeb.e.y
    const rectContainerSY = rectContainer.s.y
    const rectContainerEY = rectContainer.e.y
    if (rectSebSY - toolsHeight < rectContainerSY) {
      // 放弃 top
      let cls
      if (rectSebEY + toolsHeight > rectContainerEY) {
        // 放弃 bottom
        cls =
          rectSebSY - rectContainerSY > rectContainerEY - rectSebEY
            ? POSITION_TYPE_INNER_TOP
            : POSITION_TYPE_INNER_BOTTOM
      } else {
        cls = POSITION_TYPE_BOTTOM
      }
      addCssClass(elTools, cls)
    }
  }, [bounding])
  return (
    <InternalPreviewerMaskSebContainer
      $sebWidth={sebWidth}
      className="lc-seb-container"
    >
      {bounding && (
        <InternalPreviewerMaskSeb
          $sebWidth={sebWidth}
          className="lc-seb"
          style={{
            top: bounding.s.y,
            left: bounding.s.x,
            width: getRectangleWidth(bounding),
            height: getRectangleHeight(bounding),
          }}
        >
          <InternalPreviewerMaskSeTools
            $sebWidth={sebWidth}
            className="lc-se-tools"
            ref={refElTools}
          >
            {SeitComponent && <SeitComponent />}
          </InternalPreviewerMaskSeTools>
        </InternalPreviewerMaskSeb>
      )}
    </InternalPreviewerMaskSebContainer>
  )
})

/**
 * 内部：预览器遮罩选中的元素边界容器
 */
export const InternalPreviewerMaskSebContainer = styled.div<{
  $sebWidth: number
}>`
  position: absolute;
  inset: ${
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    (props) => -props.$sebWidth
  }px;
  overflow: hidden;
  z-index: 20;
`

/**
 * 内部：预览器遮罩选中的元素边界容器
 */
export const InternalPreviewerMaskSeb = styled.div<{
  $sebWidth: number
}>`
  position: absolute;
  border: ${
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      (props) => props.$sebWidth
    }px
    solid ${VCVN_COLOR_HIGHLIGHT};
  transform: translate3d(
    ${
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      (props) => props.$sebWidth
    }px,
    ${
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      (props) => props.$sebWidth
    }px,
    0
  );
`

/**
 * 内部：预览器遮罩选中元素工具
 */
export const InternalPreviewerMaskSeTools = styled.div<{
  $sebWidth: number
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: max-content;
  transform: translate3d(
    ${
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      (props) => -props.$sebWidth
    }px,
    -100%,
    0
  );
  pointer-events: auto;

  &.inner-top {
    transform: translate3d(
      ${
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        (props) => -props.$sebWidth
      }px,
      ${
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        (props) => -props.$sebWidth
      }px,
      0
    );
  }

  &.bottom {
    top: initial;
    bottom: 0;
    transform: translate3d(
      ${
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        (props) => -props.$sebWidth
      }px,
      100%,
      0
    );
  }

  &.inner-bottom {
    top: initial;
    bottom: 0;
    transform: translate3d(
      ${
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        (props) => -props.$sebWidth
      }px,
      ${
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        (props) => props.$sebWidth
      }px,
      0
    );
  }
`

/**
 * 内部：预览器遮罩选中元素工具分割器
 */
export const InternalPreviewerMaskSeToolsDivider = styled.div`
  width: 1px;
  height: 10px;
  margin: 0 8px;
  background: currentColor;
  opacity: 0.6;
`
