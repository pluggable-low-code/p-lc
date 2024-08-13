import {
  EDITOR_EVENT_KEY_DRAG_END,
  EDITOR_EVENT_KEY_DRAG_MOVE,
} from '@p-lc/editor'
import type { VoidFn } from '@p-lc/shared'
import {
  clEtLeftItem,
  type editorPluginClEtAdaptor,
} from './editor-plugin-cl-et-adaptor'

/**
 * 编辑器经典布局元素树拖放适配器插件
 */
export const editorPluginClEtDndAdaptor: typeof editorPluginClEtAdaptor = {
  id: 'cl-et-dnd-adaptor',
  initEditor(ctx) {
    const { emitter, dndStore, layoutStore } = ctx
    let restore: VoidFn | null = null
    emitter.on(EDITOR_EVENT_KEY_DRAG_MOVE, () => {
      if (restore) return
      const { isDragging } = dndStore
      const {
        state: { leftActiveItemId },
      } = layoutStore
      if (isDragging && leftActiveItemId !== clEtLeftItem.id) {
        layoutStore.setLeftActiveItemId(clEtLeftItem.id)
        restore = (): void => layoutStore.setLeftActiveItemId(leftActiveItemId)
      }
    })
    emitter.on(EDITOR_EVENT_KEY_DRAG_END, () => {
      restore?.()
      restore = null
    })
  },
}
