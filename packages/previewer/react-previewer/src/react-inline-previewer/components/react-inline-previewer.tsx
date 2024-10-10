import { useDragAutoScrollRef, useEditor } from '@p-lc/editor'
import { PreviewerMask, useDndInlinePreview } from '@p-lc/previewer'
import type { ReactRuntime } from '@p-lc/react-runtime'
import type { StyleProps } from '@p-lc/react-shared'
import { useComposeRef, withStylePropsObserver } from '@p-lc/react-shared'
import {
  VCVN_COLOR_BORDER,
  stopPropagationAndPreventDefault,
} from '@p-lc/shared'
import type { FC } from 'react'
import { useCallback } from 'react'
import styled from 'styled-components'
import type { ReactInlinePreviewerEditor } from '../types'

/**
 *  React 内联预览器
 */
export const ReactInlinePreviewer: FC<StyleProps> = withStylePropsObserver(
  () => {
    const { previewerStore } = useEditor<ReactInlinePreviewerEditor>()
    const { inlineRuntime, sebWidth, hasVisiblePopup } = previewerStore
    const runtime = inlineRuntime as unknown as ReactRuntime
    if (process.env.NODE_ENV === 'development' && !runtime.render) {
      console.error(
        `Please return a react runtime in the initInlineRuntime function.`,
        runtime,
      )
    }
    const handleScrollCapture = useCallback(() => {
      previewerStore.syncSeb()
      previewerStore.syncHeb()
    }, [previewerStore])
    const runtimeProps = useDndInlinePreview()
    const refRuntime = useComposeRef<HTMLDivElement>(
      runtimeProps.ref,
      useDragAutoScrollRef<HTMLDivElement>(true, hasVisiblePopup),
    )
    return (
      <InternalReactInlinePreviewerContainer
        $sebWidth={sebWidth}
        onScrollCapture={handleScrollCapture}
        onDragStartCapture={stopPropagationAndPreventDefault}
        className="lc-previewer"
      >
        <div className="lc-runtime" {...runtimeProps} ref={refRuntime}>
          {runtime.render()}
        </div>
        <PreviewerMask />
      </InternalReactInlinePreviewerContainer>
    )
  },
)

/**
 * 内部：React 内联预览器容器
 */
export const InternalReactInlinePreviewerContainer = styled.div<{
  $sebWidth: number
}>`
  position: relative;
  height: 100%;
  border: ${
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      (props) => props.$sebWidth
    }px
    solid ${VCVN_COLOR_BORDER};

  > .lc-runtime {
    position: relative;
    height: 100%;
    overflow: auto;
  }
`
