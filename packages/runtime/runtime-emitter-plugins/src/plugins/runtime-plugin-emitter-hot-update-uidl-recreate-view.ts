import type { RuntimePlugin } from '@p-lc/runtime'
import { type runtimePluginEmitter } from './runtime-plugin-emitter'
import {
  RUNTIME_EVENT_KEY_UIDL,
  type runtimePluginEmitterHotUpdateUidl,
} from './runtime-plugin-emitter-hot-update-uidl'

/**
 * 运行时发射器热更新 UIDL 重新创建视图插件属性扩展
 */
export interface RuntimePluginEmitterHotUpdateUidlRecreateViewPropertiesExt {
  runtime: {
    /**
     * 重新创建视图
     */
    recreateView?(): void
  }
}

/**
 * 运行时发射器热更新 UIDL 重新创建视图插件
 */
export const runtimePluginEmitterHotUpdateUidlRecreateView: RuntimePlugin<
  RuntimePluginEmitterHotUpdateUidlRecreateViewPropertiesExt,
  typeof runtimePluginEmitterHotUpdateUidl | typeof runtimePluginEmitter
> = {
  id: 'emitter-huu-rv',
  initRuntime(ctx) {
    ctx.emitter.on(RUNTIME_EVENT_KEY_UIDL, () => {
      if (process.env.NODE_ENV === 'development' && !ctx.recreateView) {
        console.warn(`Please set the recreateView function before call it.`)
      }
      ctx.recreateView?.()
    })
  },
}
