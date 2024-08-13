import type { Promisable } from '@p-lc/shared'
import { promisableThen } from '@p-lc/shared'
import { action } from 'mobx'
import type {
  AnyEditorPlugin,
  EditorDefaultPropertiesExtHkt,
  EditorDefaultPropertiesExtHktPlugin,
  EditorRawPlugin,
} from '../../types'
import { type editorPluginEmitter } from '../editor-plugin-emitter'
import type { UidlStoreUidl } from './editor-plugin-uidl-store'
import { type editorPluginUidlStore } from './editor-plugin-uidl-store'
import {
  EDITOR_EVENT_KEY_UIDL,
  EDITOR_EVENT_UIDL_TYPE_INIT,
  type editorPluginUidlStoreEdit,
} from './editor-plugin-uidl-store-edit'

/**
 * 编辑器 UIDL 仓库初始化插件属性扩展高等类型
 */
export interface EditorPluginUidlStoreInitPropertiesExtHkt<
  Plugin extends AnyEditorPlugin,
> {
  editor: {
    /**
     * UIDL 仓库
     */
    uidlStore: {
      /**
       * 初始化
       * @param uidl UIDL
       */
      init: (uidl: UidlStoreUidl<Plugin>) => void
    }
  }
  editorInitOptions: {
    /**
     * UIDL 键值
     */
    uidlKey?: string
    /**
     * UIDL
     */
    uidl?: UidlStoreUidl<Plugin>
    /**
     * 加载 UIDL
     */
    loadUidl?: () => Promisable<UidlStoreUidl<Plugin>>
  }
}

/**
 * EditorPluginUidlStoreInitPropertiesExtHkt 辅助类型
 */
export interface $EditorPluginUidlStoreInitPropertiesExtHkt
  extends EditorDefaultPropertiesExtHkt {
  type: EditorPluginUidlStoreInitPropertiesExtHkt<
    EditorDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 编辑器 UIDL 仓库初始化插件
 */
export const editorPluginUidlStoreInit: EditorRawPlugin<
  $EditorPluginUidlStoreInitPropertiesExtHkt,
  | typeof editorPluginUidlStore
  | typeof editorPluginUidlStoreEdit
  | typeof editorPluginEmitter
> = {
  id: 'uidl-store-init',
  initEditor(ctx) {
    const {
      uidlStore,
      emitter,
      initOptions: {
        uidlKey: initUidlKey,
        uidl: initUidl,
        loadUidl: initLoadUidl,
      },
    } = ctx
    uidlStore.init = action((uidl) => {
      uidlStore.uidl = uidl
      emitter.emit(EDITOR_EVENT_KEY_UIDL, {
        type: EDITOR_EVENT_UIDL_TYPE_INIT,
        uidl,
        patchs: [],
      })
    })
    uidlStore.uidlKey = initUidlKey
    if (initUidl) uidlStore.init(initUidl)
    else if (initLoadUidl) {
      promisableThen(initLoadUidl(), uidlStore.init)
    }
  },
}
