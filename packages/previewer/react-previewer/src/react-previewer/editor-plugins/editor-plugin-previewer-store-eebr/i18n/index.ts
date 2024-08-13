import type { I18nResource } from '@p-lc/shared'
import { EN_US, ZH_CN } from '@p-lc/shared'
import { editorPluginPreviewerStoreEebrI18nEnUs } from './en-us'
import { editorPluginPreviewerStoreEebrI18nZhCn } from './zh-cn'

export * from './en-us'
export * from './keys'
export * from './types'
export * from './zh-cn'

/**
 * 编辑器预览器仓库 React 元素错误边界插件国际化资源
 */
export const editorPluginPreviewerStoreEebrI18n = {
  [EN_US]: editorPluginPreviewerStoreEebrI18nEnUs,
  [ZH_CN]: editorPluginPreviewerStoreEebrI18nZhCn,
} satisfies I18nResource
