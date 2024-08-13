import type { SoftAs } from '@p-lc/shared'
import type { EditorUidl } from '@p-lc/uidl'
import type { ElementOfUidl } from '@p-lc/uidl-utils'
import { makeObservable, observable } from 'mobx'
import type { Get } from 'type-fest'
import type { AnyEditorPlugin, Editor, EditorRawPlugin } from '../../types'

/**
 * 编辑器 UIDL 仓库插件属性扩展
 */
export interface EditorPluginUidlStorePropertiesExt {
  editor: {
    /**
     * UIDL 仓库
     */
    uidlStore: {
      /**
       * UIDL 键值
       */
      uidlKey?: string
      /**
       * UIDL
       */
      uidl: EditorUidl | null
    }
  }
}

/**
 * UIDL 仓库 UIDL
 */
export type UidlStoreUidl<Plugin extends AnyEditorPlugin> = SoftAs<
  NonNullable<Get<Editor<Plugin>, ['uidlStore', 'uidl']>>,
  EditorUidl
>

/**
 * UIDL 仓库 UIDL 元素
 */
export type UidlStoreUidlElement<Plugin extends AnyEditorPlugin> =
  ElementOfUidl<UidlStoreUidl<Plugin>>

/**
 * 编辑器 UIDL 仓库插件
 */
export const editorPluginUidlStore: EditorRawPlugin<EditorPluginUidlStorePropertiesExt> =
  {
    id: 'uidl-store',
    initEditor(ctx) {
      const uidlStore = (ctx.uidlStore = {} as typeof ctx.uidlStore)
      uidlStore.uidl = null
      makeObservable(uidlStore, {
        uidl: observable.ref,
      })
    },
  }
