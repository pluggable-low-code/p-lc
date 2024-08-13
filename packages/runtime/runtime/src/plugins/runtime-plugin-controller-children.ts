import type { AnyObject } from '@p-lc/shared'
import { defineLazyInitProperty, STR_CHILDREN } from '@p-lc/shared'
import { isBoolean, isNumber, isObject, isString } from 'lodash-uni'
import type {
  AnyRuntimePlugin,
  Controller,
  DepPluginUniteRuntimePlugin,
  Element,
  RuntimeDefaultPropertiesExtHkt,
  RuntimeDefaultPropertiesExtHktPlugin,
  RuntimeRawPlugin,
} from '../types'
import { type runtimePluginControllerChildrenLoopOrigin } from './runtime-plugin-controller-children-loop-origin'
import type { LoopOrigin } from './runtime-plugin-for'
import { type runtimePluginInitContext } from './runtime-plugin-init-context'
import { type runtimePluginKey } from './runtime-plugin-key'
import { type runtimePluginLoop } from './runtime-plugin-loop'
import { type runtimePluginParent } from './runtime-plugin-parent'
import { type runtimePluginUidl } from './runtime-plugin-uidl'

/**
 * 运行时控制器子（上下文）插件属性扩展高等类型
 */
export interface RuntimePluginControllerChildrenPropertiesExtHkt<
  Plugin extends AnyRuntimePlugin,
> {
  controller: {
    /**
     * 子上下文，控制器
     */
    children: Element<Plugin>[]
  }
}

/**
 * RuntimePluginControllerChildrenPropertiesExtHkt 辅助类型
 */
export interface $RuntimePluginControllerChildrenPropertiesExtHkt
  extends RuntimeDefaultPropertiesExtHkt {
  type: RuntimePluginControllerChildrenPropertiesExtHkt<
    RuntimeDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 原始的初始化控制器子（上下文）
 * @param ctx 上下文，控制器
 * @param loopOrigin 循环源
 */
function rawInitControllerChildren(
  ctx: Controller<
    DepPluginUniteRuntimePlugin<typeof runtimePluginControllerChildren>
  >,
  loopOrigin?: LoopOrigin,
): Element<
  DepPluginUniteRuntimePlugin<typeof runtimePluginControllerChildren>
>[] {
  const {
    root: { initElement },
    uidlElement,
  } = ctx
  if (!loopOrigin) {
    return [
      initElement({
        parent: ctx,
        uidlElement,
      }),
    ]
  }
  const { items, key } = loopOrigin
  return items.map((item, index) => {
    return initElement({
      key: getLoopItemKey(item, key) ?? `${index}`,
      parent: ctx,
      uidlElement,
      loop: {
        item,
        index,
        items,
      },
    })
  })
}

/**
 * 获取循环项键值
 * @param item 循环项
 * @param key 循环项键值的键值
 */
export function getLoopItemKey(
  item: unknown,
  key?: string,
): string | undefined {
  let k
  if (isString(item)) {
    k = item
  }
  if (isNumber(item) || isBoolean(item)) {
    k = `${item}`
  }
  if (isString(key) && isObject(item)) {
    const v = (item as AnyObject)[key]
    return getLoopItemKey(v)
  }
  return k
}

/**
 * 初始化控制器子（上下文）
 * @param ctx 上下文，控制器
 * @param loopOrigin 循环源
 */
export const initControllerChildren = rawInitControllerChildren as unknown as <
  Plugin extends AnyRuntimePlugin,
  T,
>(
  ctx: Controller<Plugin>,
  loopOrigin?: LoopOrigin<T>,
) => Element<Plugin>[]

/**
 * 运行时控制器子（上下文）插件
 */
export const runtimePluginControllerChildren: RuntimeRawPlugin<
  $RuntimePluginControllerChildrenPropertiesExtHkt,
  | typeof runtimePluginInitContext
  | typeof runtimePluginKey
  | typeof runtimePluginParent
  | typeof runtimePluginUidl
  | typeof runtimePluginLoop
  | typeof runtimePluginControllerChildrenLoopOrigin
> = {
  id: 'controller-children',
  initController(ctx) {
    const h = defineLazyInitProperty(ctx, STR_CHILDREN, () =>
      initControllerChildren(ctx, ctx.childrenLoopOrigin),
    )
    return () => h.current?.map((c) => c.dispose())
  },
}
