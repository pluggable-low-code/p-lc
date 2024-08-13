import { createRuntime } from '@p-lc/runtime'
import { reactRuntimePlugins } from './plugins'
import type { ReactRuntime } from './types'

/**
 * 创建 React 运行时
 */
export function createReactRuntime(): ReactRuntime {
  return createRuntime().use(...reactRuntimePlugins)
}
