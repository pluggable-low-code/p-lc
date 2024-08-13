import type { UnknownObject } from '@p-lc/shared'
import { STR_PROPS, defineLazyInitProperty } from '@p-lc/shared'
import type {
  AnyRuntimePlugin,
  DepPluginUniteRuntimePlugin,
  Element,
  RuntimeRawPlugin,
} from '../types'
import { type runtimePluginEvalExpression } from './runtime-plugin-eval-expression'
import { type runtimePluginUidl } from './runtime-plugin-uidl'

/**
 * 运行时属性插件属性扩展
 */
export interface RuntimePluginPropsPropertiesExt {
  element: {
    /**
     * 属性
     */
    props: UnknownObject
  }
}

/**
 * 原始的求值属性
 * @param ctx 上下文，元素
 */
function rawEvalProps(
  ctx: Element<DepPluginUniteRuntimePlugin<typeof runtimePluginProps>>,
): UnknownObject {
  const props: typeof ctx.props = {}
  const {
    uidlElement: { props: uidlProps = {} },
  } = ctx
  for (const key in uidlProps) {
    props[key] = ctx.evalExpression(uidlProps[key], {
      relativeJsonPath: [STR_PROPS, key],
      relativeLogicPath: [STR_PROPS, key],
      silent: true,
    })
  }
  return props
}

/**
 * 求值属性
 * @param ctx 上下文，元素
 */
export const evalProps = rawEvalProps as <Plugin extends AnyRuntimePlugin>(
  ctx: Element<Plugin>,
) => UnknownObject

/**
 * 运行时属性插件
 */
export const runtimePluginProps: RuntimeRawPlugin<
  RuntimePluginPropsPropertiesExt,
  typeof runtimePluginUidl | typeof runtimePluginEvalExpression
> = {
  id: STR_PROPS,
  initElement(ctx) {
    defineLazyInitProperty(ctx, STR_PROPS, () => evalProps(ctx))
  },
}
