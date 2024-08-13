import {
  CONTEXT_TYPE_CONTROLLER,
  CONTEXT_TYPE_ELEMENT,
  CONTEXT_TYPE_RUNTIME,
  controllerExtKeys,
  elementExtKeys,
} from '../constants'
import type { RuntimeRawPlugin } from '../types'

/**
 * 上下文类型：运行时
 */
export type ContextTypeRuntime = typeof CONTEXT_TYPE_RUNTIME

/**
 * 上下文类型：控制器
 */
export type ContextTypeController = typeof CONTEXT_TYPE_CONTROLLER

/**
 * 上下文类型：元素
 */
export type ContextTypeElement = typeof CONTEXT_TYPE_ELEMENT

/**
 * 运行时上下文类型插件属性扩展
 */
export interface RuntimePluginContextTypePropertiesExt {
  runtime: {
    /**
     * 上下文类型
     */
    type: ContextTypeRuntime
  }
  controller: {
    /**
     * 上下文类型
     */
    type: ContextTypeController
  }
  element: {
    /**
     * 上下文类型
     */
    type: ContextTypeElement
  }
}

/**
 * 运行时上下文类型插件
 */
export const runtimePluginContextType: RuntimeRawPlugin<RuntimePluginContextTypePropertiesExt> =
  {
    id: 'context-type',
    initContext(ctx) {
      switch (ctx.extKeys) {
        case elementExtKeys: {
          ctx.type = CONTEXT_TYPE_ELEMENT
          break
        }
        case controllerExtKeys: {
          ctx.type = CONTEXT_TYPE_CONTROLLER
          break
        }
        default: {
          ctx.type = CONTEXT_TYPE_RUNTIME
          break
        }
      }
    },
  }
