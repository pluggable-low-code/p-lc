import { Mobo } from '@mobo-ts/mobo'
import { runtimeExtKeys } from './constants'
import { runtimeDefaultPlugins } from './plugins'
import type { DefaultRuntime } from './types'

/**
 * 创建运行时
 */
export function createRuntime(): DefaultRuntime {
  return new Mobo(runtimeDefaultPlugins, runtimeExtKeys)
}
