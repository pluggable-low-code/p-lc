import { createReactRuntime } from '@p-lc/react-runtime'
import { createRenderer, createRendererOwnerInit } from '@p-lc/react-shared'
import '@p-lc/runtime'
import { assign } from 'lodash-uni'
import { scratchReactRuntimeInitOptions } from './init-options'
import type { ScratchReactRuntime } from './types'

/**
 * 创建起步 React 运行时
 */
export function createScratchReactRuntime(): ScratchReactRuntime {
  const ret = createReactRuntime()
  if (process.env.NODE_ENV === 'development') {
    assign(window, {
      debugRuntime: ret,
    })
  }
  return ret
}

/**
 * （创建并）初始化起步 React 运行时
 */
export const initScratchReactRuntime = createRendererOwnerInit(
  createScratchReactRuntime,
  scratchReactRuntimeInitOptions,
)

/**
 * 起步 React 运行时渲染器
 */
export const ScratchReactRuntimeRenderer = createRenderer(
  initScratchReactRuntime,
)
