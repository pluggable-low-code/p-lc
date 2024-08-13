import type { ComponentProps, FC } from 'react'
import styled from 'styled-components'
import { withStylePropsMemo } from './style'

/**
 * 组件图标属性
 */
export interface ComponentIconProps
  extends ComponentProps<typeof InternalComponentIconContainer> {
  /**
   * 图标（资源）
   */
  icon: string
}

/**
 * 组件图标
 */
export const ComponentIcon: FC<ComponentIconProps> = withStylePropsMemo(
  ({ icon }) => {
    return (
      <InternalComponentIconContainer className="lc-icon">
        <img src={icon} />
      </InternalComponentIconContainer>
    )
  },
)

/**
 * 内部：组件图标容器
 */
export const InternalComponentIconContainer = styled.div`
  line-height: 0;
  margin-right: 4px;

  img {
    width: 16px;
    height: 16px;
    pointer-events: none;
  }
`
