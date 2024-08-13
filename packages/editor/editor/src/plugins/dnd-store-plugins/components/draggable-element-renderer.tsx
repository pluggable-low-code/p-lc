import type { StyleProps } from '@p-lc/react-shared'
import {
  ComponentIcon,
  TypographyText,
  withStylePropsMemo,
} from '@p-lc/react-shared'
import type { FC } from 'react'
import { memo } from 'react'
import styled from 'styled-components'
import type { DepPluginUniteEditorPlugin } from '../../../types'
import { useEditor } from '../../editor-plugin-editor-react-context'
import type { DraggableElement } from '../editor-plugin-dnd-store-element-renderer'
import { type editorPluginDndStoreElementRenderer } from '../editor-plugin-dnd-store-element-renderer'

/**
 * 可拖拽元素渲染器属性
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DraggableElementRendererProps
  extends DraggableElement<
    DepPluginUniteEditorPlugin<typeof editorPluginDndStoreElementRenderer>
  > {}

/**
 * 可拖拽元素渲染器
 */
export const DraggableElementRenderer: FC<DraggableElementRendererProps> = memo(
  ({ element }) => {
    const {
      pdStore: { getComponentIconByEt },
    } = useEditor()
    const icon = getComponentIconByEt(element.type)
    return <DraggableIconAndName icon={icon} name={element.name} />
  },
)

/**
 * 可拖拽的图标和名称属性
 */
export interface DraggableElementIconAndNameProps extends StyleProps {
  /**
   * 图标
   */
  icon?: string | null
  /**
   * 名称
   */
  name?: string | null
}

/**
 * 可拖拽的图标和名称
 */
export const DraggableIconAndName: FC<DraggableElementIconAndNameProps> =
  withStylePropsMemo(({ icon, name }) => {
    return (
      <InternalDraggableIconAndNameContainer className="lc-draggable-icon-name">
        {icon && <ComponentIcon icon={icon} />}
        {name && <TypographyText className="lc-name">{name}</TypographyText>}
      </InternalDraggableIconAndNameContainer>
    )
  })

/**
 * 内部可拖拽的图标和名称称容器
 */
export const InternalDraggableIconAndNameContainer = styled.div`
  display: flex;
  align-items: center;
`
