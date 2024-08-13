import { defineLazyInitProperty } from '@p-lc/shared'
import { isNil, merge } from 'lodash-uni'
import type {
  AnyEditorPlugin,
  EditorDefaultPropertiesExtHkt,
  EditorDefaultPropertiesExtHktPlugin,
  EditorRawPlugin,
} from '../../types'
import type {
  LayoutStoreStateLoader,
  LayoutStoreUidlStateLoader,
} from './editor-plugin-layout-store'
import { type editorPluginLayoutStore } from './editor-plugin-layout-store'

/**
 * 编辑器布局仓库初始化插件属性扩展高等类型
 */
export interface EditorPluginLayoutStoreInitPropertiesExtHkt<
  Plugin extends AnyEditorPlugin,
> {
  editor: {
    /**
     * 布局仓库
     */
    layoutStore: {
      /**
       * 配置
       */
      config: {
        /**
         * 状态加载器，默认自动使用 localStorage 加载、保存，false 表示不需要自动保存
         */
        stateLoader?: LayoutStoreStateLoader<Plugin> | false
        /**
         * UIDL 状态加载器，默认自动使用 localStorage 加载、保存，false 表示不需要自动保存
         */
        uidlStateLoader?: LayoutStoreUidlStateLoader<Plugin> | false
      }
    }
  }
  editorInitOptions: {
    /**
     * 布局（配置）
     */
    layout?: {
      /**
       * 状态加载器，默认自动使用 localStorage 加载、保存，false 表示不需要自动保存
       */
      stateLoader?: LayoutStoreStateLoader<Plugin> | false
      /**
       * UIDL 状态加载器，默认自动使用 localStorage 加载、保存，false 表示不需要自动保存
       */
      uidlStateLoader?: LayoutStoreUidlStateLoader<Plugin> | false
    }
  }
}

/**
 * EditorPluginLayoutStoreInitPropertiesExtHkt 辅助类型
 */
export interface $EditorPluginLayoutStoreInitPropertiesExtHkt
  extends EditorDefaultPropertiesExtHkt {
  type: EditorPluginLayoutStoreInitPropertiesExtHkt<
    EditorDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 编辑器布局仓库初始化插件
 */
export const editorPluginLayoutStoreInit: EditorRawPlugin<
  $EditorPluginLayoutStoreInitPropertiesExtHkt,
  typeof editorPluginLayoutStore
> = {
  id: 'layout-store-init',
  initEditor(ctx) {
    const { layoutStore } = ctx
    const { stateLoader, uidlStateLoader } = merge(
      layoutStore.config,
      ctx.initOptions.layout,
    )
    if (!isNil(stateLoader)) {
      defineLazyInitProperty(
        layoutStore,
        'stateLoader',
        () => stateLoader || null,
      )
    }
    if (!isNil(uidlStateLoader)) {
      defineLazyInitProperty(
        layoutStore,
        'uidlStateLoader',
        () => uidlStateLoader || null,
      )
    }
  },
}
