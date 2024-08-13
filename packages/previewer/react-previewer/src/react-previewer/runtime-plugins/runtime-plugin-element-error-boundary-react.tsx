import { type runtimePluginI18nStrings } from '@p-lc/previewer'
import type {
  ElementReactRendererHocItem,
  ReactRuntimePlugin,
} from '@p-lc/react-runtime'
import type { DepPluginUniteRuntimePlugin, RuntimePlugin } from '@p-lc/runtime'
import type { VoidFn } from '@p-lc/shared'
import { jsonStringify } from '@p-lc/shared'
import { noop } from 'lodash-uni'
import { createContext, forwardRef, memo, useContext } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

/**
 * 运行时 React 元素错误边界插件属性扩展
 */
export interface RuntimePluginElementErrorBoundaryReactPropertiesExt {
  runtime: {
    /**
     * 国际化字符串
     */
    i18nStrings: {
      /**
       * 元素出错了
       */
      somethingWentWrongInTheElement: string
    }
  }
}

/**
 * 内部：错误边界重置上下文
 */
export const InternalErrorBoundaryResetContext = createContext<VoidFn>(noop)

/**
 * 内部：错误边界重置上下文提供者
 */
export const InternalErrorBoundaryResetContextProvider =
  InternalErrorBoundaryResetContext.Provider

/**
 * 内部：错误边界重置上下文消费者
 */
export const InternalErrorBoundaryResetContextConsumer =
  InternalErrorBoundaryResetContext.Consumer

/**
 * 使用内部：错误边界重置
 */
export function useInternalErrorBoundaryReset(): VoidFn {
  return useContext(InternalErrorBoundaryResetContext)
}

/**
 * React 元素错误边界高阶组件条目
 */
export const elementErrorBoundaryReactHocItem: ElementReactRendererHocItem<
  DepPluginUniteRuntimePlugin<typeof runtimePluginElementErrorBoundaryReact>
> = {
  id: 'eeb-react',
  index: 940,
  hoc(C) {
    return memo(
      forwardRef((props, ref) => {
        const { __ctx__: ctx } = props
        const { uidlElement } = ctx
        const onReset = useInternalErrorBoundaryReset()
        return (
          <ErrorBoundary
            fallback={
              <div>
                {ctx.root.i18nStrings.somethingWentWrongInTheElement} (
                {jsonStringify({
                  id: uidlElement.id,
                  type: uidlElement.type,
                })}
                )
              </div>
            }
            resetKeys={[ctx]}
            onReset={onReset}
          >
            <C {...props} ref={ref} />
          </ErrorBoundary>
        )
      }),
    )
  },
}

/**
 * 运行时 React 元素错误边界插件
 */
export const runtimePluginElementErrorBoundaryReact: RuntimePlugin<
  RuntimePluginElementErrorBoundaryReactPropertiesExt,
  ReactRuntimePlugin | typeof runtimePluginI18nStrings
> = {
  id: 'eeb-react',
  initRuntime(ctx) {
    ctx.rendererHocs.element[elementErrorBoundaryReactHocItem.id] =
      elementErrorBoundaryReactHocItem
  },
}
