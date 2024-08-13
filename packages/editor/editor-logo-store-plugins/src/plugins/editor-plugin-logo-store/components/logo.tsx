import { useEditor } from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import { withStylePropsMemo } from '@p-lc/react-shared'
import type { FC } from 'react'
import styled from 'styled-components'
import type { LogoEditor } from '../../../types'

/**
 * 标识
 */
export const Logo: FC<StyleProps> = withStylePropsMemo(() => {
  const {
    logoStore: {
      components: { Icon, Title },
    },
  } = useEditor<LogoEditor>()
  return (
    <InternalLogoContainer className="lc-logo">
      {Icon && <Icon />}
      {Title && <Title />}
    </InternalLogoContainer>
  )
})

/**
 * 内部：标识容器
 */
export const InternalLogoContainer = styled.div`
  margin-left: 8px;
  display: flex;
  align-items: center;
`
