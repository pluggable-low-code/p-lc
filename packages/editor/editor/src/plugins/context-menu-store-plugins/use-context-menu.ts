import type { Point, Returnable } from '@p-lc/shared'
import { createPointByEventClient, getReturnValue } from '@p-lc/shared'
import type { MouseEventHandler } from 'react'
import { useMemo } from 'react'
import { useLatest } from 'react-use'
import type { AnyEditorPlugin, EditorDefaultPlugin } from '../../types'
import { useEditor } from '../editor-plugin-editor-react-context'
import type { ContextMenuEntity } from './editor-plugin-context-menu-store'

/**
 * 使用上下文菜单属性
 */
export interface UseContextMenuProps {
  /**
   * 上下文菜单事件处理
   */
  onContextMenu: MouseEventHandler
}

/**
 * 使用上下文菜单
 * @param entity 实体，null 表示不打开
 */
export function useContextMenu<
  Plugin extends AnyEditorPlugin = EditorDefaultPlugin,
>(
  entity: Returnable<
    ContextMenuEntity<Plugin> | null,
    [React.MouseEvent<Element, MouseEvent>, Point]
  >,
): UseContextMenuProps {
  const {
    contextMenuStore: { open },
  } = useEditor()
  const refLatestEntity = useLatest(entity)
  return useMemo(
    () => ({
      onContextMenu(ev): void {
        // TODO: 按住 Alt 或 option 键时，不打开右键菜单，模式（design mode/preview mode）
        const point = createPointByEventClient(ev)
        const et = getReturnValue(
          refLatestEntity.current,
          ev,
          point,
        ) as unknown as ContextMenuEntity<EditorDefaultPlugin> | null
        if (!et) return
        if (open(et, point)) {
          ev.preventDefault()
        }
      },
    }),
    [open, refLatestEntity],
  )
}
