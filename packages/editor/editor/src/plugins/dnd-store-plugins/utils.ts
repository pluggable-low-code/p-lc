import type { SoftAs } from '@p-lc/shared'
import type { AnyEditorPlugin, EditorDefaultPlugin } from '../../types'
import type { DraggableEntity } from './editor-plugin-dnd-store'
import type { DraggableComponent } from './editor-plugin-dnd-store-component-renderer'
import { DRAGGABLE_ENTITY_TYPE_COMPONENT } from './editor-plugin-dnd-store-component-renderer'
import type { DraggableElement } from './editor-plugin-dnd-store-element-renderer'
import { DRAGGABLE_ENTITY_TYPE_ELEMENT } from './editor-plugin-dnd-store-element-renderer'

/**
 * 是可拖拽元素或组件
 * @param entity 实体
 */
export function isDraggableElementOrComponent<
  Plugin extends AnyEditorPlugin = EditorDefaultPlugin,
>(
  entity: DraggableEntity<Plugin>,
): entity is SoftAs<
  DraggableElement<Plugin> | DraggableComponent,
  DraggableEntity<Plugin>
> {
  return [
    DRAGGABLE_ENTITY_TYPE_ELEMENT,
    DRAGGABLE_ENTITY_TYPE_COMPONENT,
  ].includes(entity.type)
}
