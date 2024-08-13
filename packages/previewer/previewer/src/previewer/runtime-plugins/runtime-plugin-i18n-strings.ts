import type {
  AnyRuntimePlugin,
  Runtime,
  RuntimeDefaultPropertiesExtHkt,
  RuntimeDefaultPropertiesExtHktPlugin,
  RuntimePlugin,
} from '@p-lc/runtime'
import type { LiteralObject } from '@p-lc/shared'
import type { Get } from 'type-fest'

/**
 * 运行时国际化字符串插件属性扩展高等类型
 */
export interface RuntimePluginI18nStringsPropertiesExtHkt<
  Plugin extends AnyRuntimePlugin,
> {
  runtime: {
    /**
     * 国际化字符串，已经翻译好的，由其他插件扩展
     */
    i18nStrings: LiteralObject
  }
  runtimeInitOptions: {
    /**
     * 国际化字符串，已经翻译好的
     */
    i18nStrings: Get<Runtime<Plugin>, ['i18nStrings']>
  }
}

/**
 * RuntimePluginI18nStringsPropertiesExtHkt 辅助类型
 */
export interface $RuntimePluginI18nStringsPropertiesExtHkt
  extends RuntimeDefaultPropertiesExtHkt {
  type: RuntimePluginI18nStringsPropertiesExtHkt<
    RuntimeDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 运行时国际化字符串插件
 */
export const runtimePluginI18nStrings: RuntimePlugin<$RuntimePluginI18nStringsPropertiesExtHkt> =
  {
    id: 'i18n-strings',
    initRuntime(ctx) {
      ctx.i18nStrings = ctx.initOptions.i18nStrings
    },
  }
