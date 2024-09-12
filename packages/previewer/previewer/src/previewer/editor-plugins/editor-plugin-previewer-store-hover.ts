import type { EditorPlugin } from '@p-lc/editor'
import { action, makeObservable, observable } from 'mobx'
import type { HoverEditorApis } from '../runtime-plugins'
import { type editorPluginPreviewerStore } from './editor-plugin-previewer-store'

/**
 * 编辑器预览器仓库悬浮插件属性扩展
 */
export interface EditorPluginPreviewerStoreHoverPropertiesExt {
  editor: {
    /**
     * 预览器仓库
     */
    previewerStore: {
      /**
       * 编辑器暴露
       */
      editorExpose: HoverEditorApis
      /**
       * 悬浮的元素 ID
       */
      hoveredElementId: string | null
    }
  }
}

/**
 * 编辑器预览器仓库悬浮插件
 */
export const editorPluginPreviewerStoreHover: EditorPlugin<
  EditorPluginPreviewerStoreHoverPropertiesExt,
  typeof editorPluginPreviewerStore
> = {
  id: 'preview-store-hover',
  initEditor(ctx) {
    const { previewerStore } = ctx
    previewerStore.hoveredElementId = null
    makeObservable(previewerStore, {
      hoveredElementId: observable,
    })
    const { editorExpose } = previewerStore
    editorExpose.hoverElement = action((elementId) => {
      previewerStore.hoveredElementId = elementId
    })
  },
}
