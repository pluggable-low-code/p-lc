import {
  DRAGGABLE_ENTITY_TYPE_ELEMENT,
  isDraggableElementOrComponent,
  useDroppable,
  useEditor,
} from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import { TypographyText, withStylePropsObserver } from '@p-lc/react-shared'
import { createRectangleByHtmlElement } from '@p-lc/shared'
import type { EditorUidl } from '@p-lc/uidl'
import type { FC } from 'react'
import styled from 'styled-components'
import type { RichSlot } from '..'
import { InternalFoldButton } from '..'
import type { ElementTreeEditor, ElementTreeEditorPlugin } from '../../../types'
import type { DroppableElementTreePosition } from '../../editor-plugin-element-tree-store-dnd'
import { DROPPABLE_POSITION_TYPE_ELEMENT_TREE } from '../../editor-plugin-element-tree-store-dnd'

/**
 * 元素树插槽属性
 */
export interface ElementTreeSlotProps<U extends EditorUidl = EditorUidl>
  extends StyleProps {
  /**
   * 充血插槽
   */
  richSlot: RichSlot<U>
}

/**
 * 元素树插槽
 */
export const ElementTreeSlot: FC<ElementTreeSlotProps> = withStylePropsObserver(
  ({ richSlot: { element, logicPath, childElements, slot, key, name } }) => {
    const elementId = element.id
    const {
      elementTreeStore: {
        components: { ElementTreeNode: EtNode },
        isFolded: isF,
      },
      elementStore: { isChildElement },
    } = useEditor<ElementTreeEditor>()
    const isFoldable = !!childElements.length
    const isFolded = isF(key)
    const titleDroppableProps = useDroppable<ElementTreeEditorPlugin>(
      (entity, point, el) => {
        if (
          !isDraggableElementOrComponent<ElementTreeEditorPlugin>(entity) ||
          (entity.type === DRAGGABLE_ENTITY_TYPE_ELEMENT &&
            isChildElement(entity.element.id, elementId))
        ) {
          return null
        }
        void point
        const bounding = createRectangleByHtmlElement(el)
        return {
          type: DROPPABLE_POSITION_TYPE_ELEMENT_TREE,
          bounding,
          order: 'last',
          elementId,
          slotLogicPath: logicPath,
          dynamicRender: slot.dynamicRender,
        } satisfies DroppableElementTreePosition
      },
    )
    return (
      <InternalElementTreeSlotContainer className="lc-slot">
        <div className="lc-slot-title" {...titleDroppableProps}>
          <InternalFoldButton isFoldable={isFoldable} foldKey={key} />
          <TypographyText type="secondary" className="lc-slot-name">
            {name}
          </TypographyText>
        </div>
        {isFolded || (
          <div className="lc-child-nodes">
            <div className="lc-line" />
            {childElements.map((el) => (
              <EtNode key={el.id} element={el} />
            ))}
          </div>
        )}
      </InternalElementTreeSlotContainer>
    )
  },
)

/**
 * 内部：元素树插槽容器
 */
export const InternalElementTreeSlotContainer = styled.div`
  padding-left: 8px;

  .lc-slot-title {
    margin-right: 8px;
    display: flex;
    align-items: center;
    user-select: none;
  }
`
