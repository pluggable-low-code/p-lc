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
import type { ForwardedRef, ReactElement } from 'react'
import type { ReactRendererHocs } from '../runtime-plugin-react-renderer-hocs'
import { type runtimePluginReactRendererHocs } from '../runtime-plugin-react-renderer-hocs'
import { ControllerRenderer } from './controller-renderer'
import { ElementRenderer } from './element-renderer'
import type { RenderersReactContextValue } from './renderer-react-context'
import {
  RenderersReactContextConsumer,
  RenderersReactContextProvider,
} from './renderer-react-context'
import { RuntimeRenderer } from './runtime-renderer'

export * from './controller-renderer'
export * from './element-renderer'
export * from './renderer-react-context'
export * from './runtime-renderer'

/**
 * 运行时 React 渲染器插件属性扩展
 */
export interface RuntimePluginReactRendererPropertiesExt {
  runtime: {
    /**
     * 渲染
     */
    render(props?: UnknownObject, ref?: ForwardedRef<unknown>): ReactElement
  }
  controller: {
    /**
     * 渲染
     */
    render(props?: UnknownObject, ref?: ForwardedRef<unknown>): ReactElement
  }
  element: {
    /**
     * 渲染
     */
    render(props?: UnknownObject, ref?: ForwardedRef<unknown>): ReactElement
  }
}

/**
 * 运行时 React 渲染器插件
 */
export const runtimePluginReactRenderer: RuntimePlugin<
  RuntimePluginReactRendererPropertiesExt,
  typeof runtimePluginReactRendererHocs
> = {
  id: 'react-renderer',
  initRuntime(ctx) {
    const getRendererReactContextValue = once(() => {
      const rendererHocs =
        ctx.rendererHocs as ReactRendererHocs<RuntimeDefaultPlugin>
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
      } satisfies Required<RenderersReactContextValue>

      function getSortedHocs<
        T extends Record<string, { hoc: unknown; index?: number }>,
      >(items: T): T[string]['hoc'][] {
        return sortBy(items, ({ index = Infinity }) => -index).map(
          (item) => item.hoc,
        )
      }
    })
    ctx.render = ((props, ref) => {
      const key = props?.key as string | number | undefined
      const contextValue = getRendererReactContextValue()
      const { RuntimeRenderer: FinalRuntimeRenderer } = contextValue
      return (
        <RenderersReactContextProvider key={key} value={contextValue}>
          <FinalRuntimeRenderer
            {...props}
            ref={ref}
            __ctx__={ctx as DefaultRuntime}
          />
        </RenderersReactContextProvider>
      )
    }) as typeof ctx.render
  },
  initController(ctx) {
    // TODO: 处理父组件覆盖子组件 props 问题
    ctx.render = ((props, ref) => {
      const key = (props?.key as string | number | undefined) || ctx.key
      return (
        <RenderersReactContextConsumer key={key}>
          {({ ControllerRenderer: FinalControllerRenderer }) =>
            FinalControllerRenderer && (
              <FinalControllerRenderer
                {...props}
                ref={ref}
                __ctx__={ctx as DefaultController}
              />
            )
          }
        </RenderersReactContextConsumer>
      )
    }) as typeof ctx.render
  },
  initElement(ctx) {
    ctx.render = ((props, ref) => {
      const key = (props?.key as string | number | undefined) || ctx.key
      return (
        <RenderersReactContextConsumer key={key}>
          {({ ElementRenderer: FinalElementRenderer }) =>
            FinalElementRenderer && (
              <FinalElementRenderer
                {...props}
                ref={ref}
                __ctx__={ctx as DefaultElement}
              />
            )
          }
        </RenderersReactContextConsumer>
      )
    }) as typeof ctx.render
  },
}
