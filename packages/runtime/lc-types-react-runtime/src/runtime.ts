import { createReactRuntime } from '@p-lc/react-runtime'
import '@p-lc/runtime'
import { lcTypesReactRuntimePlugins } from './plugins'
import type { LcTypesReactRuntime } from './types'

/**
 * 创建低代码类型 React 运行时
 */
export function createLcTypesReactRuntime(): LcTypesReactRuntime {
  return createReactRuntime().use(...lcTypesReactRuntimePlugins)
}
