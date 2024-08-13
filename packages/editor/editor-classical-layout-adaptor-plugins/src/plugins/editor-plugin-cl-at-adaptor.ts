import type { EditorPlugin } from '@p-lc/editor'
import { editorPluginLayoutStore } from '@p-lc/editor'
import type {
  ClassicalLayoutEditorPlugin,
  ClassicalLayoutHeaderFooterItem,
} from '@p-lc/editor-classical-layout-plugins'
import { ActionToolbar } from '@p-lc/editor-toolbar-plugins'
import type { LiteralObject } from '@p-lc/shared'
import { POSITION_TYPE_RIGHT } from '@p-lc/shared'
import { merge } from 'lodash-uni'

/**
 * 经典布局操作工具栏头部条目
 */
export const clAtHeaderItem: ClassicalLayoutHeaderFooterItem = {
  id: 'at',
  type: POSITION_TYPE_RIGHT,
  index: 10,
  Component: ActionToolbar,
}

/**
 * 编辑器经典布局操作工具栏适配器插件
 */
export const editorPluginClAtAdaptor: EditorPlugin<
  LiteralObject,
  ClassicalLayoutEditorPlugin
> = {
  id: 'cl-at-adaptor',
  // 在 editorPluginLayoutStoreInit 之前，确保不会覆盖 initOptions
  position: {
    target: editorPluginLayoutStore,
  },
  initEditor(ctx) {
    const { layoutStore } = ctx
    merge(layoutStore.config, {
      header: {
        contentItems: {
          [clAtHeaderItem.id]: clAtHeaderItem,
        },
      },
    } satisfies typeof layoutStore.config)
  },
}
