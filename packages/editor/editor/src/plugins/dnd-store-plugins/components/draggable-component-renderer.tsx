import type { FC } from 'react'
import { memo } from 'react'
import { useEditor } from '../../editor-plugin-editor-react-context'
import type { DraggableComponent } from '../editor-plugin-dnd-store-component-renderer'
import { DraggableIconAndName } from './draggable-element-renderer'

/**
 * 可拖拽组件渲染器属性
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DraggableComponentRendererProps extends DraggableComponent {}

/**
 * 可拖拽组件渲染器
 */
export const DraggableComponentRenderer: FC<DraggableComponentRendererProps> =
  memo(({ pkgName, componentType }) => {
    const {
      pdStore: { getComponentIcon, getComponentName },
    } = useEditor()
    const icon = getComponentIcon(pkgName, componentType)
    const name = getComponentName(pkgName, componentType)
    return <DraggableIconAndName icon={icon} name={name} />
  })
