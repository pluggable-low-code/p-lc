import { useEditor } from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import { withStylePropsMemo } from '@p-lc/react-shared'
import { isString } from 'antd/es/button'
import type { FC } from 'react'
import { useCallback } from 'react'
import styled from 'styled-components'
import type { LogoEditor } from '../../../types'

/**
 * 标识图标
 */
export const LogoIcon: FC<StyleProps> = withStylePropsMemo(() => {
  const {
    logoStore: { icon, iconLink },
  } = useEditor<LogoEditor>()
  const handleClick = useCallback(() => {
    if (iconLink) open(iconLink)
  }, [iconLink])
  if (!icon) return null
  return (
    <InternalLogoIconContainer
      $hasLink={!!iconLink}
      onClick={handleClick}
      className="lc-logo-icon"
    >
      {isString(icon) ? <img src={icon} /> : icon}
    </InternalLogoIconContainer>
  )
})

/**
 * 内部：标识图标容器
 */
export const InternalLogoIconContainer = styled.div<{
  $hasLink: boolean
}>`
  width: 32px;
  height: 32px;
  margin-right: 8px;
  ${
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    (props) =>
      props.$hasLink && {
        cursor: 'pointer',
      }
  }

  img, svg {
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
`
