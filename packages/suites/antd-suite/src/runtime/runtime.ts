import { createReactRuntime } from '@p-lc/react-runtime'
import { createRenderer, createRendererOwnerInit } from '@p-lc/react-shared'
import '@p-lc/runtime'
import { assign } from 'lodash-uni'
import { antdRuntimeInitOptions } from './init-options'
import { antdRuntimePlugins } from './plugins'
import type { AntdRuntime } from './types'

/**
 * 创建 antd 运行时
 */
export function createAntdRuntime(): AntdRuntime {
  const ret = createReactRuntime().use(...antdRuntimePlugins)
  if (process.env.NODE_ENV === 'development') {
    assign(window, {
      debugRuntime: ret,
    })
  }
  return ret
}

/**
 * （创建并）初始化 antd 运行时
 */
export const initAntdRuntime = createRendererOwnerInit(
  createAntdRuntime,
  antdRuntimeInitOptions,
)

/**
 * antd 运行时渲染器
 */
export const AntdRuntimeRenderer = createRenderer(initAntdRuntime)
