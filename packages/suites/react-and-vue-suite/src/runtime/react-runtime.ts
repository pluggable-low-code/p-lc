import { createReactRuntime } from '@p-lc/react-runtime'
import { createRenderer, createRendererOwnerInit } from '@p-lc/react-shared'
import '@p-lc/runtime'
import { assign } from 'lodash-uni'
import { ravRuntimeInitOptions } from './init-options'
import type { RavReactRuntime } from './types'

/**
 * 创建 RAV React 运行时
 */
export function createRavReactRuntime(): RavReactRuntime {
  const ret = createReactRuntime()
  if (process.env.NODE_ENV === 'development') {
    assign(window, {
      debugRuntime: ret,
    })
  }
  return ret
}

/**
 * （创建并）初始化 RAV React 运行时
 */
export const initRavReactRuntime = createRendererOwnerInit(
  createRavReactRuntime,
  ravRuntimeInitOptions,
)

/**
 * RAV React 运行时渲染器
 */
export const RavReactRuntimeRenderer = createRenderer(initRavReactRuntime)
