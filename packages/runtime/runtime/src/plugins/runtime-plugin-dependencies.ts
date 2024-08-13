import type { UnknownObject } from '@p-lc/shared'
import type { RuntimeRawPlugin } from '../types'

/**
 * 运行时依赖插件属性扩展
 */
export interface RuntimePluginDependenciesPropertiesExt {
  runtime: {
    /**
     * 依赖
     */
    dependencies: UnknownObject
  }
  runtimeInitOptions: {
    /**
     * 依赖
     */
    dependencies?: UnknownObject
  }
}

/**
 * 运行时依赖插件
 */
export const runtimePluginDependencies: RuntimeRawPlugin<RuntimePluginDependenciesPropertiesExt> =
  {
    id: 'dependencies',
    initRuntime(ctx) {
      const {
        initOptions: { dependencies: initDependencies },
      } = ctx
      ctx.dependencies = {
        ...initDependencies,
      }
    },
  }
