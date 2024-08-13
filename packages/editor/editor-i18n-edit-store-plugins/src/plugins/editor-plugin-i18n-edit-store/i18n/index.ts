import type { I18nResource } from '@p-lc/shared'
import { EN_US, ZH_CN } from '@p-lc/shared'
import { editorPluginI18nEditStoreI18nEnUs } from './en-us'
import { editorPluginI18nEditStoreI18nZhCn } from './zh-cn'

export * from './en-us'
export * from './keys'
export * from './types'
export * from './zh-cn'

/**
 * 编辑器国际化编辑仓库插件国际化资源
 */
export const editorPluginI18nEditStoreI18n = {
  [EN_US]: editorPluginI18nEditStoreI18nEnUs,
  [ZH_CN]: editorPluginI18nEditStoreI18nZhCn,
} satisfies I18nResource
