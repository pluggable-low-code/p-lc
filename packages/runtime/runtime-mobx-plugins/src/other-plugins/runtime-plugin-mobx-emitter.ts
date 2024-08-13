import { type runtimePluginEmitter } from '@p-lc/runtime-emitter-plugins'
import { action, makeObservable } from 'mobx'

/**
 * 运行时 MobX 发射器插件
 */
export const runtimePluginMobxEmitter: typeof runtimePluginEmitter = {
  id: 'mobx-emitter',
  initRuntime(ctx) {
    makeObservable(ctx.emitter, {
      emit: action,
    })
  },
}
