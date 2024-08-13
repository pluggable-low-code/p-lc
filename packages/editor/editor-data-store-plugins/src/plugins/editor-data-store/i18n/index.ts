import type { I18nResource } from '@p-lc/shared'
import { EN_US, ZH_CN } from '@p-lc/shared'
import { editorPluginDataStoreI18nEnUs } from './en-us'
import { editorPluginDataStoreI18nZhCn } from './zh-cn'

export * from './en-us'
export * from './keys'
export * from './types'
export * from './zh-cn'

/**
 * 编辑器数据仓库插件国际化资源
 */
export const editorPluginDataStoreI18n = {
  [EN_US]: editorPluginDataStoreI18nEnUs,
  [ZH_CN]: editorPluginDataStoreI18nZhCn,
} satisfies I18nResource
