import type { I18nResource } from '@p-lc/shared'
import { EN_US, ZH_CN } from '@p-lc/shared'
import { editorPluginUniToolbarStoreDeleteElementI18nEnUs } from './en-us'
import { editorPluginUniToolbarStoreDeleteElementI18nZhCn } from './zh-cn'

export * from './en-us'
export * from './keys'
export * from './types'
export * from './zh-cn'

/**
 * 编辑器通用工具栏仓库删除元素插件国际化资源
 */
export const editorPluginUniToolbarStoreDeleteElementI18n = {
  [EN_US]: editorPluginUniToolbarStoreDeleteElementI18nEnUs,
  [ZH_CN]: editorPluginUniToolbarStoreDeleteElementI18nZhCn,
} satisfies I18nResource
