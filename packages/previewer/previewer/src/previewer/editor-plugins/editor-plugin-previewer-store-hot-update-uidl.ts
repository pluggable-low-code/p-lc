import type { EditorPlugin } from '@p-lc/editor'
import { EDITOR_EVENT_KEY_UIDL } from '@p-lc/editor'
import type { AnyRuntimePlugin } from '@p-lc/runtime'
import type { HotUpdateUidlRuntimeApis } from '../runtime-plugins'
import { type editorPluginPreviewerStore } from './editor-plugin-previewer-store'

/**
 * 编辑器预览器仓库热更新 UIDL 插件属性扩展
 */
export interface EditorPluginPreviewerStoreHotUpdateUidlPropertiesExt {
  editor: {
    /**
     * 预览器仓库
     */
    previewerStore: {
      /**
       * 运行时调用
       */
      runtimeCall: HotUpdateUidlRuntimeApis<AnyRuntimePlugin>
    }
  }
}

/**
 * 编辑器预览器仓库热更新 UIDL 插件
 */
export const editorPluginPreviewerStoreHotUpdateUidl: EditorPlugin<
  EditorPluginPreviewerStoreHotUpdateUidlPropertiesExt,
  typeof editorPluginPreviewerStore
> = {
  id: 'preview-store-huu',
  initEditor(ctx) {
    const { emitter, previewerStore } = ctx
    emitter.on(EDITOR_EVENT_KEY_UIDL, ({ uidl }) => {
      previewerStore.runtimeCall.hotUpdateUidl(uidl)
    })
  },
}
