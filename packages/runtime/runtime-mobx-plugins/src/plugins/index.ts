import { runtimePluginMobxControllerChildren } from './runtime-plugin-mobx-controller-children'
import { runtimePluginMobxFor } from './runtime-plugin-mobx-for'
import { runtimePluginMobxIf } from './runtime-plugin-mobx-if'
import { runtimePluginMobxProps } from './runtime-plugin-mobx-props'

export * from './runtime-plugin-mobx-controller-children'
export * from './runtime-plugin-mobx-for'
export * from './runtime-plugin-mobx-if'
export * from './runtime-plugin-mobx-props'

/**
 * 运行时 MobX 插件
 */
export const runtimeMobxPlugins = [
  runtimePluginMobxIf,
  runtimePluginMobxFor,
  runtimePluginMobxProps,
  runtimePluginMobxControllerChildren,
]
