import {
  CONTEXT_MENU_ENTITY_TYPE_ELEMENT,
  DRAGGABLE_ENTITY_TYPE_ELEMENT,
  isDraggableElementOrComponent,
  useContextMenu,
  useDraggable,
  useDroppable,
  useEditor,
} from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import {
  ComponentIcon,
  TypographyText,
  withStylePropsObserver,
} from '@p-lc/react-shared'
import {
  POSITION_TYPE_AFTER,
  POSITION_TYPE_BEFORE,
  VCVN_BORDER_RADIUS,
  VCVN_COLOR_HIGHLIGHT,
  VCVN_COLOR_HOVER_BG,
  VCVN_COLOR_ICON,
  VCVN_COLOR_LIGHT_ICON,
  VCVN_DURATION_TRANSITION,
  createRectangleByHtmlElement,
  getRatioPointInRectangle,
  hasCssClass,
  isHtmlElement,
} from '@p-lc/shared'
import type { EditorUidlElement } from '@p-lc/uidl'
import { childrenSlotLogicPath } from '@p-lc/uidl-utils'
import { NavArrowRight } from 'iconoir-react'
import { inRange, isEqual } from 'lodash-uni'
import type { FC } from 'react'
import { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import type { ElementTreeEditor, ElementTreeEditorPlugin } from '../../../types'
import type { DroppableElementTreePosition } from '../../editor-plugin-element-tree-store-dnd'
import { DROPPABLE_POSITION_TYPE_ELEMENT_TREE } from '../../editor-plugin-element-tree-store-dnd'

/**
 * 元素树节点
 */
export interface ElementTreeNodeProps extends StyleProps {
  /**
   * 元素
   */
  element: EditorUidlElement
}

/**
 * 元素树节点
 */
export const ElementTreeNode: FC<ElementTreeNodeProps> = withStylePropsObserver(
  ({ element }) => {
    const elementId = element.id
    const {
      elementTreeStore: {
        components: { ElementTreeNode: EtNode, ElementTreeSlot: EtSlot },
        isFolded: isF,
        getRichSlots,
      },
      pdStore: { getComponentIconByEt },
      elementStore: {
        isRootElement,
        selectElement,
        selectedElementId,
        isChildElement,
      },
    } = useEditor<ElementTreeEditor>()
    const richSlots = useMemo(
      () => getRichSlots(element),
      [element, getRichSlots],
    )
    const [childrenRichSlot, otherRichSlots] = useMemo(() => {
      if (
        richSlots.length &&
        isEqual(richSlots[0].logicPath, childrenSlotLogicPath)
      ) {
        return [richSlots[0], richSlots.slice(1)]
      }
      return [null, richSlots]
    }, [richSlots])
    const handleTitleClick = useCallback(
      (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { target } = ev
        if (isHtmlElement(target) && hasCssClass(target, 'lc-fold-btn')) {
          return
        }
        selectElement(elementId)
      },
      [elementId, selectElement],
    )
    const icon = getComponentIconByEt(element.type)
    const isFoldable = !!(
      otherRichSlots.length || childrenRichSlot?.childElements.length
    )
    const isFolded = isF(elementId)
    const isSelected = selectedElementId === elementId
    const isRoot = isRootElement(element)
    const titleDraggableProps = useDraggable<ElementTreeEditorPlugin>({
      type: DRAGGABLE_ENTITY_TYPE_ELEMENT,
      element,
    })
    const titleDroppableProps = useDroppable<ElementTreeEditorPlugin>(
      (entity, point, el) => {
        if (
          !isDraggableElementOrComponent<ElementTreeEditorPlugin>(entity) ||
          (entity.type === DRAGGABLE_ENTITY_TYPE_ELEMENT &&
            isChildElement(entity.element.id, elementId))
        ) {
          return null
        }
        const bounding = createRectangleByHtmlElement(el)
        const rp = getRatioPointInRectangle(point, bounding)
        if (childrenRichSlot && (isRoot || inRange(rp.y, 0.25, 0.75))) {
          return {
            type: DROPPABLE_POSITION_TYPE_ELEMENT_TREE,
            bounding,
            order: 'last',
            elementId,
            slotLogicPath: childrenSlotLogicPath,
            dynamicRender: childrenRichSlot.slot.dynamicRender,
          } satisfies DroppableElementTreePosition
        }
        if (isRoot) return null
        return {
          type: DROPPABLE_POSITION_TYPE_ELEMENT_TREE,
          bounding,
          order: rp.y < 0.5 ? POSITION_TYPE_BEFORE : POSITION_TYPE_AFTER,
          elementId,
        } satisfies DroppableElementTreePosition
      },
    )
    const contextMenuProps = useContextMenu({
      type: CONTEXT_MENU_ENTITY_TYPE_ELEMENT,
      elementId,
    })
    return (
      <InternalElementTreeNodeContainer
        $isSelected={isSelected}
        className="lc-et-node"
      >
        <div
          className="lc-title"
          onClick={handleTitleClick}
          {...(isRoot ? {} : titleDraggableProps)}
          {...titleDroppableProps}
          {...contextMenuProps}
        >
          <InternalFoldButton isFoldable={isFoldable} foldKey={elementId} />
          {icon && <ComponentIcon icon={icon} />}
          <TypographyText className="lc-name">{element.name}</TypographyText>
        </div>
        {isFolded || (
          <div className="lc-child-nodes">
            <div className="lc-line" />
            {childrenRichSlot?.childElements.map((el) => (
              <EtNode key={el.id} element={el} />
            ))}
            {otherRichSlots.map((ors) => (
              <EtSlot key={ors.key} richSlot={ors} />
            ))}
          </div>
        )}
      </InternalElementTreeNodeContainer>
    )
  },
)

/**
 * 内部：元素树节点容器
 */
export const InternalElementTreeNodeContainer = styled.div<{
  $isSelected: boolean
}>`
  padding-left: 8px;

  > .lc-title {
    margin-right: 8px;
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    border-radius: ${VCVN_BORDER_RADIUS};

    &:hover {
      background: ${VCVN_COLOR_HOVER_BG};
    }

    .lc-name {
      ${
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        (props) => ({
          color: props.$isSelected ? VCVN_COLOR_HIGHLIGHT : undefined,
        })
      }
    }
  }

  .lc-child-nodes {
    position: relative;
  }

  .lc-line {
    position: absolute;
    left: 6px;
    width: 0.5px;
    height: 100%;
    background: ${VCVN_COLOR_LIGHT_ICON};
    visibility: hidden;
  }

  > .lc-child-nodes > .lc-line {
    ${
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      ({ $isSelected }) => ({
        background: $isSelected ? VCVN_COLOR_HIGHLIGHT : undefined,
        visibility: $isSelected ? 'visible' : undefined,
      })
    }
  }

  &:hover {
    .lc-line {
      visibility: visible;
    }
  }
`

/**
 * 内部：折叠按钮属性
 */
export interface InternalFoldButtonProps extends StyleProps {
  /**
   * 可折叠
   */
  isFoldable: boolean
  /**
   * 折叠键值
   */
  foldKey: string
}

/**
 * 内部：折叠按钮
 */
export const InternalFoldButton: FC<InternalFoldButtonProps> =
  withStylePropsObserver(({ isFoldable, foldKey }) => {
    const {
      elementTreeStore: { isFolded: isF, toggleFold },
    } = useEditor<ElementTreeEditor>()
    const handleClick = useCallback(() => {
      toggleFold(foldKey)
    }, [foldKey, toggleFold])
    const isFolded = isF(foldKey)
    return (
      <InternalFoldButtonContainer
        $isFoldable={isFoldable}
        $isFolded={isFolded}
        onClick={handleClick}
        className="lc-fold-btn"
      >
        <NavArrowRight />
      </InternalFoldButtonContainer>
    )
  })

/**
 * 内部：折叠按钮容器
 */
export const InternalFoldButtonContainer = styled.div<{
  $isFoldable: boolean
  $isFolded: boolean
}>`
  visibility: ${
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    (props) => (props.$isFoldable ? 'visible' : 'hidden')
  };
  transform: ${
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    (props) => (props.$isFolded ? 'none' : 'rotate(90deg)')
  };
  margin-right: 4px;
  font-size: 12px;
  line-height: 0;
  transition-property: transform;
  transition-duration: ${VCVN_DURATION_TRANSITION};
  color: ${VCVN_COLOR_ICON};
  cursor: pointer;
  user-select: none;

  svg {
    pointer-events: none;
  }
`
