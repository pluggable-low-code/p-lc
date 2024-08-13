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
import type { Component, DefineComponent } from 'vue'

/**
 * 运行时 Vue 渲染器高阶组件插件属性扩展高等类型
 */
export interface RuntimePluginVueRendererHocsPropertiesExtHkt<
  Plugin extends AnyRuntimePlugin,
> {
  runtime: {
    /**
     * 渲染器高阶组件
     */
    rendererHocs: VueRendererHocs<Plugin>
  }
}

/**
 * Vue 渲染器高阶组件
 */
export interface VueRendererHocs<Plugin extends AnyRuntimePlugin> {
  /**
   * 运行时（高阶组件条目），id -> 条目
   */
  runtime: Record<string, RuntimeVueRendererHocItem<Plugin>>
  /**
   * 控制器（高阶组件条目），id -> 条目
   */
  controller: Record<string, ControllerVueRendererHocItem<Plugin>>
  /**
   * 元素（高阶组件），id -> 条目
   */
  element: Record<string, ElementVueRendererHocItem<Plugin>>
}

/**
 * 运行时 Vue 渲染器高阶组件条目
 */
export interface RuntimeVueRendererHocItem<Plugin extends AnyRuntimePlugin> {
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
  hoc: RuntimeVueRendererHoc<Plugin>
}

/**
 * 运行时 Vue 渲染器高阶组件
 */
export type RuntimeVueRendererHoc<Plugin extends AnyRuntimePlugin> = EchoFn<
  | Component<VueRendererProps<Runtime<Plugin>>>
  | DefineComponent<
      VueRendererProps<Runtime<Plugin>>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any
    >
>

/**
 * 控制器 Vue 渲染器高阶组件条目
 */
export interface ControllerVueRendererHocItem<Plugin extends AnyRuntimePlugin> {
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
  hoc: ControllerVueRendererHoc<Plugin>
}

/**
 * 控制器 Vue 渲染器高阶组件
 */
export type ControllerVueRendererHoc<Plugin extends AnyRuntimePlugin> = EchoFn<
  | Component<VueRendererProps<Controller<Plugin>>>
  | DefineComponent<
      VueRendererProps<Controller<Plugin>>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any
    >
>

/**
 * 元素 Vue 渲染器高阶组件条目
 */
export interface ElementVueRendererHocItem<Plugin extends AnyRuntimePlugin> {
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
  hoc: ElementVueRendererHoc<Plugin>
}

/**
 * 元素 Vue 渲染器高阶组件
 */
export type ElementVueRendererHoc<Plugin extends AnyRuntimePlugin> = EchoFn<
  | Component<VueRendererProps<Element<Plugin>>>
  | DefineComponent<
      VueRendererProps<Element<Plugin>>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any
    >
>

/**
 * Vue 渲染器属性
 */
export interface VueRendererProps<T> {
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
 * RuntimePluginVueRendererHocsPropertiesExtHkt 辅助类型
 */
export interface $RuntimePluginVueRendererHocsPropertiesExtHkt
  extends RuntimeDefaultPropertiesExtHkt {
  type: RuntimePluginVueRendererHocsPropertiesExtHkt<
    RuntimeDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 运行时 Vue 渲染器高阶组件插件
 */
export const runtimePluginVueRendererHocs: RuntimePlugin<$RuntimePluginVueRendererHocsPropertiesExtHkt> =
  {
    id: 'vue-renderer-hocs',
    initRuntime(ctx) {
      ctx.rendererHocs = {
        runtime: {},
        controller: {},
        element: {},
      }
    },
  }
