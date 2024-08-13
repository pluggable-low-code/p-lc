import type { DraggableProps, DroppableProps } from '@p-lc/editor'
import {
  DRAGGABLE_ENTITY_TYPE_ELEMENT,
  isDraggableElementOrComponent,
  useDraggable,
  useDroppable,
  useEditor,
} from '@p-lc/editor'
import {
  POSITION_TYPE_BOTTOM,
  POSITION_TYPE_LEFT,
  POSITION_TYPE_RIGHT,
  POSITION_TYPE_TOP,
  getRatioPointInRectangle,
  isAlmostSameRectangle,
  mathMin,
} from '@p-lc/shared'
import {
  ENTITY_DETAIL_TYPE_ELEMENT,
  childrenSlotLogicPath,
} from '@p-lc/uidl-utils'
import { inRange, isEqual } from 'lodash-uni'
import { useMemo } from 'react'
import type { DroppablePreviewerPosition } from '../../previewer'
import { DROPPABLE_POSITION_TYPE_PREVIEWER } from '../../previewer'
import type {
  InlinePreviewerEditor,
  InlinePreviewerEditorPlugin,
} from '../types'

/**
 * 使用拖放内联预览
 */
export function useDndInlinePreview(): DraggableProps & DroppableProps {
  const {
    previewerStore,
    pdStore,
    elementStore: { findElementDetail, isChildElement, isRootElement },
  } = useEditor<InlinePreviewerEditor>()
  const draggableProps = useDraggable<InlinePreviewerEditorPlugin>(
    (ev, point) => {
      void ev
      const elPos = previewerStore.positionCall.elementPositionFromPoint(point)
      if (!elPos || isRootElement(elPos.elementId)) return null
      const ed = findElementDetail(elPos.elementId)
      if (!ed) return ed
      return {
        type: DRAGGABLE_ENTITY_TYPE_ELEMENT,
        element: ed.element,
      }
    },
  )
  const droppableProps = useDroppable<InlinePreviewerEditorPlugin>(
    (entity, point) => {
      if (!isDraggableElementOrComponent<InlinePreviewerEditorPlugin>(entity)) {
        return null
      }
      const elPos = previewerStore.positionCall.elementPositionFromPoint(point)
      const elementId = elPos?.elementId
      if (
        !elementId ||
        (entity.type === ENTITY_DETAIL_TYPE_ELEMENT &&
          isChildElement(entity.element.id, elementId))
      ) {
        return null
      }
      const { parentElementIdByDom, bounding, slotPos } = elPos
      if (slotPos) {
        // 命中插槽占位
        const { slotLogicPath, dynamicRender, bounding: slotBounding } = slotPos
        if (
          // 忽略几乎和元素重叠的默认子元素插槽，走下面更准确的判断
          !(
            isEqual(slotLogicPath, childrenSlotLogicPath) &&
            isAlmostSameRectangle(slotBounding, bounding)
          )
        ) {
          return {
            type: DROPPABLE_POSITION_TYPE_PREVIEWER,
            bounding: slotBounding,
            order: 'last',
            elementId,
            slotLogicPath,
            dynamicRender,
          } satisfies DroppablePreviewerPosition
        }
      }

      const rp = getRatioPointInRectangle(point, bounding)
      const childrenSlot = pdStore.getChildrenSlotWithUnknown(elementId)
      // DOM 意义上如果没有父元素的话，就认为是根元素或者弹窗元素
      const isRootOrPopup = !parentElementIdByDom
      if (
        childrenSlot &&
        (isRootOrPopup ||
          (inRange(rp.x, 0.25, 0.75) && inRange(rp.y, 0.25, 0.75)))
      ) {
        return {
          type: DROPPABLE_POSITION_TYPE_PREVIEWER,
          bounding,
          order: 'last',
          elementId,
          slotLogicPath: childrenSlotLogicPath,
          dynamicRender: childrenSlot.dynamicRender,
        } satisfies DroppablePreviewerPosition
      }
      if (isRootOrPopup) return null
      const dx = mathMin(rp.x, 1 - rp.x)
      const dy = mathMin(rp.y, 1 - rp.y)
      return {
        type: DROPPABLE_POSITION_TYPE_PREVIEWER,
        bounding,
        order:
          mathMin(dx, dy) === dx
            ? dx === rp.x
              ? POSITION_TYPE_LEFT
              : POSITION_TYPE_RIGHT
            : dy === rp.y
              ? POSITION_TYPE_TOP
              : POSITION_TYPE_BOTTOM,
        elementId,
      } satisfies DroppablePreviewerPosition
    },
  )
  return useMemo(
    () => ({
      ...draggableProps,
      ...droppableProps,
    }),
    [draggableProps, droppableProps],
  )
}
