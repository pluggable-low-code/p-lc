import type { RuntimeRawPlugin } from '../types'
import { type runtimePluginUidl } from './runtime-plugin-uidl'

/**
 * 运行时键值插件属性扩展
 */
export interface RuntimePluginKeyPropertiesExt {
  controller: {
    /**
     * 键值
     */
    key: string
  }
  contextInitOptions: {
    /**
     * 键值
     */
    key?: string
  }
  element: {
    /**
     * 键值
     */
    key: string
  }
  elementInitOptions: {
    /**
     * 键值
     */
    key?: string
  }
}

/**
 * 运行时键值插件
 */
export const runtimePluginKey: RuntimeRawPlugin<
  RuntimePluginKeyPropertiesExt,
  typeof runtimePluginUidl
> = {
  id: 'key',
  initController(ctx) {
    ctx.key = ctx.initOptions.key || ctx.uidlElement.id
  },
  initElement(ctx) {
    ctx.key = ctx.initOptions.key || ctx.uidlElement.id
  },
}
