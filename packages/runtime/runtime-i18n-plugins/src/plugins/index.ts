import { runtimePluginI18n } from './runtime-plugin-i18n'
import { runtimePluginI18nInit } from './runtime-plugin-i18n-init'

export * from './runtime-plugin-i18n'
export * from './runtime-plugin-i18n-init'

/**
 * 运行时国际化插件
 */
export const runtimeI18nPlugins = [runtimePluginI18n, runtimePluginI18nInit]
