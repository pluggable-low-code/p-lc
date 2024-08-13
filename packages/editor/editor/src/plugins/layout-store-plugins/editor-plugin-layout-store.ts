import type { DataLoader, LiteralObject } from '@p-lc/shared'
import { LocalStorageDataLoader, defineLazyInitProperty } from '@p-lc/shared'
import { assign, debounce } from 'lodash-uni'
import { action, observable } from 'mobx'
import type { ReactNode } from 'react'
import type { Get } from 'type-fest'
import type {
  AnyEditorPlugin,
  Editor,
  EditorDefaultPropertiesExtHkt,
  EditorDefaultPropertiesExtHktPlugin,
  EditorRawPlugin,
} from '../../types'
import { type editorPluginName } from '../editor-plugin-name'
import { type editorPluginUidlStore } from '../uidl-store-plugins'

/**
 * 编辑器布局仓库插件属性扩展高等类型
 */
export interface EditorPluginLayoutStorePropertiesExtHkt<
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
      config: LiteralObject
      /**
       * 状态
       */
      state: LiteralObject
      /**
       * 设置状态
       * @param state 状态
       * @param autoSave 自动保存，默认 true
       */
      setState: (
        state: Partial<LayoutStoreState<Plugin>>,
        autoSave?: boolean,
      ) => void
      /**
       * 状态加载器
       */
      stateLoader: LayoutStoreStateLoader<Plugin> | null
      /**
       * UIDL 状态
       */
      uidlState: LiteralObject
      /**
       * 设置 UIDL 状态
       * @param uidlState UIDL 状态
       * @param autoSave 自动保存，默认 true
       */
      setUidlState: (
        uidlState: Partial<LayoutStoreUidlState<Plugin>>,
        autoSave?: boolean,
      ) => void
      /**
       * UIDL 状态加载器
       */
      uidlStateLoader: LayoutStoreUidlStateLoader<Plugin> | null
      /**
       * 渲染布局，由其他插件实现
       */
      render: () => ReactNode
    }
  }
}

/**
 * 布局仓库状态
 */
export type LayoutStoreState<Plugin extends AnyEditorPlugin> = Get<
  Editor<Plugin>,
  ['layoutStore', 'state']
>

/**
 * 布局仓库状态加载器
 */
export type LayoutStoreStateLoader<Plugin extends AnyEditorPlugin> =
  DataLoader<LayoutStoreState<Plugin> | null>

/**
 * 布局仓库 UIDL 状态
 */
export type LayoutStoreUidlState<Plugin extends AnyEditorPlugin> = Get<
  Editor<Plugin>,
  ['layoutStore', 'uidlState']
>

/**
 * 布局仓库 UIDL 状态加载器
 */
export type LayoutStoreUidlStateLoader<Plugin extends AnyEditorPlugin> =
  DataLoader<LayoutStoreUidlState<Plugin> | null>

/**
 * EditorPluginLayoutStorePropertiesExtHkt 辅助类型
 */
export interface $EditorPluginLayoutStorePropertiesExtHkt
  extends EditorDefaultPropertiesExtHkt {
  type: EditorPluginLayoutStorePropertiesExtHkt<
    EditorDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 编辑器布局仓库插件
 */
export const editorPluginLayoutStore: EditorRawPlugin<
  $EditorPluginLayoutStorePropertiesExtHkt,
  typeof editorPluginName | typeof editorPluginUidlStore
> = {
  id: 'layout-store',
  initEditor(ctx) {
    const {
      name: editorName,
      uidlStore: { uidlKey },
    } = ctx
    const layoutStore = (ctx.layoutStore = {} as typeof ctx.layoutStore)
    layoutStore.config = {}
    layoutStore.state = observable({})
    defineLazyInitProperty(
      layoutStore,
      'stateLoader',
      () =>
        new LocalStorageDataLoader<LiteralObject | null>(
          `${editorName}:layout-state`,
          null,
        ),
    )
    const debounceSaveState = debounce(() => {
      layoutStore.stateLoader?.save(layoutStore.state)
    })
    layoutStore.setState = action(
      (state, autoSave = !!layoutStore.stateLoader) => {
        assign(layoutStore.state, state)
        if (autoSave) {
          debounceSaveState()
        }
      },
    )
    layoutStore.uidlState = observable({})
    defineLazyInitProperty(
      layoutStore,
      'uidlStateLoader',
      () =>
        new LocalStorageDataLoader<LiteralObject | null>(
          `${editorName}:layout-uidl-state:${uidlKey}`,
          null,
        ),
    )
    const debounceSaveUidlState = debounce(() => {
      layoutStore.uidlStateLoader?.save(layoutStore.uidlState)
    })
    layoutStore.setUidlState = action(
      (uidlState, autoSave = !!layoutStore.uidlStateLoader) => {
        assign(layoutStore.uidlState, uidlState)
        if (autoSave) {
          debounceSaveUidlState()
        }
      },
    )
  },
}
