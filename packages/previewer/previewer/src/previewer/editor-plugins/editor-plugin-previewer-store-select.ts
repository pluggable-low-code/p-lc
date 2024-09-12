import type { EditorPlugin } from '@p-lc/editor'
import type { SelectEditorApis } from '../runtime-plugins'
import { type editorPluginPreviewerStore } from './editor-plugin-previewer-store'

/**
 * 编辑器预览器仓库选择插件属性扩展
 */
export interface EditorPluginPreviewerStoreSelectPropertiesExt {
  editor: {
    /**
     * 预览器仓库
     */
    previewerStore: {
      /**
       * 编辑器暴露
       */
      editorExpose: SelectEditorApis
    }
  }
}

/**
 * 编辑器预览器仓库选择插件
 */
export const editorPluginPreviewerStoreSelect: EditorPlugin<
  EditorPluginPreviewerStoreSelectPropertiesExt,
  typeof editorPluginPreviewerStore
> = {
  id: 'preview-store-select',
  initEditor(ctx) {
    const { previewerStore, elementStore } = ctx
    const { editorExpose } = previewerStore
    editorExpose.selectElement = elementStore.selectElement
  },
}
