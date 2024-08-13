import type {
  DepPluginUniteRuntimePlugin,
  Runtime,
  RuntimePlugin,
} from '@p-lc/runtime'
import type { GetInnerPopupContainer, GetPopupContainer } from '@p-lc/shared'
import {
  GetInnerPopupContainerContextProvider,
  GetPopupContainerContextProvider,
} from '@p-lc/vue-component-library-shared'
import { assign, pick } from 'lodash-uni'
import type { FunctionalComponent } from 'vue'
import type {
  RuntimeVueRendererHocItem,
  VueRendererProps,
} from './runtime-plugin-vue-renderer-hocs'
import { type runtimePluginVueRendererHocs } from './runtime-plugin-vue-renderer-hocs'

/**
 * 运行时 Vue 组件库上下文插件属性扩展
 */
export interface RuntimePluginVueClContextPropertiesExt {
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
 * Vue 组件库上下文高阶组件条目
 */
export const vueClContextsHocItem: RuntimeVueRendererHocItem<
  DepPluginUniteRuntimePlugin<typeof runtimePluginVueClContexts>
> = {
  id: 'vue-cl-contexts',
  index: 850,
  hoc(C) {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    return ((props, { slots }) => {
      const { __ctx__: ctx } = props
      const { getPopupContainer, getInnerPopupContainer } = ctx
      let jsx = (
        <C {...props}>
          {{
            ...slots,
          }}
        </C>
      )
      if (getInnerPopupContainer) {
        jsx = (
          <GetInnerPopupContainerContextProvider value={getInnerPopupContainer}>
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
    }) satisfies FunctionalComponent<
      VueRendererProps<
        Runtime<DepPluginUniteRuntimePlugin<typeof runtimePluginVueClContexts>>
      >
    >
  },
}

/**
 * 运行时 Vue 组件库上下文插件
 */
export const runtimePluginVueClContexts: RuntimePlugin<
  RuntimePluginVueClContextPropertiesExt,
  typeof runtimePluginVueRendererHocs
> = {
  id: 'vue-cl-contexts',
  initRuntime(ctx) {
    assign(
      ctx,
      pick(ctx.initOptions, 'getPopupContainer', 'getInnerPopupContainer'),
    )
    ctx.rendererHocs.runtime[vueClContextsHocItem.id] = vueClContextsHocItem
  },
}
