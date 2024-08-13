import type { I18nResource } from '@p-lc/shared'
import { EN_US, ZH_CN } from '@p-lc/shared'
import { editorPluginSaveAsInitialValueI18nEnUs } from './en-us'
import { editorPluginSaveAsInitialValueI18nZhCn } from './zh-cn'

export * from './en-us'
export * from './keys'
export * from './types'
export * from './zh-cn'

/**
 * 编辑器另存为初始值插件国际化资源
 */
export const editorPluginSaveAsInitialValueI18n = {
  [EN_US]: editorPluginSaveAsInitialValueI18nEnUs,
  [ZH_CN]: editorPluginSaveAsInitialValueI18nZhCn,
} satisfies I18nResource
