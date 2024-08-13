import type { I18nResource } from '@p-lc/shared'
import { EN_US, ZH_CN } from '@p-lc/shared'
import { editorPluginWrapAsBindableAttributeI18nEnUs } from './en-us'
import { editorPluginWrapAsBindableAttributeI18nZhCn } from './zh-cn'

export * from './en-us'
export * from './keys'
export * from './types'
export * from './zh-cn'

/**
 * 编辑器包装为可绑定属性插件国际化资源
 */
export const editorPluginWrapAsBindableAttributeI18n = {
  [EN_US]: editorPluginWrapAsBindableAttributeI18nEnUs,
  [ZH_CN]: editorPluginWrapAsBindableAttributeI18nZhCn,
} satisfies I18nResource
