import { createContext, useContext } from 'react'
import { type ControllerRenderer } from './controller-renderer'
import { type ElementRenderer } from './element-renderer'
import { type RuntimeRenderer } from './runtime-renderer'

/**
 * 渲染器 React 上下文值
 */
export interface RenderersReactContextValue {
  /**
   * 运行时渲染器
   */
  RuntimeRenderer?: typeof RuntimeRenderer
  /**
   * 控制器渲染器
   */
  ControllerRenderer?: typeof ControllerRenderer
  /**
   * 元素渲染器
   */
  ElementRenderer?: typeof ElementRenderer
}

/**
 * 渲染器 React 上下文
 */
const RenderersReactContext = createContext<RenderersReactContextValue>({})

/**
 * 渲染器 React 上下文提供者
 */
export const RenderersReactContextProvider = RenderersReactContext.Provider

/**
 * 渲染器 React 上下文消费者
 */
export const RenderersReactContextConsumer = RenderersReactContext.Consumer

/**
 * 使用渲染器
 */
export function useRenderers(): RenderersReactContextValue {
  return useContext(RenderersReactContext)
}
