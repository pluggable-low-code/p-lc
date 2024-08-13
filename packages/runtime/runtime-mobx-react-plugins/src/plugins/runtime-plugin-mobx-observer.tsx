import type {
  ControllerReactRendererHocItem,
  ElementReactRendererHocItem,
  ReactRuntimePlugin,
  RuntimeReactRendererHocItem,
} from '@p-lc/react-runtime'
import type { DepPluginUniteRuntimePlugin, RuntimePlugin } from '@p-lc/runtime'
import type { LiteralObject } from '@p-lc/shared'
import { observer } from 'mobx-react-lite'

/**
 * 运行时 MobX 观察者高阶组件条目
 */
export const runtimeMobxObserverHocItem: RuntimeReactRendererHocItem<
  DepPluginUniteRuntimePlugin<typeof runtimePluginMobxObserver>
> = {
  id: 'mobx-observer',
  index: 10,
  hoc: observer,
}

/**
 * 控制器 MobX 观察者高阶组件条目
 */
export const controllerMobxObserverHocItem =
  runtimeMobxObserverHocItem as unknown as ControllerReactRendererHocItem<
    DepPluginUniteRuntimePlugin<typeof runtimePluginMobxObserver>
  >

/**
 * 元素 MobX 观察者高阶组件条目
 */
export const elementMobxObserverHocItem =
  runtimeMobxObserverHocItem as unknown as ElementReactRendererHocItem<
    DepPluginUniteRuntimePlugin<typeof runtimePluginMobxObserver>
  >

/**
 * 运行时 MobX 观察者插件
 */
export const runtimePluginMobxObserver: RuntimePlugin<
  LiteralObject,
  ReactRuntimePlugin
> = {
  id: 'mobx-observer',
  initRuntime(ctx) {
    const { rendererHocs } = ctx
    rendererHocs.runtime[runtimeMobxObserverHocItem.id] =
      runtimeMobxObserverHocItem
    rendererHocs.controller[controllerMobxObserverHocItem.id] =
      controllerMobxObserverHocItem
    rendererHocs.element[elementMobxObserverHocItem.id] =
      elementMobxObserverHocItem
  },
}
