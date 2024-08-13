import { defineLazyInitProperty } from '@p-lc/shared'
import { isArray } from 'lodash-uni'
import type {
  AnyRuntimePlugin,
  Controller,
  DepPluginUniteRuntimePlugin,
  RuntimeRawPlugin,
} from '../types'
import { type runtimePluginEvalExpression } from './runtime-plugin-eval-expression'
import { type runtimePluginUidl } from './runtime-plugin-uidl'

/**
 * 运行时列表渲染插件属性扩展
 */
export interface RuntimePluginForPropertiesExt {
  controller: {
    /**
     * for 表达式的值
     */
    for?: LoopOrigin
  }
}

/**
 * 循环源
 */
export interface LoopOrigin<T = unknown> {
  /**
   * 所有项
   */
  items: T[]
  /**
   * 键值（字段）
   */
  key?: string
}

/**
 * for 表达式的原始值
 */
export type ForExpressionRawValue =
  | Partial<LoopOrigin>
  | LoopOrigin['items']
  | null
  | undefined

/**
 * 原始的初始化 for 表达式
 * @param ctx 上下文，控制器
 */
function rawInitForExpression(
  ctx: Controller<DepPluginUniteRuntimePlugin<typeof runtimePluginFor>>,
): LoopOrigin | undefined {
  const {
    uidlElement: { for: forExpr },
  } = ctx
  const rawRet =
    forExpr &&
    (ctx.evalExpression(forExpr, {
      relativeJsonPath: ['for'],
      relativeLogicPath: ['for'],
      silent: true,
    }) as ForExpressionRawValue)
  if (!rawRet) return
  if (isArray(rawRet)) {
    return {
      items: rawRet,
    }
  }
  if (!rawRet.items) return
  return rawRet as LoopOrigin
}

/**
 * 初始化 for 表达式
 * @param ctx 上下文，控制器
 */
export const initForExpression = rawInitForExpression as unknown as <
  Plugin extends AnyRuntimePlugin,
>(
  ctx: Controller<Plugin>,
) => LoopOrigin | undefined

/**
 * 运行时列表渲染插件
 */
export const runtimePluginFor: RuntimeRawPlugin<
  RuntimePluginForPropertiesExt,
  typeof runtimePluginUidl | typeof runtimePluginEvalExpression
> = {
  id: 'for',
  initController(ctx) {
    defineLazyInitProperty(ctx, 'for', () => initForExpression(ctx))
  },
}
