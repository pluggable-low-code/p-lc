import type {
  AnyRuntimePlugin,
  RuntimeDefaultPropertiesExtHkt,
  RuntimeDefaultPropertiesExtHktPlugin,
  RuntimeFinalUidl,
  RuntimePlugin,
} from '@p-lc/runtime'
import type { UidlUtilsConfig } from '@p-lc/uidl-utils'

/**
 * 运行时低代码类型 UIDL 工具集配置插件属性扩展高等类型
 */
export interface RuntimePluginLcTypesUidlUtilsConfigPropertiesExtHkt<
  Plugin extends AnyRuntimePlugin,
> {
  runtime: {
    /**
     * UIDL 工具集配置
     */
    uidlUtilsConfig: UidlUtilsConfig<RuntimeFinalUidl<Plugin>>
  }
  runtimeInitOptions: {
    /**
     * UIDL 工具集配置
     */
    uidlUtilsConfig: UidlUtilsConfig<RuntimeFinalUidl<Plugin>>
  }
}

/**
 * RuntimePluginLcTypesUidlUtilsConfigPropertiesExtHkt 辅助类型
 */
export interface $RuntimePluginLcTypesUidlUtilsConfigPropertiesExtHkt
  extends RuntimeDefaultPropertiesExtHkt {
  type: RuntimePluginLcTypesUidlUtilsConfigPropertiesExtHkt<
    RuntimeDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 运行时低代码类型 UIDL 工具集配置插件
 */
export const runtimePluginLcTypesUidlUtilsConfig: RuntimePlugin<$RuntimePluginLcTypesUidlUtilsConfigPropertiesExtHkt> =
  {
    id: 'lc-types-uuc',
    initRuntime(ctx) {
      ctx.uidlUtilsConfig = ctx.initOptions.uidlUtilsConfig
    },
  }
