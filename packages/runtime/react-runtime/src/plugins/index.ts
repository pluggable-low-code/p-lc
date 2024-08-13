import { runtimePluginExpressionSlotReact } from './runtime-plugin-expression-slot-react'
import { runtimePluginReactClContexts } from './runtime-plugin-react-cl-contexts'
import { runtimePluginReactRenderer } from './runtime-plugin-react-renderer'
import { runtimePluginReactRendererHocs } from './runtime-plugin-react-renderer-hocs'

export * from './runtime-plugin-expression-slot-react'
export * from './runtime-plugin-react-cl-contexts'
export * from './runtime-plugin-react-renderer'
export * from './runtime-plugin-react-renderer-hocs'

/**
 * React 运行时插件
 */
export const reactRuntimePlugins = [
  runtimePluginReactRendererHocs,
  runtimePluginReactRenderer,
  runtimePluginExpressionSlotReact,
  runtimePluginReactClContexts,
]
