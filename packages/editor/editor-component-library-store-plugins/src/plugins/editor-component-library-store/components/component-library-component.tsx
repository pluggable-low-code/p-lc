import {
  DRAGGABLE_ENTITY_TYPE_COMPONENT,
  useDraggable,
  useEditor,
} from '@p-lc/editor'
import type { Cd } from '@p-lc/pd'
import type { StyleProps } from '@p-lc/react-shared'
import {
  ComponentIcon,
  TypographyTextTip,
  useLatestFn,
  withStylePropsMemo,
} from '@p-lc/react-shared'
import {
  VCVN_BORDER_RADIUS,
  VCVN_COLOR_HIGHLIGHT,
  VCVN_COLOR_LIGHT_ICON,
} from '@p-lc/shared'
import type { FC } from 'react'
import styled from 'styled-components'
import type { ComponentLibraryEditor } from '../../../types'

/**
 * 组件库组件属性
 */
export interface ComponentLibraryComponentProps extends StyleProps {
  /**
   * 包名
   */
  pkgName: string
  /**
   * 组件
   */
  component: Cd
}

/**
 * 组件库组件
 */
export const ComponentLibraryComponent: FC<ComponentLibraryComponentProps> =
  withStylePropsMemo(({ pkgName, component }) => {
    const {
      pdStore: { getComponentIcon, getComponentName },
      componentLibraryStore: { createAndAndElement },
    } = useEditor<ComponentLibraryEditor>()
    const componentType = component.type
    const handleClick = useLatestFn(() => {
      createAndAndElement(pkgName, componentType)
    })
    const icon = getComponentIcon(pkgName, componentType)
    const name = getComponentName(pkgName, componentType)
    const draggableProps = useDraggable({
      type: DRAGGABLE_ENTITY_TYPE_COMPONENT,
      pkgName,
      componentType,
    })
    return (
      <InternalComponentLibraryComponentContainer
        className="lc-clib-component"
        onClick={handleClick}
        {...draggableProps}
      >
        {icon && <ComponentIcon icon={icon} />}
        <TypographyTextTip className="lc-name">{name}</TypographyTextTip>
      </InternalComponentLibraryComponentContainer>
    )
  })

/**
 * 内部：组件库组件容器
 */
export const InternalComponentLibraryComponentContainer = styled.div`
  width: calc(50% - 6px);
  border: 1px solid ${VCVN_COLOR_LIGHT_ICON};
  border-radius: ${VCVN_BORDER_RADIUS};
  padding: 4px 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  margin-bottom: 8px;

  &:hover {
    border-color: ${VCVN_COLOR_HIGHLIGHT};
  }
`
