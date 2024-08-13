import { useEditor } from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import { withStylePropsMemo } from '@p-lc/react-shared'
import type { FC } from 'react'
import styled from 'styled-components'
import type { ClassicalLayoutEditor } from '../../../types'

/**
 * 经典布局主体
 */
export const ClassicalLayoutBody: FC<StyleProps> = withStylePropsMemo(() => {
  const {
    layoutStore: { config: { body: { disable = false, Content } = {} } = {} },
  } = useEditor<ClassicalLayoutEditor>()
  if (disable) {
    return null
  }
  return (
    <InternalClassicalLayoutBodyContainer className="lc-cl-body">
      {Content && <Content />}
    </InternalClassicalLayoutBodyContainer>
  )
})

/**
 * 内部：经典布局主体容器
 */
export const InternalClassicalLayoutBodyContainer = styled.div`
  height: 100%;
  width: 0;
  flex: auto;
`
