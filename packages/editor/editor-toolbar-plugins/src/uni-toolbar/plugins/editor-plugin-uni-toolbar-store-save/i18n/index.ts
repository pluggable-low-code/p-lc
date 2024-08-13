import type { I18nResource } from '@p-lc/shared'
import { EN_US, ZH_CN } from '@p-lc/shared'
import { editorPluginUniToolbarStoreSaveI18nEnUs } from './en-us'
import { editorPluginUniToolbarStoreSaveI18nZhCn } from './zh-cn'

export * from './en-us'
export * from './keys'
export * from './types'
export * from './zh-cn'

/**
 * 编辑器通用工具栏仓库保存插件国际化资源
 */
export const editorPluginUniToolbarStoreSaveI18n = {
  [EN_US]: editorPluginUniToolbarStoreSaveI18nEnUs,
  [ZH_CN]: editorPluginUniToolbarStoreSaveI18nZhCn,
} satisfies I18nResource
