import type { Cd } from '@p-lc/pd'
import type { StyleProps } from '@p-lc/react-shared'
import { withStylePropsMemo } from '@p-lc/react-shared'
import type { FC } from 'react'
import styled from 'styled-components'
import { ComponentLibraryComponent } from './component-library-component'

/**
 * 组件库组属性
 */
export interface ComponentLibraryGroupProps extends StyleProps {
  /**
   * 包名
   */
  pkgName: string
  /**
   * 组件
   */
  components: Cd[]
}

/**
 * 组件库组
 */
export const ComponentLibraryGroup: FC<ComponentLibraryGroupProps> =
  withStylePropsMemo(({ pkgName, components }) => {
    return (
      <InternalComponentLibraryGroupContainer className="lc-clib-group">
        {components.map((component) => (
          <ComponentLibraryComponent
            key={component.type}
            pkgName={pkgName}
            component={component}
          />
        ))}
      </InternalComponentLibraryGroupContainer>
    )
  })

/**
 * 内部：组件库组容器
 */
export const InternalComponentLibraryGroupContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`
