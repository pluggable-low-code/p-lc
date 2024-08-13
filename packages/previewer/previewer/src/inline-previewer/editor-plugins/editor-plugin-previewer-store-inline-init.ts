import type {
  AnyEditorPlugin,
  EditorDefaultPropertiesExtHkt,
  EditorDefaultPropertiesExtHktPlugin,
  EditorPlugin,
  UidlStoreUidl,
} from '@p-lc/editor'
import type { InitInlineRuntime } from './editor-plugin-previewer-store-inline'
import { type editorPluginPreviewerStoreInline } from './editor-plugin-previewer-store-inline'

/**
 * 编辑器预览器仓库内联初始化插件属性扩展高等类型
 */
export interface EditorPluginPreviewStoreInlineInitPropertiesExtHkt<
  Plugin extends AnyEditorPlugin,
> {
  editorInitOptions: {
    /**
     * 创建内联运行时
     */
    initInlineRuntime?: InitInlineRuntime<Plugin>
    /**
     * 默认的内联运行时 UIDL
     */
    defaultInlineRuntimeUidl?: UidlStoreUidl<Plugin>
  }
}

/**
 * EditorPluginPreviewStoreInlineInitPropertiesExtHkt 辅助类型
 */
export interface $EditorPluginPreviewStoreInlineInitPropertiesExtHkt
  extends EditorDefaultPropertiesExtHkt {
  type: EditorPluginPreviewStoreInlineInitPropertiesExtHkt<
    EditorDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 编辑器预览器仓库内联初始化插件
 */
export const editorPluginPreviewerStoreInlineInit: EditorPlugin<
  $EditorPluginPreviewStoreInlineInitPropertiesExtHkt,
  typeof editorPluginPreviewerStoreInline
> = {
  id: 'previewer-store-inline-init',
  initEditor(ctx) {
    const {
      initOptions: { initInlineRuntime, defaultInlineRuntimeUidl },
      previewerStore,
    } = ctx
    if (initInlineRuntime) {
      previewerStore.initInlineRuntime = initInlineRuntime
    }
    if (defaultInlineRuntimeUidl) {
      previewerStore.defaultInlineRuntimeUidl = defaultInlineRuntimeUidl
    }
  },
}
