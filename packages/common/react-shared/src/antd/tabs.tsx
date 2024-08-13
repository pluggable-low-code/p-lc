import type { DragEndEvent } from '@dnd-kit/core'
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { POSITION_TYPE_LEFT, POSITION_TYPE_RIGHT } from '@p-lc/shared'
import { Tabs } from 'antd'
import type {
  CSSProperties,
  ComponentProps,
  FC,
  HTMLAttributes,
  ReactElement,
} from 'react'
import { cloneElement, memo, useCallback, useMemo } from 'react'
import styled from 'styled-components'

/**
 * 可排序标签页属性
 */
export interface SortableTabsProps extends ComponentProps<typeof Tabs> {
  /**
   * 排序拖拽结束事件
   * @param fromIndex 起点下标
   * @param toIndex 终点下标
   */
  onSortDragEnd(fromIndex: number, toIndex: number): void
}

/**
 * 可排序标签页
 */
export const SortableTabs: FC<SortableTabsProps> = memo(
  ({ onSortDragEnd, ...restProps }) => {
    const { items: rawItems, tabPosition } = restProps
    const items = useMemo(() => rawItems || [], [rawItems])
    const itemKeys = useMemo(() => items.map((i) => i.key), [items])
    const sensors = useSensors(
      useSensor(PointerSensor, {
        activationConstraint: { distance: 10 },
      }),
    )
    const handleDragEnd = useCallback(
      ({ active, over }: DragEndEvent) => {
        if (over && active.id !== over.id) {
          const fromKey = active.id
          const toKey = over.id
          const fromIndex = items.findIndex((item) => item.key === fromKey)
          const toIndex = items.findIndex((item) => item.key === toKey)
          onSortDragEnd(fromIndex, toIndex)
        }
      },
      [items, onSortDragEnd],
    )
    const renderTabBar: NonNullable<typeof restProps.renderTabBar> =
      useCallback(
        (tabBarProps, DefaultTabBar) => (
          <DndContext
            sensors={sensors}
            onDragEnd={handleDragEnd}
            collisionDetection={closestCenter}
          >
            <SortableContext
              items={itemKeys}
              strategy={
                tabPosition === POSITION_TYPE_LEFT ||
                tabPosition === POSITION_TYPE_RIGHT
                  ? verticalListSortingStrategy
                  : horizontalListSortingStrategy
              }
            >
              <DefaultTabBar {...tabBarProps}>
                {(node) => (
                  <DraggableTabNode {...node.props} key={node.key}>
                    {node}
                  </DraggableTabNode>
                )}
              </DefaultTabBar>
            </SortableContext>
          </DndContext>
        ),
        [handleDragEnd, itemKeys, sensors, tabPosition],
      )
    return <StyledTabs renderTabBar={renderTabBar} {...restProps} />
  },
)

/**
 * styled 包装后的 antd 标签页，修复样式问题
 */
const StyledTabs = styled(Tabs)`
  &&& .ant-tabs-tab {
    transition: none;
  }
`

/**
 * 可拖拽标签页节点属性
 */
interface DraggableTabNodeProps extends HTMLAttributes<HTMLDivElement> {
  ['data-node-key']: string
}

/**
 * 可拖拽标签页节点
 */
const DraggableTabNode: FC<DraggableTabNodeProps> = ({
  style: rawStyle,
  children,
  'data-node-key': dataNodeKey,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: dataNodeKey,
    })
  const style: CSSProperties = useMemo(
    () => ({
      ...rawStyle,
      transform: CSS.Translate.toString(transform),
      transition,
      cursor: 'move',
    }),
    [rawStyle, transform, transition],
  )
  return cloneElement(children as ReactElement, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners,
  })
}
