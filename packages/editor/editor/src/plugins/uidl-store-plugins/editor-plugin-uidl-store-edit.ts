import type { UndoRedoListRecipe } from '@p-lc/shared'
import { definePropertyByGetter, UndoRedoList } from '@p-lc/shared'
import type { Patch } from 'immer'
import { action, makeObservable, observable } from 'mobx'
import type {
  AnyEditorPlugin,
  EditorDefaultPropertiesExtHkt,
  EditorDefaultPropertiesExtHktPlugin,
  EditorRawPlugin,
} from '../../types'
import { type editorPluginEmitter } from '../editor-plugin-emitter'
import type { UidlStoreUidl } from './editor-plugin-uidl-store'
import { type editorPluginUidlStore } from './editor-plugin-uidl-store'

/**
 * 编辑器 UIDL 仓库编辑插件属性扩展高等类型
 */
export interface EditorPluginUidlStoreEditPropertiesExtHkt<
  Plugin extends AnyEditorPlugin,
> {
  editor: {
    /**
     * 发射器事件
     */
    emitterEvents: {
      /**
       * UIDL 变化（初始化、更新）事件
       */
      uidl: {
        /**
         * 类型
         */
        type:
          | typeof EDITOR_EVENT_UIDL_TYPE_INIT
          | typeof EDITOR_EVENT_UIDL_TYPE_UPDATE
        /**
         * UIDL
         */
        uidl: UidlStoreUidl<Plugin>
        /**
         * 补丁
         */
        patchs: Patch[]
      }
      /**
       * UIDL 合成开始事件
       */
      uidlCompositionStart: {
        /**
         * UIDL
         */
        uidl: UidlStoreUidl<Plugin>
      }
      /**
       * UIDL 合成更新事件
       */
      uidlCompositionUpdate: {
        /**
         * UIDL 草稿
         */
        draft: UidlStoreUidl<Plugin>
        /**
         * UIDL
         */
        uidl: UidlStoreUidl<Plugin>
      }
      /**
       * UIDL 合成结束事件
       */
      uidlCompositionEnd: {
        /**
         * UIDL
         */
        uidl: UidlStoreUidl<Plugin>
      }
    }
    /**
     * UIDL 仓库
     */
    uidlStore: {
      /**
       * 最大撤销重做大小，最小 8，默认值：256
       */
      maxUndoRedoSize?: number
      /**
       * 是可撤销的
       */
      isUndoable: boolean
      /**
       * 是可重做的
       */
      isRedoable: boolean
      /**
       * 大小
       */
      size: number
      /**
       * 撤销重做列表
       */
      undoRedoList: UndoRedoList<NonNullable<UidlStoreUidl<Plugin>>>
      /**
       * 获取 UIDL，编辑中拿草稿，不存在就抛出异常
       */
      getUidlOrThrow: () => UidlStoreUidl<Plugin>
      /**
       * 草稿
       */
      draft: UidlStoreUidl<Plugin> | null
      /**
       * 正在编辑中
       */
      isEditing: boolean
      /**
       * 编辑（UIDL），支持嵌套调用
       * @param recipe 配方函数
       * @param recipeId 配方 ID
       */
      edit(
        recipe: UndoRedoListRecipe<UidlStoreUidl<Plugin>>,
        recipeId?: string | number | null,
      ): void
      /**
       * 撤销
       */
      undo(): void
      /**
       * 重做
       */
      redo(): void
    }
  }
  editorInitOptions: {
    /**
     * 最大撤销重做大小，最小 8，默认值：256
     */
    maxUndoRedoSize?: number
  }
}

/**
 * 编辑器事件键值：UIDL 变化
 */
export const EDITOR_EVENT_KEY_UIDL = 'uidl'

/**
 * 编辑器事件键值：UIDL 合成开始
 */
export const EDITOR_EVENT_KEY_UIDL_COMPOSITION_START = 'uidlCompositionStart'

/**
 * 编辑器事件键值：UIDL 合成更新
 */
