import type { I18nResource } from '@p-lc/shared'
import { EN_US, ZH_CN } from '@p-lc/shared'
import { editorPluginUniToolbarStoreSelectI18nEnUs } from './en-us'
import { editorPluginUniToolbarStoreSelectI18nZhCn } from './zh-cn'

export * from './en-us'
export * from './keys'
export * from './types'
export * from './zh-cn'

/**
 * 编辑器通用工具栏仓库选择插件国际化资源
 */
export const editorPluginUniToolbarStoreSelectI18n = {
  [EN_US]: editorPluginUniToolbarStoreSelectI18nEnUs,
  [ZH_CN]: editorPluginUniToolbarStoreSelectI18nZhCn,
} satisfies I18nResource
