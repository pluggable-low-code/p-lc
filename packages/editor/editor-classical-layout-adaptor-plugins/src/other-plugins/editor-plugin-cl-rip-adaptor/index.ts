import type { EditorPlugin } from '@p-lc/editor'
import { editorPluginLayoutStoreInit } from '@p-lc/editor'
import type { ClassicalLayoutEditorPlugin } from '@p-lc/editor-classical-layout-plugins'
import { ReactInlinePreviewer } from '@p-lc/react-previewer'
import type { LiteralObject } from '@p-lc/shared'
import { POSITION_TYPE_BEFORE } from '@p-lc/shared'
import { merge } from 'lodash-uni'

/**
 * 编辑器经典布局 React 内联预览器适配器插件
 */
export const editorPluginClRipAdaptor: EditorPlugin<
  LiteralObject,
  ClassicalLayoutEditorPlugin
> = {
  id: 'cl-rip-adaptor',
  position: {
    type: POSITION_TYPE_BEFORE,
    target: editorPluginLayoutStoreInit,
  },
  initEditor(ctx) {
    const { layoutStore } = ctx
    merge(layoutStore.config, {
      body: {
        Content: ReactInlinePreviewer,
      },
    } satisfies typeof layoutStore.config)
  },
}
