import type { EditorPlugin } from '@p-lc/editor'
import type { ViewEffectEditorApis } from '../runtime-plugins'
import { type editorPluginPreviewerStore } from './editor-plugin-previewer-store'

/**
 * 编辑器预览器仓库视图副作用插件属性扩展
 */
export interface EditorPluginPreviewerStoreViewEffectPropertiesExt {
  editor: {
    /**
     * 发射器事件
     */
    emitterEvents: {
      /**
       * 运行时视图副作用事件
       */
      runtimeViewEffect: void
    }
    /**
     * 预览器仓库
     */
    previewerStore: {
      /**
       * 编辑器暴露
       */
      editorExpose: ViewEffectEditorApis
    }
  }
}

/**
 * 编辑器事件键值：运行时视图副作用
 */
export const EDITOR_EVENT_KEY_RUNTIME_VIEW_EFFECT = 'runtimeViewEffect'

/**
 * 编辑器预览器仓库视图副作用插件
 */
export const editorPluginPreviewerStoreViewEffect: EditorPlugin<
  EditorPluginPreviewerStoreViewEffectPropertiesExt,
  typeof editorPluginPreviewerStore
> = {
  id: 'preview-store-ve',
  initEditor(ctx) {
    const {
      emitter,
      previewerStore: { editorExpose },
    } = ctx
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    editorExpose.onViewEffect = () => {
      emitter.emit(EDITOR_EVENT_KEY_RUNTIME_VIEW_EFFECT)
    }
  },
}
