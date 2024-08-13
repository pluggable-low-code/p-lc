import type { ReactSlotRenderFn } from '@p-lc/react-component-library-shared'
import type { ExpressionEvaluator, RuntimePlugin } from '@p-lc/runtime'
import { CONTEXT_TYPE_ELEMENT } from '@p-lc/runtime'
import { jsonStringify } from '@p-lc/shared'
import type { UidlExpressionSlot } from '@p-lc/uidl'
import { EXPRESSION_TYPE_SLOT } from '@p-lc/uidl-utils'
import type { ReactNode } from 'react'
import type { ReactRuntimeController, ReactRuntimePlugin } from '../types'

/**
 * 运行时 React 插槽表达式插件属性扩展
 */
export interface RuntimePluginExpressionSlotReactPropertiesExt {
  element: {
    /**
     * 插槽缓存，relativeLogicPath -> 缓存项
     */
    slotCache: Map<string, ReactSlotCacheItem>
  }
}

/**
 * React 插槽表达式求值器
 */
export const reactSlotExpressionEvaluator: ExpressionEvaluator<
  UidlExpressionSlot,
  unknown,
  ReactRuntimePlugin | typeof runtimePluginExpressionSlotReact
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
      const secondaryCache: Map<string, ReactSlotSecondaryCacheItem> = new Map()
      const fn: ReactSlotRenderFn = (
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
          ) as ReactRuntimeController[]
          secondaryItem = {
            jsx: controllers.map((c) => c.render()),
            controllers,
          }
        }
        return secondaryItem.jsx
      }
      cacheItem = {
        exprRet: expr.dynamic ? fn : fn(),
        secondaryCache,
      }
      slotCache.set(cacheKey, cacheItem)
    }
    return cacheItem.exprRet
  },
}

/**
 * React 插槽缓存项
 */
export interface ReactSlotCacheItem {
  /**
   * 表达式结果
   */
  exprRet: unknown
  /**
   * 次级缓存
   */
  secondaryCache: Map<string, ReactSlotSecondaryCacheItem>
}

/**
 * React 插槽次级缓存项
 */
export interface ReactSlotSecondaryCacheItem {
  /**
   * JSX 内容
   */
  jsx: ReactNode
  /**
   * （动态创建的）控制器
   */
  controllers: ReactRuntimeController[]
}

/**
 * 运行时 React 插槽表达式插件
 */
export const runtimePluginExpressionSlotReact: RuntimePlugin<RuntimePluginExpressionSlotReactPropertiesExt> =
  {
    id: 'expression-slot-react',
    initRuntime(ctx) {
      ctx.addExpressionEvaluator(reactSlotExpressionEvaluator)
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
