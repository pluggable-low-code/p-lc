import type { RuntimePlugin } from '@p-lc/runtime'
import { initIfExpression, runtimePluginIf } from '@p-lc/runtime'
import { defineComputedProperty } from '@p-lc/shared'

/**
 * 运行时 MobX 条件渲染插件
 */
export const runtimePluginMobxIf: RuntimePlugin = {
  id: 'mobx-if',
  position: {
    target: runtimePluginIf,
  },
  replace: [runtimePluginIf],
  initController(ctx) {
    defineComputedProperty(ctx, 'if', () => initIfExpression(ctx))
  },
}
