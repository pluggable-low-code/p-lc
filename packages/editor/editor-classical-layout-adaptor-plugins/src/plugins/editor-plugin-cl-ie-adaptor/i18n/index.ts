import type { I18nResource } from '@p-lc/shared'
import { EN_US, ZH_CN } from '@p-lc/shared'
import { editorPluginClIeAdaptorI18nEnUs } from './en-us'
import { editorPluginClIeAdaptorI18nZhCn } from './zh-cn'

export * from './en-us'
export * from './keys'
export * from './types'
export * from './zh-cn'

/**
 * 编辑器经典布局国际化编辑适配器插件国际化资源
 */
export const editorPluginClIeAdaptorI18n = {
  [EN_US]: editorPluginClIeAdaptorI18nEnUs,
  [ZH_CN]: editorPluginClIeAdaptorI18nZhCn,
} satisfies I18nResource
