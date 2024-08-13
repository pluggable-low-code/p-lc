import type { RuntimePlugin } from '@p-lc/runtime'
import { initForExpression, runtimePluginFor } from '@p-lc/runtime'
import { defineComputedProperty } from '@p-lc/shared'

/**
 * 运行时 MobX 列表渲染插件
 */
export const runtimePluginMobxFor: RuntimePlugin = {
  id: 'mobx-for',
  position: {
    target: runtimePluginFor,
  },
  replace: [runtimePluginFor],
  initController(ctx) {
    defineComputedProperty(ctx, 'for', () => initForExpression(ctx))
  },
}
