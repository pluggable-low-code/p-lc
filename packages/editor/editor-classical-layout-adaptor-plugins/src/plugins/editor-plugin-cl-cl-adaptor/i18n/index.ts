import type { I18nResource } from '@p-lc/shared'
import { EN_US, ZH_CN } from '@p-lc/shared'
import { editorPluginClClAdaptorI18nEnUs } from './en-us'
import { editorPluginClClAdaptorI18nZhCn } from './zh-cn'

export * from './en-us'
export * from './keys'
export * from './types'
export * from './zh-cn'

/**
 * 编辑器经典布局组件库适配器插件国际化资源
 */
export const editorPluginClClAdaptorI18n = {
  [EN_US]: editorPluginClClAdaptorI18nEnUs,
  [ZH_CN]: editorPluginClClAdaptorI18nZhCn,
} satisfies I18nResource
