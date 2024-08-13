import { useEditor } from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import { withStylePropsObserver } from '@p-lc/react-shared'
import { VCVN_COLOR_BORDER } from '@p-lc/shared'
import type { FC } from 'react'
import styled from 'styled-components'
import type { ClassicalLayoutEditor } from '../../../types'
import { Resize } from './resize'

/**
 * 经典布局右部
 */
export const ClassicalLayoutRight: FC<StyleProps> = withStylePropsObserver(
  () => {
    const {
      layoutStore: {
        config: {
          right: {
            disable = false,
            minWidth = 200,
            maxWidth = '50%',
            resizable = true,
            Content,
          } = {},
        } = {},
        state: { rightWidth },
        setRightWidth,
      },
    } = useEditor<ClassicalLayoutEditor>()
    if (disable) {
      return null
    }
    return (
      <InternalClassicalLayoutRightContainer
        border="left"
        width={rightWidth}
        minWidth={minWidth}
        maxWidth={maxWidth}
        resizable={resizable}
        onWidthChangeEnd={setRightWidth}
        className="lc-cl-right"
      >
        {Content && <Content />}
      </InternalClassicalLayoutRightContainer>
    )
  },
)

/**
 * 内部：经典布局右部容器
 */
export const InternalClassicalLayoutRightContainer = styled(Resize)`
  height: 100%;
  border-left: 1px solid ${VCVN_COLOR_BORDER};
  flex: none;
`
