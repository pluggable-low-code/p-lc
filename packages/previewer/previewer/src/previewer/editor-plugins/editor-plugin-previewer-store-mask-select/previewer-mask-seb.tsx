import type { Editor } from '@p-lc/editor'
import { useEditor } from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import { withStylePropsObserver } from '@p-lc/react-shared'
import {
  VCVN_COLOR_HIGHLIGHT,
  addCssClass,
  createRectangleByHtmlElement,
  getRectangleHeight,
  getRectangleWidth,
  removeCssClass,
  simpleAlignRectangle,
} from '@p-lc/shared'
import type { FC } from 'react'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { type editorPluginPreviewerStoreMaskSelect } from '.'

/**
 * 简单对齐类型，类集合
 */
const satClsSet = new Set<string>()

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
    for (const cls of satClsSet) {
      removeCssClass(elTools, cls)
    }
    const sat = simpleAlignRectangle(rectContainer, rectSeb, rectTools)
    const satCls = sat.join('-')
    satClsSet.add(satCls)
    addCssClass(elTools, satCls)
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
  z-index: 30;
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
  width: max-content;
  pointer-events: auto;

  &.bl-tl {
    top: 0;
    left: 0;
    transform: translate3d(
      ${
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        (props) => -props.$sebWidth
      }px,
      -100%,
      0
    );
  }

  &.br-tr {
    top: 0;
    right: 0;
    transform: translate3d(
      ${
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        (props) => props.$sebWidth
      }px,
      -100%,
      0
    );
  }

  &.tl-tl {
    top: 0;
    left: 0;
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

  &.tr-tr {
    top: 0;
    right: 0;
    transform: translate3d(
      ${
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        (props) => props.$sebWidth
      }px,
      ${
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        (props) => -props.$sebWidth
      }px,
      0
    );
  }

  &.bl-bl {
    bottom: 0;
    left: 0;
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

  &.br-br {
    right: 0;
    bottom: 0;
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
  }

  &.tl-bl {
    bottom: 0;
    left: 0;
    transform: translate3d(
      ${
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        (props) => -props.$sebWidth
      }px,
      100%,
      0
    );
  }

  &.tr-br {
    right: 0;
    bottom: 0;
    transform: translate3d(
      ${
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        (props) => props.$sebWidth
      }px,
      100%,
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
