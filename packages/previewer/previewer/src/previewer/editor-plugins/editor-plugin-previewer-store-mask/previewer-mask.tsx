import type { Editor } from '@p-lc/editor'
import { useEditor } from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import { withStylePropsMemo } from '@p-lc/react-shared'
import { values } from 'lodash-uni'
import type { FC } from 'react'
import { useMemo } from 'react'
import styled from 'styled-components'
import { type editorPluginPreviewerStoreMask } from '.'

/**
 * 预览器遮罩
 */
export const PreviewerMask: FC<StyleProps> = withStylePropsMemo(() => {
  const {
    previewerStore: { setMaskEl, maskItems },
  } = useEditor<Editor<typeof editorPluginPreviewerStoreMask>>()
  const items = useMemo(() => values(maskItems), [maskItems])
  return (
    <InternalPreviewerMaskContainer
      ref={setMaskEl}
      className="lc-previewer-mask"
    >
      {items.map((item) => (
        <item.Component key={item.id} />
      ))}
    </InternalPreviewerMaskContainer>
  )
})

/**
 * 内部：预览器遮罩容器
 */
export const InternalPreviewerMaskContainer = styled.div`
  position: absolute;
  inset: 0px;
  pointer-events: none;
`
