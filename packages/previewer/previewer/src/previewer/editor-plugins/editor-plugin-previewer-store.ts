import type { EditorPlugin } from '@p-lc/editor'
import type { LiteralObject } from '@p-lc/shared'

/**
 * 编辑器预览器仓库插件属性扩展
 */
export interface EditorPluginPreviewStorePropertiesExt {
  editor: {
    /**
     * 预览器仓库
     */
    previewerStore: {
      /**
       * 运行时调用，用于调用运行时暴露的函数，由其他插件扩展
       */
      runtimeCall: LiteralObject
      /**
       * 编辑器暴露，用于向运行时暴露函数，由其他插件扩展
       */
      editorExpose: LiteralObject
    }
  }
}

/**
 * 编辑器预览器仓库插件
 */
export const editorPluginPreviewerStore: EditorPlugin<EditorPluginPreviewStorePropertiesExt> =
  {
    id: 'previewer-store',
    initEditor(ctx) {
      const previewerStore = (ctx.previewerStore =
        {} as typeof ctx.previewerStore)
      previewerStore.editorExpose = {}
    },
  }
