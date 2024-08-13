import type { EditorPlugin } from '@p-lc/editor'
import type { ContextMenuEditorApis } from '../runtime-plugins'
import { type editorPluginPreviewerStore } from './editor-plugin-previewer-store'
import { type editorPluginPreviewerStorePosition } from './editor-plugin-previewer-store-position'

/**
 * 编辑器预览器仓库上下文菜单插件属性扩展
 */
export interface EditorPluginPreviewerStoreContextMenuPropertiesExt {
  editor: {
    /**
     * 预览器仓库
     */
    previewerStore: {
      /**
       * 编辑器暴露
       */
      editorExpose: ContextMenuEditorApis
    }
  }
}

/**
 * 编辑器预览器仓库上下文菜单插件
 */
export const editorPluginPreviewerStoreContextMenu: EditorPlugin<
  EditorPluginPreviewerStoreContextMenuPropertiesExt,
  typeof editorPluginPreviewerStore | typeof editorPluginPreviewerStorePosition
> = {
  id: 'preview-store-context-menu',
  initEditor(ctx) {
    const { previewerStore, contextMenuStore } = ctx
    const { editorExpose } = previewerStore
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    editorExpose.openContextMenu = (entity, point) => {
      return contextMenuStore.open(
        entity,
        previewerStore.pointTransformFromRuntime(point),
      )
    }
  },
}
