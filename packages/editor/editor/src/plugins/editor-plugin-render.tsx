import type { ReactElement } from 'react'
import type { EditorRawPlugin } from '../types'
import { type editorPluginLayoutStore } from './layout-store-plugins/editor-plugin-layout-store'

/**
 * 编辑器渲染插件属性扩展
 */
export interface EditorPluginRenderPropertiesExt {
  editor: {
    /**
     * 渲染
     */
    render: () => ReactElement
  }
}

/**
 * 编辑器渲染插件
 */
export const editorPluginRender: EditorRawPlugin<
  EditorPluginRenderPropertiesExt,
  typeof editorPluginLayoutStore
> = {
  id: 'render',
  initEditor(ctx) {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ctx.render = () => {
      return <>{ctx.layoutStore.render()}</>
    }
  },
}
