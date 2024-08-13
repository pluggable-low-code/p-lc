import type { EditorPlugin } from '@p-lc/editor'
import type { Disposer, VoidFn } from '@p-lc/shared'
import { create, deleteAllKeys } from '@p-lc/shared'
import { keys } from 'lodash-uni'
import mitt from 'mitt'
import type { ResizeEditorApis, ResizeRuntimeApis } from '../runtime-plugins'
import { type editorPluginPreviewerStore } from './editor-plugin-previewer-store'

/**
 * 编辑器预览器仓库调整大小插件属性扩展
 */
export interface EditorPluginPreviewerStoreResizePropertiesExt {
  editor: {
    /**
     * 预览器仓库
     */
    previewerStore: {
      /**
       * 运行时调用
       */
      runtimeCall: ResizeRuntimeApis
      /**
       * 编辑器暴露
       */
      editorExpose: ResizeEditorApis
      /**
       * 元素调整大小事件
       * @param id 元素 ID
       * @param cb 回调
       */
      onElementResize(id: string, cb: VoidFn): Disposer
    }
  }
}

/**
 * 编辑器预览器仓库调整大小插件
 */
export const editorPluginPreviewerStoreResize: EditorPlugin<
  EditorPluginPreviewerStoreResizePropertiesExt,
  typeof editorPluginPreviewerStore
> = {
  id: 'preview-store-resize',
  initEditor(ctx) {
    const { previewerStore } = ctx
    const { editorExpose } = previewerStore
    // 因为 onElementResize 有副作用，所以不好走统一的 emitter
    const m = mitt()
    previewerStore.onElementResize = (id, cb) => {
      m.on(id, cb)
      addRefCount(id)
      observeElements()
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      return () => {
        m.off(id, cb)
        subRefCount(id)
        observeElements()
      }
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    editorExpose.onElementResize = (id) => {
      m.emit(id)
    }
    const refCount: Record<string, number | undefined> = create(null)

    return () => {
      deleteAllKeys(refCount)
      observeElements()
    }

    function addRefCount(id: string): void {
      refCount[id] = (refCount[id] || 0) + 1
    }

    function subRefCount(id: string): void {
      const ret = (refCount[id] = (refCount[id] || 0) - 1)
      if (ret < 1) delete refCount[id]
    }

    function observeElements(): void {
      previewerStore.runtimeCall.observeElementResizeByIds(keys(refCount))
    }
  },
}
