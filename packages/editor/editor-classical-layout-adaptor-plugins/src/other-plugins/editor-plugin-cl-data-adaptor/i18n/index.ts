import type { I18nResource } from '@p-lc/shared'
import { EN_US, ZH_CN } from '@p-lc/shared'
import { editorPluginClDataAdaptorI18nEnUs } from './en-us'
import { editorPluginClDataAdaptorI18nZhCn } from './zh-cn'

export * from './en-us'
export * from './keys'
export * from './types'
export * from './zh-cn'

/**
 * 编辑器经典布局数据适配器插件国际化资源
 */
export const editorPluginClDataAdaptorI18n = {
  [EN_US]: editorPluginClDataAdaptorI18nEnUs,
  [ZH_CN]: editorPluginClDataAdaptorI18nZhCn,
} satisfies I18nResource
