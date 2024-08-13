import type { EditorPlugin } from '@p-lc/editor'
import { editorPluginLayoutStore } from '@p-lc/editor'
import type { ClassicalLayoutEditorPlugin } from '@p-lc/editor-classical-layout-plugins'
import { ElementAttributes } from '@p-lc/editor-element-attributes-store-plugins'
import type { LiteralObject } from '@p-lc/shared'
import { merge } from 'lodash-uni'

/**
 * 编辑器经典布局元素属性适配器插件
 */
export const editorPluginClEaAdaptor: EditorPlugin<
  LiteralObject,
  ClassicalLayoutEditorPlugin
> = {
  id: 'cl-ea-adaptor',
  // 在 editorPluginLayoutStoreInit 之前，确保不会覆盖 initOptions
  position: {
    target: editorPluginLayoutStore,
  },
  initEditor(ctx) {
    const { layoutStore } = ctx
    merge(layoutStore.config, {
      right: {
        Content: ElementAttributes,
      },
    } satisfies typeof layoutStore.config)
  },
}
