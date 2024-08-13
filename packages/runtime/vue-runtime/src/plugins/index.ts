import { runtimePluginExpressionSlotVue } from './runtime-plugin-expression-slot-vue'
import { runtimePluginVueClContexts } from './runtime-plugin-vue-cl-contexts'
import { runtimePluginVueRenderer } from './runtime-plugin-vue-renderer'
import { runtimePluginVueRendererHocs } from './runtime-plugin-vue-renderer-hocs'

export * from './runtime-plugin-expression-slot-vue'
export * from './runtime-plugin-vue-cl-contexts'
export * from './runtime-plugin-vue-renderer'
export * from './runtime-plugin-vue-renderer-hocs'

/**
 * Vue 运行时插件
 */
export const vueRuntimePlugins = [
  runtimePluginVueRendererHocs,
  runtimePluginVueRenderer,
  runtimePluginExpressionSlotVue,
  runtimePluginVueClContexts,
]