export const EDITOR_EVENT_KEY_UIDL_COMPOSITION_UPDATE = 'uidlCompositionUpdate'

/**
 * 编辑器事件键值：UIDL 合成结束
 */
export const EDITOR_EVENT_KEY_UIDL_COMPOSITION_END = 'uidlCompositionEnd'

/**
 * 运行时 UIDL 变化事件类型：初始化
 */
export const EDITOR_EVENT_UIDL_TYPE_INIT = 'init'

/**
 * 运行时 UIDL 变化事件类型：更新
 */
export const EDITOR_EVENT_UIDL_TYPE_UPDATE = 'update'

/**
 * EditorPluginUidlStoreEditPropertiesExtHkt 辅助类型
 */
export interface $EditorPluginUidlStoreEditPropertiesExtHkt
  extends EditorDefaultPropertiesExtHkt {
  type: EditorPluginUidlStoreEditPropertiesExtHkt<
    EditorDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 编辑器 UIDL 仓库编辑插件
 */
export const editorPluginUidlStoreEdit: EditorRawPlugin<
  $EditorPluginUidlStoreEditPropertiesExtHkt,
  typeof editorPluginUidlStore | typeof editorPluginEmitter
> = {
  id: 'uidl-store-edit',
  initEditor(ctx) {
    const { uidlStore, emitter } = ctx
    uidlStore.maxUndoRedoSize = ctx.initOptions.maxUndoRedoSize
    const initUndoRedoState = action(() => {
      uidlStore.isUndoable = false
      uidlStore.isRedoable = false
      uidlStore.size = 0
    })
    initUndoRedoState()
    emitter.on(EDITOR_EVENT_KEY_UIDL, ({ type: evType, uidl }) => {
      if (evType === EDITOR_EVENT_UIDL_TYPE_INIT) {
        initUndoRedoState()
        const undoRedoList = (uidlStore.undoRedoList = new UndoRedoList({
          initState: uidl,
          maxSize: uidlStore.maxUndoRedoSize,
          onChange: action((type, newUidl, patchs): void => {
            void type
            uidlStore.uidl = newUidl
            uidlStore.isUndoable = undoRedoList.isUndoable
            uidlStore.isRedoable = undoRedoList.isRedoable
            uidlStore.size = undoRedoList.size
            emitter.emit(EDITOR_EVENT_KEY_UIDL, {
              type: EDITOR_EVENT_UIDL_TYPE_UPDATE,
              uidl: newUidl,
              patchs,
            })
          }),
        }))
      }
    })
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    uidlStore.getUidlOrThrow = () => {
      const { draft, uidl } = uidlStore
      const u = draft || uidl
      if (!u) {
        throw new Error('Can not get uidl before init.')
      }
      return u
    }
    uidlStore.draft = null
    definePropertyByGetter(uidlStore, 'isEditing', () => {
      return !!uidlStore.draft
    })
    uidlStore.edit = action((recipe, recipeId) => {
      const { undoRedoList } = uidlStore
      if (!uidlStore.draft) {
        emitter.emit(EDITOR_EVENT_KEY_UIDL_COMPOSITION_START, {
          uidl: undoRedoList.currentState,
        })
      }
      const ret = undoRedoList.produce((draft) => {
        uidlStore.draft = draft
        return recipe(draft)
      }, recipeId)
      const draft = (uidlStore.draft = undoRedoList.draft)
      const { currentState } = undoRedoList
      if (draft) {
        emitter.emit(EDITOR_EVENT_KEY_UIDL_COMPOSITION_UPDATE, {
          draft,
          uidl: currentState,
        })
      } else {
        emitter.emit(EDITOR_EVENT_KEY_UIDL_COMPOSITION_END, {
          uidl: currentState,
        })
      }
      return ret
    })
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    uidlStore.undo = () => {
      uidlStore.undoRedoList.undo()
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    uidlStore.redo = () => {
      uidlStore.undoRedoList.redo()
    }
    makeObservable(uidlStore, {
      isUndoable: observable,
      isRedoable: observable,
      size: observable,
    })
  },
}
