import { aOpenProps } from '@p-lc/shared'
import { memo, type FC } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import styled from 'styled-components'

/**
 * 打开（新标签页）链接
 */
export const OpenLink: FC<LinkProps> = memo((props) => {
  return <Link {...aOpenProps} {...props} />
})

/**
 * 打开（新标签页）链接按钮
 */
export const OpenLinkBtn = styled(OpenLink)`
  color: inherit;
  text-decoration: none;

  &:hover {
    color: #4096ff;
  }
`
