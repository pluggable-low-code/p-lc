import { promisableThen } from '@p-lc/shared'
import { type editorPluginLayoutStore } from './editor-plugin-layout-store'

/**
 * 编辑器布局仓库加载状态插件
 */
export const editorPluginLayoutStoreLoadState: typeof editorPluginLayoutStore =
  {
    id: 'layout-store-load-state',
    initEditor(ctx) {
      const { layoutStore } = ctx
      promisableThen(
        layoutStore.stateLoader?.load(),
        (ret) => ret && layoutStore.setState(ret, false),
      )
      promisableThen(
        layoutStore.uidlStateLoader?.load(),
        (ret) => ret && layoutStore.setUidlState(ret, false),
      )
    },
  }
