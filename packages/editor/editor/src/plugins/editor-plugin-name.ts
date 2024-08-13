import type { EditorRawPlugin } from '../types'

/**
 * 编辑器名称插件属性扩展
 */
export interface EditorPluginNamePropertiesExt {
  editor: {
    /**
     * 名称
     */
    name: string
  }
  editorInitOptions: {
    /**
     * 名称
     */
    name?: string
  }
}

/**
 * 编辑器名称插件
 */
export const editorPluginName: EditorRawPlugin<EditorPluginNamePropertiesExt> =
  {
    id: 'name',
    initEditor(ctx) {
      ctx.name = ctx.initOptions.name || 'lc-editor'
    },
  }
