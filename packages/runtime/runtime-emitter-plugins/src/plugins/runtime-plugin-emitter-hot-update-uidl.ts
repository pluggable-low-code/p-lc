import type {
  AnyRuntimePlugin,
  RuntimeDefaultPropertiesExtHkt,
  RuntimeDefaultPropertiesExtHktPlugin,
  RuntimeFinalUidl,
  RuntimePlugin,
} from '@p-lc/runtime'
import { type runtimePluginEmitter } from './runtime-plugin-emitter'

/**
 * 运行时发射器热更新 UIDL 插件属性扩展高等类型
 */
export interface RuntimePluginEmitterHotUpdateUidlPropertiesExtHkt<
  Plugin extends AnyRuntimePlugin,
> {
  runtime: {
    /**
     * 发射器事件
     */
    emitterEvents: {
      /**
       * UIDL 变化事件，由其他插件触发
       */
      uidl: {
        /**
         * UIDL
         */
        uidl: RuntimeFinalUidl<Plugin>
      }
    }
  }
}

/**
 * 运行时事件键值：UIDL 变化
 */
export const RUNTIME_EVENT_KEY_UIDL = 'uidl'

/**
 * RuntimePluginEmitterHotUpdateUidlPropertiesExtHkt 辅助类型
 */
export interface $RuntimePluginEmitterHotUpdateUidlPropertiesExtHkt
  extends RuntimeDefaultPropertiesExtHkt {
  type: RuntimePluginEmitterHotUpdateUidlPropertiesExtHkt<
    RuntimeDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 运行时发射器热更新 UIDL 插件
 */
export const runtimePluginEmitterHotUpdateUidl: RuntimePlugin<
  $RuntimePluginEmitterHotUpdateUidlPropertiesExtHkt,
  typeof runtimePluginEmitter
> = {
  id: 'emitter-huu',
  initRuntime(ctx) {
    ctx.emitter.on(RUNTIME_EVENT_KEY_UIDL, ({ uidl }) => {
      ctx.uidl = uidl
    })
  },
}
