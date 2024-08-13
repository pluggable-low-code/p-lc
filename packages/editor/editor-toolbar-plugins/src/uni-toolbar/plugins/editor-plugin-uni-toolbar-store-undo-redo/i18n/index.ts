import type { I18nResource } from '@p-lc/shared'
import { EN_US, ZH_CN } from '@p-lc/shared'
import { editorPluginUniToolbarStoreUndoRedoI18nEnUs } from './en-us'
import { editorPluginUniToolbarStoreUndoRedoI18nZhCn } from './zh-cn'

export * from './en-us'
export * from './keys'
export * from './types'
export * from './zh-cn'

/**
 * 编辑器通用工具栏仓库撤销重做插件国际化资源
 */
export const editorPluginUniToolbarStoreUndoRedoI18n = {
  [EN_US]: editorPluginUniToolbarStoreUndoRedoI18nEnUs,
  [ZH_CN]: editorPluginUniToolbarStoreUndoRedoI18nZhCn,
} satisfies I18nResource
