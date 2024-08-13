import { useEffect } from 'react'
import { useLatest } from 'react-use'
import type { Get } from 'type-fest'
import type { DefaultEditor } from '../../../types'
import { useEditor } from '../../editor-plugin-editor-react-context'
import {
  EDITOR_EVENT_KEY_DRAG_END,
  EDITOR_EVENT_KEY_DRAG_MOVE,
} from '../editor-plugin-dnd-store'

/**
 * 使用拖拽移动回调选项
 */
export type UseDragMoveCbOptions<E = DefaultEditor> = Get<
  E,
  ['emitterEvents', typeof EDITOR_EVENT_KEY_DRAG_MOVE]
>

/**
 * 使用拖拽移动回调
 */
export interface UseDragMoveCb<E = DefaultEditor> {
  /**
   * 使用拖拽移动回调
   * @param options 选项
   */
  (options: UseDragMoveCbOptions<E>): void
}

/**
 * 使用拖拽移动
 * @param cb 回调
 * @param endCb 拖拽结束回调
 */
export function useDragMove<E = DefaultEditor>(
  cb: UseDragMoveCb<E>,
  endCb?: () => void,
): void {
  const refLatestCb = useLatest(cb)
  const refLatestEndCb = useLatest(endCb)
  const { emitter } = useEditor()
  useEffect(() => {
    emitter.on(EDITOR_EVENT_KEY_DRAG_MOVE, dragMove)
    emitter.on(EDITOR_EVENT_KEY_DRAG_END, dragEnd)
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    return () => {
      emitter.off(EDITOR_EVENT_KEY_DRAG_MOVE, dragMove)
      emitter.off(EDITOR_EVENT_KEY_DRAG_END, dragEnd)
    }

    function dragMove(options: UseDragMoveCbOptions): void {
      refLatestCb.current(options as UseDragMoveCbOptions<E>)
    }

    function dragEnd(): void {
      refLatestEndCb.current?.()
    }
  }, [emitter, refLatestCb, refLatestEndCb])
}
