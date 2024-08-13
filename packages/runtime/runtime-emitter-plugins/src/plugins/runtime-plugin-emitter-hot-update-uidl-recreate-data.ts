import type { RuntimePlugin } from '@p-lc/runtime'
import type { UidlData, UidlExtData } from '@p-lc/uidl-ext-data'
import { type runtimePluginEmitter } from './runtime-plugin-emitter'
import {
  RUNTIME_EVENT_KEY_UIDL,
  type runtimePluginEmitterHotUpdateUidl,
} from './runtime-plugin-emitter-hot-update-uidl'

/**
 * 运行时发射器热更新 UIDL 重新创建数据插件属性扩展
 */
export interface RuntimePluginEmitterHotUpdateUidlRecreateDataPropertiesExt {
  runtime: {
    /**
     * UIDL
     */
    uidl: UidlExtData
    /**
     * 重新创建数据
     * @param data 数据
     */
    recreateData(data?: UidlData): void
  }
}

/**
 * 运行时发射器热更新 UIDL 重新创建数据插件
 */
export const runtimePluginEmitterHotUpdateUidlRecreateData: RuntimePlugin<
  RuntimePluginEmitterHotUpdateUidlRecreateDataPropertiesExt,
  typeof runtimePluginEmitterHotUpdateUidl | typeof runtimePluginEmitter
> = {
  id: 'emitter-huu-rd',
  initRuntime(ctx) {
    ctx.emitter.on(RUNTIME_EVENT_KEY_UIDL, ({ uidl }) => {
      if (process.env.NODE_ENV === 'development' && !ctx.recreateData) {
        console.warn(`Please set the recreateData function before call it.`)
      }
      ctx.recreateData?.(uidl.data)
    })
  },
}
