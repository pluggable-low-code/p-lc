import { createContext } from '@p-lc/vue-component-library-shared'
import type ControllerRenderer from './controller-renderer.vue'
import type ElementRenderer from './element-renderer.vue'
import type RuntimeRenderer from './runtime-renderer.vue'

/**
 * 渲染器 Vue 上下文值
 */
export interface RendererVueContextValue {
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
 * 渲染器 Vue 上下文
 */
const RenderersVueContext = createContext<RendererVueContextValue>({})

/**
 * 渲染器 Vue 上下文提供者
 */
export const RenderersVueContextProvider = RenderersVueContext.ContextProvider

/**
 * 渲染器 Vue 上下文注入器
 */
export const RenderersVueContextInjector = RenderersVueContext.ContextInjector

/**
 * 使用渲染器
 */
export const useRenderers = RenderersVueContext.useContext
