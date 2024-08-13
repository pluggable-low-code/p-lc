import type { EditorRawPlugin } from '../../types'
import { type editorPluginRender } from '../editor-plugin-render'
import { Root } from './root'

export * from './root'

/**
 * 编辑器根宿主插件属性扩展
 */
export interface EditorPluginRootHostPropertiesExt {
  editor: {
    /**
     * 根宿主元素
     */
    elRoot: HTMLElement | null
  }
}

/**
 * 编辑器根宿主插件
 */
export const editorPluginRootHost: EditorRawPlugin<
  EditorPluginRootHostPropertiesExt,
  typeof editorPluginRender
> = {
  id: 'root-host',
  initEditor(ctx) {
    const { render: oldRender } = ctx
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ctx.render = () => <Root>{oldRender()}</Root>
  },
}
