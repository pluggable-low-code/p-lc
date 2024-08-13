import { useDragAutoScrollRef, useEditor } from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import { useComposeRef, withStylePropsObserver } from '@p-lc/react-shared'
import { CLASS_NAME_LC_POPUP } from '@p-lc/shared'
import type { FC } from 'react'
import styled from 'styled-components'
import { useDndInlinePreview } from '../../hooks'
import type { InlinePreviewerEditor } from '../../types'

/**
 * 弹窗容器
 */
export const PopupContainer: FC<StyleProps> = withStylePropsObserver(() => {
  const {
    previewerStore: { setElPopupContainer },
  } = useEditor<InlinePreviewerEditor>()
  const popupContainerProps = useDndInlinePreview()
  const refPopupContainer = useComposeRef<HTMLDivElement>(
    popupContainerProps.ref,
    setElPopupContainer,
    useDragAutoScrollRef<HTMLDivElement>(true),
  )
  return (
    <InternalPopupContainerContainer
      className="lc-popup-container"
      {...popupContainerProps}
      ref={refPopupContainer}
    />
  )
})

/**
 * 内部：弹窗容器的容器
 */
export const InternalPopupContainerContainer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 10;

  .${CLASS_NAME_LC_POPUP} {
    pointer-events: auto;
  }
`
