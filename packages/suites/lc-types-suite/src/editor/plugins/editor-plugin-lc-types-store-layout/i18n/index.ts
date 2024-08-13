import type { I18nResource } from '@p-lc/shared'
import { EN_US, ZH_CN } from '@p-lc/shared'
import { editorPluginLcTypesStoreLayoutI18nEnUs } from './en-us'
import { editorPluginLcTypesStoreLayoutI18nZhCn } from './zh-cn'

export * from './en-us'
export * from './keys'
export * from './types'
export * from './zh-cn'

/**
 * 编辑器低代码类型仓库布局插件国际化资源
 */
export const editorPluginLcTypesStoreLayoutI18n = {
  [EN_US]: editorPluginLcTypesStoreLayoutI18nEnUs,
  [ZH_CN]: editorPluginLcTypesStoreLayoutI18nZhCn,
} satisfies I18nResource
