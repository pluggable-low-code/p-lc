import type { I18nResource } from '@p-lc/shared'
import { EN_US, ZH_CN } from '@p-lc/shared'
import { editorPluginUniToolbarStoreCopyPasteI18nEnUs } from './en-us'
import { editorPluginUniToolbarStoreCopyPasteI18nZhCn } from './zh-cn'

export * from './en-us'
export * from './keys'
export * from './types'
export * from './zh-cn'

/**
 * 编辑器通用工具栏仓库复制粘贴插件国际化资源
 */
export const editorPluginUniToolbarStoreCopyPasteI18n = {
  [EN_US]: editorPluginUniToolbarStoreCopyPasteI18nEnUs,
  [ZH_CN]: editorPluginUniToolbarStoreCopyPasteI18nZhCn,
} satisfies I18nResource
