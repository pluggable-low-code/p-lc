import { defineLazyInitProperty } from '@p-lc/shared'
import type { RuntimeRawPlugin } from '../types'
import { type runtimePluginParent } from './runtime-plugin-parent'

/**
 * 运行时循环插件属性扩展
 */
export interface RuntimePluginLoopPropertiesExt {
  context: {
    /**
     * 循环（数据）
     */
    loop?: Loop
  }
  contextInitOptions: {
    /**
     * 循环（数据）
     */
    loop?: InitLoop
  }
}

/**
 * 初始化循环（数据）
 */
export interface InitLoop<T = unknown> {
  /**
   * 循环项
   */
  item: T
  /**
   * 循环下标
   */
  index?: number
  /**
   * 所有项
   */
  items?: T[]
}

/**
 * 循环（数据）
 */
export interface Loop<T = unknown> extends InitLoop<T> {
  /**
   * 父循环
   */
  parent?: this
}

/**
 * 运行时循环插件
 */
export const runtimePluginLoop: RuntimeRawPlugin<
  RuntimePluginLoopPropertiesExt,
  typeof runtimePluginParent
> = {
  id: 'loop',
  initContext(ctx) {
    defineLazyInitProperty(ctx, 'loop', () => {
      const {
        initOptions: { loop: initLoop },
        parent,
      } = ctx
      let parentLoop: typeof parent.loop
      if (ctx !== parent) {
        parentLoop = parent.loop
      }
      if (!initLoop) {
        return parentLoop
      }
      const ret: Loop = { ...initLoop }
      if (parentLoop) ret.parent = parentLoop
      return ret
    })
  },
}
