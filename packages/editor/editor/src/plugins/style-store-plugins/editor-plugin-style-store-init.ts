import type { AnyObject } from '@p-lc/shared'
import { assign } from 'lodash-uni'
import type { EditorRawPlugin } from '../../types'
import { type editorPluginStyleStore } from './editor-plugin-style-store'

/**
 * 编辑器样式仓库初始化插件属性扩展
 */
export interface EditorPluginStyleStoreInitPropertiesExt {
  editorInitOptions: {
    /**
     * CSS 变量
     */
    cssVars?: AnyObject
  }
}

/**
 * 编辑器样式仓库初始化插件
 */
export const editorPluginStyleStoreInit: EditorRawPlugin<
  EditorPluginStyleStoreInitPropertiesExt,
  typeof editorPluginStyleStore
> = {
  id: 'style-store-init',
  initEditor(ctx) {
    const { styleStore } = ctx
    assign(styleStore.cssVars, ctx.initOptions.cssVars)
  },
}
