import type {
  AnyRuntimePlugin,
  Runtime,
  RuntimeDefaultPropertiesExtHkt,
  RuntimeDefaultPropertiesExtHktPlugin,
  RuntimePlugin,
} from '@p-lc/runtime'
import type { ForceToObject, LiteralObject } from '@p-lc/shared'
import type { Emitter } from 'mitt'
import mitt from 'mitt'
import type { Get } from 'type-fest'

/**
 * 运行时发射器插件属性扩展高等类型
 */
export interface RuntimePluginEmitterPropertiesExtHkt<
  Plugin extends AnyRuntimePlugin,
> {
  runtime: {
    /**
     * 发射器事件，由其他插件扩展，只用于类型推导
     */
    emitterEvents: LiteralObject
    /**
     * 发射器
     */
    emitter: Emitter<ForceToObject<Get<Runtime<Plugin>, ['emitterEvents']>>>
  }
}

/**
 * RuntimePluginEmitterPropertiesExtHkt 辅助类型
 */
export interface $RuntimePluginEmitterPropertiesExtHkt
  extends RuntimeDefaultPropertiesExtHkt {
  type: RuntimePluginEmitterPropertiesExtHkt<
    RuntimeDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 运行时发射器插件
 */
export const runtimePluginEmitter: RuntimePlugin<$RuntimePluginEmitterPropertiesExtHkt> =
  {
    id: 'emitter',
    initRuntime(ctx) {
      ctx.emitter = mitt()
    },
  }
