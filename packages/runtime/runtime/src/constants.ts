/**
 * 上下文类型：运行时
 */
export const CONTEXT_TYPE_RUNTIME = 'runtime'

/**
 * 上下文类型：控制器
 */
export const CONTEXT_TYPE_CONTROLLER = 'controller'

/**
 * 上下文类型：元素
 */
export const CONTEXT_TYPE_ELEMENT = 'element'

/**
 * 上下文类型：上下文
 */
export const CONTEXT_TYPE_CONTEXT = 'context'

/**
 * 运行时扩展键值
 */
export const runtimeExtKeys = [
  CONTEXT_TYPE_CONTEXT,
  CONTEXT_TYPE_RUNTIME,
] as const

/**
 * 控制器扩展键值
 */
export const controllerExtKeys = [
  CONTEXT_TYPE_CONTEXT,
  CONTEXT_TYPE_CONTROLLER,
] as const

/**
 * 元素扩展键值
 */
export const elementExtKeys = [
  CONTEXT_TYPE_CONTEXT,
  CONTEXT_TYPE_ELEMENT,
] as const
