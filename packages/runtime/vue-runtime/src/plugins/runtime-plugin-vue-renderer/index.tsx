import type {
  DefaultController,
  DefaultElement,
  DefaultRuntime,
  RuntimeDefaultPlugin,
  RuntimePlugin,
} from '@p-lc/runtime'
import type { UnknownObject } from '@p-lc/shared'
import { reduceByFnsWithCache } from '@p-lc/shared'
import { once, sortBy } from 'lodash-uni'
import type { VNode } from 'vue'
import type { VueRendererHocs } from '../runtime-plugin-vue-renderer-hocs'
import { type runtimePluginVueRendererHocs } from '../runtime-plugin-vue-renderer-hocs'
import ControllerRenderer from './controller-renderer.vue'
import ElementRenderer from './element-renderer.vue'
import type { RendererVueContextValue } from './renderer-vue-context'
import {
  RenderersVueContextInjector,
  RenderersVueContextProvider,
} from './renderer-vue-context'
import RuntimeRenderer from './runtime-renderer.vue'

export { default as ControllerRenderer } from './controller-renderer.vue'
export { default as ElementRenderer } from './element-renderer.vue'
export * from './renderer-vue-context'
export { default as RuntimeRenderer } from './runtime-renderer.vue'

/**
 * 运行时 Vue 渲染器插件属性扩展
 */
export interface RuntimePluginVueRendererPropertiesExt {
  runtime: {
    /**
     * 渲染
     */
    render(props?: UnknownObject): VNode
  }
  controller: {
    /**
     * 渲染
     */
    render(props?: UnknownObject): VNode
  }
  element: {
    /**
     * 渲染
     */
    render(props?: UnknownObject): VNode
  }
}

/**
 * 运行时 Vue 渲染器插件
 */
export const runtimePluginVueRenderer: RuntimePlugin<
  RuntimePluginVueRendererPropertiesExt,
  typeof runtimePluginVueRendererHocs
> = {
  id: 'vue-renderer',
  initRuntime(ctx) {
    const getRendererVueContextValue = once(() => {
      const rendererHocs =
        ctx.rendererHocs as VueRendererHocs<RuntimeDefaultPlugin>
      return {
        RuntimeRenderer: reduceByFnsWithCache(
          getSortedHocs(rendererHocs.runtime),
          RuntimeRenderer,
        ),
        ControllerRenderer: reduceByFnsWithCache(
          getSortedHocs(rendererHocs.controller),
          ControllerRenderer,
        ),
        ElementRenderer: reduceByFnsWithCache(
          getSortedHocs(rendererHocs.element),
          ElementRenderer,
        ),
      }

      function getSortedHocs<
        T extends Record<string, { hoc: unknown; index?: number }>,
      >(items: T): T[string]['hoc'][] {
        return sortBy(items, ({ index = Infinity }) => -index).map(
          (item) => item.hoc,
        )
      }
    })
    ctx.render = ((props) => {
      const key = props?.key as string | number | undefined
      const contextValue = getRendererVueContextValue()
      const { RuntimeRenderer: FinalRuntimeRenderer } = contextValue
      return (
        <RenderersVueContextProvider key={key} value={contextValue}>
          <FinalRuntimeRenderer {...props} __ctx__={ctx as DefaultRuntime} />
        </RenderersVueContextProvider>
      )
    }) as typeof ctx.render
  },
  initController(ctx) {
    ctx.render = ((props) => {
      const key = (props?.key as string | number | undefined) || ctx.key
      return (
        <RenderersVueContextInjector key={key}>
          {({
            value: { ControllerRenderer: FinalControllerRenderer },
          }: {
            value: RendererVueContextValue
          }) =>
            FinalControllerRenderer && (
              <FinalControllerRenderer
                {...props}
                __ctx__={ctx as DefaultController}
              />
            )
          }
        </RenderersVueContextInjector>
      )
    }) as typeof ctx.render
  },
  initElement(ctx) {
    ctx.render = ((props) => {
      const key = (props?.key as string | number | undefined) || ctx.key
      return (
        <RenderersVueContextInjector key={key}>
          {({
            value: { ElementRenderer: FinalElementRenderer },
          }: {
            value: RendererVueContextValue
          }) =>
            FinalElementRenderer && (
              <FinalElementRenderer
                {...props}
                __ctx__={ctx as DefaultElement}
              />
            )
          }
        </RenderersVueContextInjector>
      )
    }) as typeof ctx.render
  },
}
