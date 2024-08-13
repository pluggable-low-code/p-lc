import type { RuntimePlugin } from '@p-lc/runtime'
import { initView, runtimePluginView } from '@p-lc/runtime'
import { definePropertyByGetter } from '@p-lc/shared'
import { action, observable } from 'mobx'

/**
 * 运行时 MobX 视图插件属性扩展
 */
export interface RuntimePluginMobxViewPropertiesExt {
  runtime: {
    /**
     * 重新创建视图
     */
    recreateView(): void
  }
}

/**
 * 运行时 MobX 视图插件
 */
export const runtimePluginMobxView: RuntimePlugin<RuntimePluginMobxViewPropertiesExt> =
  {
    id: 'mobx-view',
    position: {
      target: runtimePluginView,
    },
    replace: [runtimePluginView],
    initRuntime(ctx) {
      const viewBox = observable.box<undefined | typeof ctx.view>(undefined, {
        deep: false,
      })
      const createView = action(() => {
        dispose()
        const view = initView(ctx)
        viewBox.set(view)
        return view
      })
      definePropertyByGetter(ctx, 'view', () => viewBox.get() || createView())
      ctx.recreateView = createView
      return dispose

      function dispose(): void {
        viewBox.get()?.dispose()
      }
    },
  }
