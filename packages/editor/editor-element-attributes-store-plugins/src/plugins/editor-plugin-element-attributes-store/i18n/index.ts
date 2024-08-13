import type { I18nResource } from '@p-lc/shared'
import { EN_US, ZH_CN } from '@p-lc/shared'
import { editorPluginElementAttributesStoreI18nEnUs } from './en-us'
import { editorPluginElementAttributesStoreI18nZhCn } from './zh-cn'

export * from './en-us'
export * from './keys'
export * from './types'
export * from './zh-cn'

/**
 * 编辑器元素属性仓库插件国际化资源
 */
export const editorPluginElementAttributesStoreI18n = {
  [EN_US]: editorPluginElementAttributesStoreI18nEnUs,
  [ZH_CN]: editorPluginElementAttributesStoreI18nZhCn,
} satisfies I18nResource
