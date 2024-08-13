import { defineLazyInitProperty } from '@p-lc/shared'
import { isUndefined } from 'lodash-uni'
import type {
  AnyRuntimePlugin,
  Controller,
  DepPluginUniteRuntimePlugin,
  RuntimeRawPlugin,
} from '../types'
import { type runtimePluginEvalExpression } from './runtime-plugin-eval-expression'
import { type runtimePluginUidl } from './runtime-plugin-uidl'

/**
 * 运行时条件渲染插件属性扩展
 */
export interface RuntimePluginIfPropertiesExt {
  controller: {
    /**
     * if 表达式的值
     */
    if: boolean
  }
}

/**
 * 原始的初始化 if 表达式
 * @param ctx 上下文，控制器
 */
function rawInitIfExpression(
  ctx: Controller<DepPluginUniteRuntimePlugin<typeof runtimePluginIf>>,
): boolean {
  const {
    uidlElement: { if: ifExpr },
  } = ctx
  const ret =
    ifExpr &&
    ctx.evalExpression(ifExpr, {
      relativeJsonPath: ['if'],
      relativeLogicPath: ['if'],
      silent: true,
    })
  return isUndefined(ret) ? true : !!ret
}

/**
 * 初始化 if 表达式
 * @param ctx 上下文，控制器
 */
export const initIfExpression = rawInitIfExpression as unknown as <
  Plugin extends AnyRuntimePlugin,
>(
  ctx: Controller<Plugin>,
) => boolean

/**
 * 运行时条件渲染插件
 */
export const runtimePluginIf: RuntimeRawPlugin<
  RuntimePluginIfPropertiesExt,
  typeof runtimePluginUidl | typeof runtimePluginEvalExpression
> = {
  id: 'if',
  initController(ctx) {
    defineLazyInitProperty(ctx, 'if', () => initIfExpression(ctx))
  },
}
