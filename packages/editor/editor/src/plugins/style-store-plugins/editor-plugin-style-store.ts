import type { AnyObject } from '@p-lc/shared'
import { assign } from 'lodash-uni'
import type { EditorRawPlugin } from '../../types'

/**
 * 编辑器样式仓库插件属性扩展
 */
export interface EditorPluginStyleStorePropertiesExt {
  editor: {
    /**
     * 样式仓库
     */
    styleStore: {
      /**
       * CSS 变量
       */
      cssVars: AnyObject
      /**
       * 设置 CSS 变量
       * @param cssVars CSS 变量
       */
      setCssVars(cssVars: AnyObject): void
    }
  }
}

/**
 * 编辑器样式仓库插件
 */
export const editorPluginStyleStore: EditorRawPlugin<EditorPluginStyleStorePropertiesExt> =
  {
    id: 'style-store',
    initEditor(ctx) {
      const styleStore = (ctx.styleStore = {} as typeof ctx.styleStore)
      styleStore.cssVars = {}
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      styleStore.setCssVars = (cssVars) => {
        assign(styleStore.cssVars, cssVars)
      }
    },
  }
