import type { StyleProps } from '@p-lc/react-shared'
import { withStylePropsObserver } from '@p-lc/react-shared'
import {
  VCVN_BORDER_RADIUS,
  VCVN_Z_INDEX_MAX,
  getRectangleHeight,
  getRectangleWidth,
  pointToTranslate,
} from '@p-lc/shared'
import type { FC } from 'react'
import styled from 'styled-components'
import { useEditor } from '../../editor-plugin-editor-react-context'

/**
 * 拖放遮罩
 */
export const DndMask: FC<StyleProps> = withStylePropsObserver(() => {
  const {
    dndStore: { isDragging },
  } = useEditor()
  if (!isDragging) return null
  return (
    <InternalDndMaskContainer className="lc-dnd-mask">
      <DndDroppablePosition />
      <DndDraggingEntity />
    </InternalDndMaskContainer>
  )
})

/**
 * 内部：拖放遮罩容器
 */
export const InternalDndMaskContainer = styled.div`
  position: fixed;
  inset: 0px;
  z-index: ${VCVN_Z_INDEX_MAX};
  pointer-events: none;
  user-select: none;
`

/**
 * 可放置位置
 */
export const DndDroppablePosition: FC<StyleProps> = withStylePropsObserver(
  () => {
    const {
      dndStore: { droppablePositionRendererMap, hoveringPosition },
    } = useEditor()
    const Renderer =
      hoveringPosition &&
      droppablePositionRendererMap.get(hoveringPosition.type)
    const bounding = hoveringPosition?.bounding
    return (
      <InternalDndDroppablePositionContainer
        style={
          bounding && {
            top: bounding.s.y,
            left: bounding.s.x,
            width: getRectangleWidth(bounding),
            height: getRectangleHeight(bounding),
          }
        }
      >
        {Renderer && <Renderer {...hoveringPosition} />}
      </InternalDndDroppablePositionContainer>
    )
  },
)

/**
 * 内部：可放置位置容器
 */
export const InternalDndDroppablePositionContainer = styled.div`
  position: absolute;
  z-index: 1;
`

/**
 * 拖拽中的实体
 */
export const DndDraggingEntity: FC<StyleProps> = withStylePropsObserver(() => {
  const {
    dndStore: { draggableEntityRendererMap, draggingEntity, draggingPoint },
  } = useEditor()
  const Renderer =
    draggingEntity && draggableEntityRendererMap.get(draggingEntity.type)
  if (!Renderer) return null
  return (
    <InternalDndDraggingEntityContainer
      className="lc-dnd-entity"
      style={{
        transform: pointToTranslate(draggingPoint),
      }}
    >
      <Renderer {...draggingEntity} />
    </InternalDndDraggingEntityContainer>
  )
})

/**
 * 内部：拖拽中的实体容器
 */
export const InternalDndDraggingEntityContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 4px;
  border: 1px solid;
  border-radius: ${VCVN_BORDER_RADIUS};
  background: #bec8c8;
  opacity: 0.6;
  z-index: 2;
`
