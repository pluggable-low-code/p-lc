import {
  GetInnerPopupContainerContextProvider,
  GetPopupContainerContextProvider,
} from '@p-lc/react-component-library-shared'
import type { DepPluginUniteRuntimePlugin, RuntimePlugin } from '@p-lc/runtime'
import type { GetInnerPopupContainer, GetPopupContainer } from '@p-lc/shared'
import { assign, pick } from 'lodash-uni'
import { forwardRef, memo } from 'react'
import type { RuntimeReactRendererHocItem } from './runtime-plugin-react-renderer-hocs'
import { type runtimePluginReactRendererHocs } from './runtime-plugin-react-renderer-hocs'

/**
 * 运行时 React 组件库上下文插件属性扩展
 */
export interface RuntimePluginReactClContextPropertiesExt {
  runtime: {
    /**
     * 获取弹窗容器
     */
    getPopupContainer?: GetPopupContainer
    /**
     * 获取内部弹窗容器
     */
    getInnerPopupContainer?: GetInnerPopupContainer
  }
  runtimeInitOptions: {
    /**
     * 获取弹窗容器
     */
    getPopupContainer?: GetPopupContainer
    /**
     * 获取内部弹窗容器
     */
    getInnerPopupContainer?: GetInnerPopupContainer
  }
}

/**
 * React 组件库上下文高阶组件条目
 */
export const reactClContextsHocItem: RuntimeReactRendererHocItem<
  DepPluginUniteRuntimePlugin<typeof runtimePluginReactClContexts>
> = {
  id: 'react-cl-contexts',
  index: 850,
  hoc(C) {
    return memo(
      forwardRef((props, ref) => {
        const { __ctx__: ctx } = props
        const { getPopupContainer, getInnerPopupContainer } = ctx
        let jsx = <C {...props} ref={ref} />
        if (getInnerPopupContainer) {
          jsx = (
            <GetInnerPopupContainerContextProvider
              value={getInnerPopupContainer}
            >
              {jsx}
            </GetInnerPopupContainerContextProvider>
          )
        }
        if (getPopupContainer) {
          jsx = (
            <GetPopupContainerContextProvider value={getPopupContainer}>
              {jsx}
            </GetPopupContainerContextProvider>
          )
        }
        return jsx
      }),
    )
  },
}

/**
 * 运行时 React 组件库上下文插件
 */
export const runtimePluginReactClContexts: RuntimePlugin<
  RuntimePluginReactClContextPropertiesExt,
  typeof runtimePluginReactRendererHocs
> = {
  id: 'react-cl-contexts',
  initRuntime(ctx) {
    assign(
      ctx,
      pick(ctx.initOptions, 'getPopupContainer', 'getInnerPopupContainer'),
    )
    ctx.rendererHocs.runtime[reactClContextsHocItem.id] = reactClContextsHocItem
  },
}
