import { createRenderer, createRendererOwnerInit } from '@p-lc/react-shared'
import '@p-lc/runtime'
import { createVueRuntime } from '@p-lc/vue-runtime'
import { assign } from 'lodash-uni'
import type { ReactElement } from 'react'
import { createApp } from 'vue'
import { ravRuntimeInitOptions } from './init-options'
import type { RavVueRuntime } from './types'

/**
 * 创建 RAV Vue 运行时
 */
export function createRavVueRuntime(): RavVueRuntime {
  const ret = createVueRuntime()
  if (process.env.NODE_ENV === 'development') {
    assign(window, {
      debugRuntime: ret,
    })
  }
  return ret
}

type RavVueRuntimeProxy = Omit<RavVueRuntime, 'render'> & {
  init(...args: Parameters<RavVueRuntime['init']>): RavVueRuntimeProxy
  render(): ReactElement
}

/**
 * （创建并）初始化 RAV Vue 运行时
 */
const initRavReactRuntime = createRendererOwnerInit(() => {
  const runtime = createRavVueRuntime()
  let elRoot: HTMLElement | null = null
  return new Proxy(runtime, {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    get(...args) {
      const [, prop] = args
      if (prop === 'render') {
        return render
      }
      return Reflect.get(...args)
    },
  }) as RavVueRuntimeProxy

  function render(): ReactElement {
    return <div ref={ref} />
  }
  function ref(el: HTMLElement | null): void {
    if (!el || el === elRoot) return
    createApp(() => runtime.render()).mount((elRoot = el))
  }
}, ravRuntimeInitOptions)

/**
 * RAV Vue 运行时渲染器
 */
export const RavVueRuntimeRenderer = createRenderer(initRavReactRuntime)
