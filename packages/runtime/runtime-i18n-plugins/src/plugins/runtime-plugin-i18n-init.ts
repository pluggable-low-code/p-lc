import type { RuntimePlugin } from '@p-lc/runtime'
import { type runtimePluginI18n } from './runtime-plugin-i18n'

/**
 * 运行时国际化初始化插件属性扩展
 */
export interface RuntimePluginI18nInitPropertiesExt {
  runtimeInitOptions: {
    /**
     * （当前）语言
     */
    language?: string
  }
}

/**
 * 运行时国际化初始化插件
 */
export const runtimePluginI18nInit: RuntimePlugin<
  RuntimePluginI18nInitPropertiesExt,
  typeof runtimePluginI18n
> = {
  id: 'i18n-init',
  initRuntime(ctx) {
    const {
      initOptions: { language },
    } = ctx
    if (language) ctx.language = language
  },
}
