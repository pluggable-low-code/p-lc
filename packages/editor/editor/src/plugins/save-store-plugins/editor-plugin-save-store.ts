import type { Promisable } from '@p-lc/shared'
import { definePropertyByGetter } from '@p-lc/shared'
import { computed, makeObservable, observable, runInAction } from 'mobx'
import type {
  AnyEditorPlugin,
  Editor,
  EditorDefaultPropertiesExtHkt,
  EditorDefaultPropertiesExtHktPlugin,
  EditorRawPlugin,
} from '../../types'
import { type editorPluginEmitter } from '../editor-plugin-emitter'
import type { UidlStoreUidl } from '../uidl-store-plugins'
import {
  EDITOR_EVENT_KEY_UIDL,
  EDITOR_EVENT_UIDL_TYPE_INIT,
  type editorPluginUidlStore,
  type editorPluginUidlStoreEdit,
} from '../uidl-store-plugins'

/**
 * 编辑器保存仓库插件属性扩展
 */
export interface EditorPluginSaveStorePropertiesExtHkt<
  Plugin extends AnyEditorPlugin,
> {
  editor: {
    /**
     * 发射器事件
     */
    emitterEvents: {
      /**
       * 保存事件
       */
      save: {
        /**
         * UIDL
         */
        uidl: UidlStoreUidl<Plugin>
      }
    }
    /**
     * 保存仓库
     */
    saveStore: {
      /**
       * 已保存的 UIDL
       */
      savedUidl: UidlStoreUidl<Plugin> | null
      /**
       * 是可保存的
       */
      isSavable: boolean
      /**
       * 可保存检查，用于其他插件覆盖 isSavable 逻辑
       */
      checkSavable(): boolean
      /**
       * 正在保存
       */
      isSaving: boolean
      /**
       * 保存
       */
      save(): Promisable<void>
      /**
       * 保存事件
       * @param uidl UIDL
       * @param ctx 上下文，编辑器
       */
      onSave?(
        uidl: UidlStoreUidl<Plugin>,
        ctx: Editor<Plugin>,
      ): Promisable<void>
    }
  }
}

/**
 * 编辑器事件键值：保存
 */
export const EDITOR_EVENT_KEY_SAVE = 'save'

/**
 * EditorPluginSaveStorePropertiesExtHkt 辅助类型
 */
export interface $EditorPluginSaveStorePropertiesExtHkt
  extends EditorDefaultPropertiesExtHkt {
  type: EditorPluginSaveStorePropertiesExtHkt<
    EditorDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 编辑器保存仓库插件
 */
export const editorPluginSaveStore: EditorRawPlugin<
  $EditorPluginSaveStorePropertiesExtHkt,
  | typeof editorPluginEmitter
  | typeof editorPluginUidlStore
  | typeof editorPluginUidlStoreEdit
> = {
  id: 'save-store',
  initEditor(ctx) {
    const { emitter, uidlStore } = ctx
    const saveStore = (ctx.saveStore = {} as typeof ctx.saveStore)
    saveStore.savedUidl = uidlStore.uidl
    definePropertyByGetter(saveStore, 'isSavable', () =>
      saveStore.checkSavable(),
    )
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    saveStore.checkSavable = () => {
      return uidlStore.uidl !== saveStore.savedUidl
    }
    saveStore.isSaving = false
    saveStore.save = async (): Promise<void> => {
      const { uidl } = uidlStore
      if (!uidl || !saveStore.isSavable) return
      runInAction(() => {
        saveStore.savedUidl = uidl
        saveStore.isSaving = true
      })
      try {
        await saveStore.onSave?.(uidl, ctx)
        emitter.emit(EDITOR_EVENT_KEY_SAVE, { uidl })
      } finally {
        runInAction(() => {
          saveStore.isSaving = false
        })
      }
    }
    makeObservable(saveStore, {
      savedUidl: observable.ref,
      isSavable: computed,
      isSaving: observable,
    })
    emitter.on(EDITOR_EVENT_KEY_UIDL, ({ type: evType, uidl }) => {
      if (evType === EDITOR_EVENT_UIDL_TYPE_INIT) {
        saveStore.savedUidl = uidl
      }
    })
  },
}
