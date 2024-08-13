import type {
  AnyRuntimePlugin,
  Controller,
  Element,
  Runtime,
  RuntimeDefaultPropertiesExtHkt,
  RuntimeDefaultPropertiesExtHktPlugin,
  RuntimePlugin,
} from '@p-lc/runtime'
import type { EchoFn } from '@p-lc/shared'
import type { FC } from 'react'

/**
 * 运行时 React 渲染器高阶组件插件属性扩展高等类型
 */
export interface RuntimePluginReactRendererHocsPropertiesExtHkt<
  Plugin extends AnyRuntimePlugin,
> {
  runtime: {
    /**
     * 渲染器高阶组件
     */
    rendererHocs: ReactRendererHocs<Plugin>
  }
}

/**
 * React 渲染器高阶组件
 */
export interface ReactRendererHocs<Plugin extends AnyRuntimePlugin> {
  /**
   * 运行时（高阶组件条目），id -> 条目
   */
  runtime: Record<string, RuntimeReactRendererHocItem<Plugin>>
  /**
   * 控制器（高阶组件条目），id -> 条目
   */
  controller: Record<string, ControllerReactRendererHocItem<Plugin>>
  /**
   * 元素（高阶组件），id -> 条目
   */
  element: Record<string, ElementReactRendererHocItem<Plugin>>
}

/**
 * 运行时 React 渲染器高阶组件条目
 */
export interface RuntimeReactRendererHocItem<Plugin extends AnyRuntimePlugin> {
  /**
   * 唯一标识
   */
  id: string
  /**
   * 下标，小的先执行，默认：Infinity
   */
  index?: number
  /**
   * 高阶组件
   */
  hoc: RuntimeReactRendererHoc<Plugin>
}

/**
 * 运行时 React 渲染器高阶组件
 */
export type RuntimeReactRendererHoc<Plugin extends AnyRuntimePlugin> = EchoFn<
  FC<ReactRendererProps<Runtime<Plugin>>>
>

/**
 * 控制器 React 渲染器高阶组件条目
 */
export interface ControllerReactRendererHocItem<
  Plugin extends AnyRuntimePlugin,
> {
  /**
   * 唯一标识
   */
  id: string
  /**
   * 下标，小的先执行，默认：Infinity
   */
  index?: number
  /**
   * 高阶组件
   */
  hoc: ControllerReactRendererHoc<Plugin>
}

/**
 * 控制器 React 渲染器高阶组件
 */
export type ControllerReactRendererHoc<Plugin extends AnyRuntimePlugin> =
  EchoFn<FC<ReactRendererProps<Controller<Plugin>>>>

/**
 * 元素 React 渲染器高阶组件条目
 */
export interface ElementReactRendererHocItem<Plugin extends AnyRuntimePlugin> {
  /**
   * 唯一标识
   */
  id: string
  /**
   * 下标，小的先执行，默认：Infinity
   */
  index?: number
  /**
   * 高阶组件
   */
  hoc: ElementReactRendererHoc<Plugin>
}

/**
 * 元素 React 渲染器高阶组件
 */
export type ElementReactRendererHoc<Plugin extends AnyRuntimePlugin> = EchoFn<
  FC<ReactRendererProps<Element<Plugin>>>
>

/**
 * React 渲染器属性
 */
export interface ReactRendererProps<T> {
  /**
   * 上下文
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __ctx__: T
  /**
   * 外界劫持属性，只透传，不理解
   */
  [key: string]: unknown
}

/**
 * RuntimePluginReactRendererHocsPropertiesExtHkt 辅助类型
 */
export interface $RuntimePluginReactRendererHocsPropertiesExtHkt
  extends RuntimeDefaultPropertiesExtHkt {
  type: RuntimePluginReactRendererHocsPropertiesExtHkt<
    RuntimeDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 运行时 React 渲染器高阶组件插件
 */
export const runtimePluginReactRendererHocs: RuntimePlugin<$RuntimePluginReactRendererHocsPropertiesExtHkt> =
  {
    id: 'react-renderer-hocs',
    initRuntime(ctx) {
      ctx.rendererHocs = {
        runtime: {},
        controller: {},
        element: {},
      }
    },
  }
