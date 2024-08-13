import type { I18nResource } from '@p-lc/shared'
import { EN_US, ZH_CN } from '@p-lc/shared'
import { editorPluginComponentLibraryStoreI18nEnUs } from './en-us'
import { editorPluginComponentLibraryStoreI18nZhCn } from './zh-cn'

export * from './en-us'
export * from './keys'
export * from './types'
export * from './zh-cn'

/**
 * 编辑器组件库仓库插件国际化资源
 */
export const editorPluginComponentLibraryStoreI18n = {
  [EN_US]: editorPluginComponentLibraryStoreI18nEnUs,
  [ZH_CN]: editorPluginComponentLibraryStoreI18nZhCn,
} satisfies I18nResource
