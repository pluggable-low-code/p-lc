import { useLatestFn } from '@p-lc/react-shared'
import type { RefCallback } from 'react'
import { useMemo } from 'react'
import type { AnyEditorPlugin, EditorDefaultPlugin } from '../../../types'
import { useEditor } from '../../editor-plugin-editor-react-context'
import type {
  CaclHoveringPosition,
  DroppableOptions,
} from '../editor-plugin-dnd-store'

/**
 * 可放置属性
 */
export interface DroppableProps {
  /**
   * 引用
   */
  ref: RefCallback<HTMLElement>
}

/**
 * 使用可放置
 * @param calcHoveringPosition 计算悬浮的位置
 */
export function useDroppable<
  Plugin extends AnyEditorPlugin = EditorDefaultPlugin,
>(calcHoveringPosition: CaclHoveringPosition<Plugin>): DroppableProps {
  const latestCalcHoveringPosition = useLatestFn(calcHoveringPosition)
  const {
    dndStore: { droppableOptionsMap },
  } = useEditor()
  const ref: RefCallback<HTMLElement> = useMemo(() => {
    let lastEl: HTMLElement | null | undefined
    return (el) => {
      if (lastEl) {
        droppableOptionsMap.delete(lastEl)
      }
      if (el) {
        droppableOptionsMap.set(
          el,
          () =>
            ({
              calcHoveringPosition: latestCalcHoveringPosition,
            }) as unknown as DroppableOptions<EditorDefaultPlugin>,
        )
      }
      lastEl = el
    }
  }, [droppableOptionsMap, latestCalcHoveringPosition])
  return useMemo(
    () => ({
      ref,
    }),
    [ref],
  )
}
