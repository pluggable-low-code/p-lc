import type { LcTypesReactRuntime } from '@p-lc/lc-types-react-runtime'
import { createLcTypesReactRuntime as rawCreateLcTypesReactRuntime } from '@p-lc/lc-types-react-runtime'
import { createRenderer, createRendererOwnerInit } from '@p-lc/react-shared'
import '@p-lc/runtime'
import { assign } from 'lodash-uni'
import { lcTypesReactRuntimeInitOptions } from './init-options'

/**
 * 创建低代码类型 React 运行时
 */
export function createLcTypesReactRuntime(): LcTypesReactRuntime {
  const ret = rawCreateLcTypesReactRuntime()
  if (process.env.NODE_ENV === 'development') {
    assign(window, {
      debugRuntime: ret,
    })
  }
  return ret
}

/**
 * （创建并）初始化低代码类型 React 运行时
 */
export const initLcTypesReactRuntime = createRendererOwnerInit(
  createLcTypesReactRuntime,
  lcTypesReactRuntimeInitOptions,
)

/**
 * 低代码类型 React 运行时渲染器
 */
export const LcTypesReactRuntimeRenderer = createRenderer(
  initLcTypesReactRuntime,
)
