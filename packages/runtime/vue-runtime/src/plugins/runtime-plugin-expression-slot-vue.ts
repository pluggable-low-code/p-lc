import type { ExpressionEvaluator, RuntimePlugin } from '@p-lc/runtime'
import { CONTEXT_TYPE_ELEMENT } from '@p-lc/runtime'
import type { AnyFunction } from '@p-lc/shared'
import { jsonStringify } from '@p-lc/shared'
import type { UidlExpressionSlot } from '@p-lc/uidl'
import { EXPRESSION_TYPE_SLOT } from '@p-lc/uidl-utils'
import type { VueSlotRenderFn } from '@p-lc/vue-component-library-shared'
import { isObject } from 'lodash-uni'
import type { Slot } from 'vue'
import type { VueRuntimeController, VueRuntimePlugin } from '../types'

/**
 * 运行时 Vue 插槽表达式插件属性扩展
 */
export interface RuntimePluginExpressionSlotVuePropertiesExt {
  element: {
    /**
     * 插槽缓存，relativeLogicPath -> 缓存项
     */
    slotCache: Map<string, VueSlotCacheItem>
  }
}

/**
 * Vue 插槽表
 */
const vueSlotMap = new WeakMap<ReturnType<Slot> | AnyFunction, boolean>()

/**
 * 设置为 Vue 插槽
 * @param v 值
 */
export function makeVueSlot(v: ReturnType<Slot> | AnyFunction): void {
  vueSlotMap.set(v, true)
}

/**
 * 为 Vue 插槽
 * @param v 值
 */
export function isVueSlot(v: unknown): boolean {
  return isObject(v) && !!vueSlotMap.get(v as ReturnType<Slot> | AnyFunction)
}

/**
 * Vue 插槽表达式求值器
 */
export const vueSlotExpressionEvaluator: ExpressionEvaluator<
  UidlExpressionSlot,
  unknown,
  VueRuntimePlugin | typeof runtimePluginExpressionSlotVue
> = {
  type: EXPRESSION_TYPE_SLOT,
  eval(expr, ctx, { relativeLogicPath }) {
    if (ctx.type !== CONTEXT_TYPE_ELEMENT) {
      throw new Error(`Slot expressions can not eval in ${ctx.type} ctx.`)
    }
    const { slotCache } = ctx
    const cacheKey = jsonStringify(relativeLogicPath)
    let cacheItem = slotCache.get(cacheKey)
    if (!cacheItem) {
      const secondaryCache: Map<string, VueSlotSecondaryCacheItem> = new Map()
      const fn: VueSlotRenderFn = (
        {
          item: optionsItem,
          index: optionsIndex = 0,
          key: optionsKey = `${optionsIndex}`,
        } = { item: null, index: 0 },
      ) => {
        let secondaryItem = secondaryCache.get(optionsKey)
        if (!secondaryItem) {
          const controllers = expr.value.map((uidlElement) =>
            ctx.root.initController({
              parent: ctx,
              uidlElement,
              loop: expr.dynamic
                ? {
                    item: optionsItem,
                    index: optionsIndex,
                  }
                : undefined,
              key: `${uidlElement.id}|${optionsKey}`,
            }),
          ) as VueRuntimeController[]
          secondaryItem = {
            jsx: controllers.map((c) => c.render()),
            controllers,
          }
        }
        return secondaryItem.jsx
      }
      const exprRet = expr.dynamic ? fn : fn()
      makeVueSlot(exprRet)
      cacheItem = {
        exprRet,
        secondaryCache,
      }
      slotCache.set(cacheKey, cacheItem)
    }
    return cacheItem.exprRet
  },
}

/**
 * Vue 插槽缓存项
 */
export interface VueSlotCacheItem {
  /**
   * 表达式结果
   */
  exprRet: ReturnType<Slot> | AnyFunction
  /**
   * 次级缓存
   */
  secondaryCache: Map<string, VueSlotSecondaryCacheItem>
}

/**
 * Vue 插槽次级缓存项
 */
export interface VueSlotSecondaryCacheItem {
  /**
   * JSX 内容
   */
  jsx: ReturnType<Slot>
  /**
   * （动态创建的）控制器
   */
  controllers: VueRuntimeController[]
}

/**
 * 运行时 Vue 插槽表达式插件
 */
export const runtimePluginExpressionSlotVue: RuntimePlugin<RuntimePluginExpressionSlotVuePropertiesExt> =
  {
    id: 'expression-slot-vue',
    initRuntime(ctx) {
      ctx.addExpressionEvaluator(vueSlotExpressionEvaluator)
    },
    initElement(ctx) {
      ctx.slotCache = new Map()
      return () => {
        for (const { secondaryCache } of ctx.slotCache.values()) {
          for (const { controllers } of secondaryCache.values()) {
            for (const c of controllers) {
              c.dispose()
            }
          }
        }
      }
    },
  }
