import { createRuntime } from '@p-lc/runtime'
import { vueRuntimePlugins } from './plugins'
import type { VueRuntime } from './types'

/**
 * 创建 Vue 运行时
 */
export function createVueRuntime(): VueRuntime {
  return createRuntime().use(...vueRuntimePlugins)
}
