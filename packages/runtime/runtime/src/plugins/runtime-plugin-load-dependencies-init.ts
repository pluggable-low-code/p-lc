import { type runtimePluginLoadDependencies } from './runtime-plugin-load-dependencies'

/**
 * 运行时加载依赖初始化插件
 */
export const runtimePluginLoadDependenciesInit: typeof runtimePluginLoadDependencies =
  {
    id: 'load-dependencies-init',
    initRuntime(ctx) {
      ctx.loadDependencies()
    },
  }
