import type { EditorPlugin } from '@p-lc/editor'
import { editorPluginLayoutStore } from '@p-lc/editor'
import type {
  ClassicalLayoutEditorPlugin,
  ClassicalLayoutHeaderFooterItem,
} from '@p-lc/editor-classical-layout-plugins'
import { Logo } from '@p-lc/editor-logo-store-plugins'
import type { LiteralObject } from '@p-lc/shared'
import { POSITION_TYPE_LEFT } from '@p-lc/shared'
import { merge } from 'lodash-uni'

/**
 * 经典布局标识头部条目
 */
export const clLogoHeaderItem: ClassicalLayoutHeaderFooterItem = {
  id: 'logo',
  type: POSITION_TYPE_LEFT,
  index: 10,
  Component: Logo,
}

/**
 * 编辑器经典布局标识适配器插件
 */
export const editorPluginClLogoAdaptor: EditorPlugin<
  LiteralObject,
  ClassicalLayoutEditorPlugin
> = {
  id: 'cl-logo-adaptor',
  // 在 editorPluginLayoutStoreInit 之前，确保不会覆盖 initOptions
  position: {
    target: editorPluginLayoutStore,
  },
  initEditor(ctx) {
    const { layoutStore } = ctx
    merge(layoutStore.config, {
      header: {
        contentItems: {
          [clLogoHeaderItem.id]: clLogoHeaderItem,
        },
      },
    } satisfies typeof layoutStore.config)
  },
}
