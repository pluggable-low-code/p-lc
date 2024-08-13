import type { I18nResource } from '@p-lc/shared'
import { EN_US, ZH_CN } from '@p-lc/shared'
import { editorPluginI18nBinderI18nEnUs } from './en-us'
import { editorPluginI18nBinderI18nZhCn } from './zh-cn'

export * from './en-us'
export * from './keys'
export * from './types'
export * from './zh-cn'

/**
 * 编辑器国际化绑定器插件国际化资源
 */
export const editorPluginI18nBinderI18n = {
  [EN_US]: editorPluginI18nBinderI18nEnUs,
  [ZH_CN]: editorPluginI18nBinderI18nZhCn,
} satisfies I18nResource
