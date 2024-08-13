import type { EditorPlugin } from '@p-lc/editor'
import { editorPluginUidlUtilsConfig } from '@p-lc/editor'
import { lcTypesUidlUtilsConfig } from '@p-lc/lc-types-uidl-utils'
import { cloneDeep } from 'lodash-uni'

/**
 * 编辑器低代码类型 UIDL 工具集配置插件
 */
export const editorPluginLcTypesUidlUtilsConfig: EditorPlugin = {
  id: 'lc-types-uuc',
  position: {
    target: editorPluginUidlUtilsConfig,
  },
  replace: [editorPluginUidlUtilsConfig],
  initEditor(ctx) {
    ctx.uidlUtilsConfig = cloneDeep(
      lcTypesUidlUtilsConfig as unknown as typeof ctx.uidlUtilsConfig,
    )
  },
}
