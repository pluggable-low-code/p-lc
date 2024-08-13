import type { RuntimePlugin } from '@p-lc/runtime'
import type { LiteralObject } from '@p-lc/shared'

/**
 * 运行时预览器插件属性扩展
 */
export interface RuntimePluginPreviewerPropertiesExt {
  runtime: {
    /**
     * 编辑器调用，用于调用编辑器暴露的函数，由其他插件扩展
     */
    editorCall: LiteralObject
    /**
     * 运行时暴露，用于向编辑器暴露函数，由其他插件扩展
     */
    runtimeExpose: LiteralObject
  }
}

/**
 * 运行时预览器插件
 */
export const runtimePluginPreviewer: RuntimePlugin<RuntimePluginPreviewerPropertiesExt> =
  {
    id: 'previewer',
    initRuntime(ctx) {
      ctx.runtimeExpose = {}
    },
  }
