import type { I18nResource } from '@p-lc/shared'
import { EN_US, ZH_CN } from '@p-lc/shared'
import { editorPluginElementTreeStoreI18nEnUs } from './en-us'
import { editorPluginElementTreeStoreI18nZhCn } from './zh-cn'

export * from './en-us'
export * from './keys'
export * from './types'
export * from './zh-cn'

/**
 * 编辑器元素树仓库插件国际化资源
 */
export const editorPluginElementTreeStoreI18n = {
  [EN_US]: editorPluginElementTreeStoreI18nEnUs,
  [ZH_CN]: editorPluginElementTreeStoreI18nZhCn,
} satisfies I18nResource
