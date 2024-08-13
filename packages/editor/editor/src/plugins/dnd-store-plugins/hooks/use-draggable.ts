import type { Point, Returnable } from '@p-lc/shared'
import { createPointByEventClient, getReturnValue } from '@p-lc/shared'
import type React from 'react'
import type { MouseEventHandler } from 'react'
import { useMemo } from 'react'
import { useLatest } from 'react-use'
import type { AnyEditorPlugin, EditorDefaultPlugin } from '../../../types'
import { useEditor } from '../../editor-plugin-editor-react-context'
import type { DraggableEntity } from '../editor-plugin-dnd-store'

/**
 * 可拖拽属性
 */
export interface DraggableProps {
  /**
   * 鼠标按压事件处理
   */
  onMouseDown: MouseEventHandler
}

/**
 * 使用可拖拽
 * @param entity 实体，null 表示不可拖拽
 */
export function useDraggable<
  Plugin extends AnyEditorPlugin = EditorDefaultPlugin,
>(
  entity: Returnable<
    DraggableEntity<Plugin> | null,
    [React.MouseEvent<Element, MouseEvent>, Point]
  >,
): DraggableProps {
  const {
    dndStore: { dragStart },
  } = useEditor()
  const refLatestEntity = useLatest(entity)
  return useMemo(
    () => ({
      onMouseDown(ev): void {
        // 非左键返回
        if (ev.buttons !== 1) return
        // TODO: 按住 Alt 或 option 键时，不发起拖拽，模式（design mode/preview mode）
        const point = createPointByEventClient(ev)
        const et = getReturnValue(
          refLatestEntity.current,
          ev,
          point,
        ) as unknown as DraggableEntity<EditorDefaultPlugin> | null
        if (!et) return
        dragStart(et, point)
      },
    }),
    [dragStart, refLatestEntity],
  )
}
