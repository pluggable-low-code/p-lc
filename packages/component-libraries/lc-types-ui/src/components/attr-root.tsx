import { withStylePropsMemo } from '@p-lc/react-shared'
import type { FC, HTMLAttributes } from 'react'
import styled from 'styled-components'

/**
 * 属性（Attribute）根组件属性
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AttrRootProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * 属性根组件
 */
export const AttrRoot: FC<AttrRootProps> = withStylePropsMemo((props) => {
  return <InternalAttrRootContainer {...props} className="lc-attr-root" />
})

/**
 * 内部：属性根组件容器，创建 BFC
 */
const InternalAttrRootContainer = styled.div`
  width: 100%;
  min-height: 100%;
  padding: 4px;
  display: flex;
  flex-direction: column;
`
