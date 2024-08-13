import type {
  AnyRuntimePlugin,
  DepPluginUniteRuntimePlugin,
  Element,
  RuntimePlugin,
} from '@p-lc/runtime'
import { runtimePluginProps } from '@p-lc/runtime'
import type { UnknownObject } from '@p-lc/shared'
import {
  STR_PROPS,
  defineComputedProperty,
  defineLazyInitProperty,
} from '@p-lc/shared'

/**
 * 原始的 MobX 求值属性
 * @param ctx 上下文，元素
 */
function rawMobxEvalProps(
  ctx: Element<DepPluginUniteRuntimePlugin<typeof runtimePluginMobxProps>>,
): UnknownObject {
  const {
    uidlElement: { props: uidlProps = {} },
  } = ctx
  const props: typeof ctx.props = {}
  for (const key in uidlProps) {
    defineComputedProperty(
      props,
      key,
      () =>
        ctx.evalExpression(uidlProps[key], {
          relativeJsonPath: [STR_PROPS, key],
          relativeLogicPath: [STR_PROPS, key],
          silent: true,
        }),

      { enumerable: true },
    )
  }
  return props
}

/**
 * MobX 求值属性
 * @param ctx 上下文，元素
 */
export const mobxEvalProps = rawMobxEvalProps as <
  Plugin extends AnyRuntimePlugin,
>(
  ctx: Element<Plugin>,
) => UnknownObject

/**
 * 运行时 MobX 属性插件
 */
export const runtimePluginMobxProps: RuntimePlugin = {
  id: 'mobx-props',
  position: {
    target: runtimePluginProps,
  },
  replace: [runtimePluginProps],
  initElement(ctx) {
    defineLazyInitProperty(ctx, STR_PROPS, () => mobxEvalProps(ctx))
  },
}
