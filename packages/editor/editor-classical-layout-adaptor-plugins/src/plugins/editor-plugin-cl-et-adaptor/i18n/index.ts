import type { I18nResource } from '@p-lc/shared'
import { EN_US, ZH_CN } from '@p-lc/shared'
import { editorPluginClEtAdaptorI18nEnUs } from './en-us'
import { editorPluginClEtAdaptorI18nZhCn } from './zh-cn'

export * from './en-us'
export * from './keys'
export * from './types'
export * from './zh-cn'

/**
 * 编辑器经典布局元素树适配器插件国际化资源
 */
export const editorPluginClEtAdaptorI18n = {
  [EN_US]: editorPluginClEtAdaptorI18nEnUs,
  [ZH_CN]: editorPluginClEtAdaptorI18nZhCn,
} satisfies I18nResource
