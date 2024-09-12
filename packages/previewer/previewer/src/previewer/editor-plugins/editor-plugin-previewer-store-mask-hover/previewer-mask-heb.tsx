import type { Editor } from '@p-lc/editor'
import { useEditor } from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import { withStylePropsObserver } from '@p-lc/react-shared'
import {
  VCVN_COLOR_HIGHLIGHT,
  getRectangleHeight,
  getRectangleWidth,
} from '@p-lc/shared'
import type { FC } from 'react'
import styled from 'styled-components'
import { type editorPluginPreviewerStoreMaskHover } from '.'

/**
 * 预览器遮罩悬浮的元素边界
 */
export const PreviewerMaskHeb: FC<StyleProps> = withStylePropsObserver(() => {
  const {
    previewerStore: { hoveredElementBounding: bounding, hebWidth },
  } = useEditor<Editor<typeof editorPluginPreviewerStoreMaskHover>>()

  return (
    <InternalPreviewerMaskHebContainer
      $hebWidth={hebWidth}
      className="lc-heb-container"
    >
      {bounding && (
        <div
          className="lc-heb"
          style={{
            top: bounding.s.y,
            left: bounding.s.x,
            width: getRectangleWidth(bounding),
            height: getRectangleHeight(bounding),
          }}
        />
      )}
    </InternalPreviewerMaskHebContainer>
  )
})

/**
 * 内部：预览器遮罩悬浮的元素边界容器
 */
export const InternalPreviewerMaskHebContainer = styled.div<{
  $hebWidth: number
}>`
  position: absolute;
  inset: ${
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    (props) => -props.$hebWidth
  }px;
  overflow: hidden;
  z-index: 20;
  pointer-events: none;

  > .lc-heb {
    position: absolute;
    border: ${
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        (props) => props.$hebWidth
      }px
      dashed ${VCVN_COLOR_HIGHLIGHT};
    transform: translate3d(
      ${
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        (props) => props.$hebWidth
      }px,
      ${
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        (props) => props.$hebWidth
      }px,
      0
    );
  }
`
