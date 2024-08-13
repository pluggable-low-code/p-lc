import type { EditorPlugin } from '@p-lc/editor'
import type { Pd } from '@p-lc/pd'
import type { Promisable } from '@p-lc/shared'
import { makeObservable, observable } from 'mobx'
import type { LcTypesEditor } from '../types'
import { transformPdBeforeSave } from '../utils'
import { type editorPluginLcTypesStore } from './editor-plugin-lc-types-store'

/**
 * 编辑器低代码类型仓库保存插件属性扩展
 */
export interface EditorPluginLcTypesStoreSavePropertiesExt {
  editor: {
    /**
     * 低代码类型仓库
     */
    lcTypesStore: {
      /**
       * 已保存的 PD
       */
      savedPd: Pd | null
      /**
       * 保存 PD
       * @param pd PD
       */
      onSavePd?(pd: Pd): Promisable<void>
    }
  }
  editorInitOptions: {
    /**
     * 保存 PD
     * @param pd PD
     */
    onSavePd?(pd: Pd): Promisable<void>
  }
}

/**
 * 编辑器低代码类型仓库保存插件
 */
export const editorPluginLcTypesStoreSave: EditorPlugin<
  EditorPluginLcTypesStoreSavePropertiesExt,
  typeof editorPluginLcTypesStore
> = {
  id: 'lc-types-store-save',
  initEditor(ctx) {
    const { saveStore, lcTypesStore } = ctx
    lcTypesStore.savedPd = ctx.initOptions.pd
    lcTypesStore.onSavePd = ctx.initOptions.onSavePd
    makeObservable(lcTypesStore, {
      savedPd: observable.ref,
    })
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    saveStore.checkSavable = () => lcTypesStore.pd !== lcTypesStore.savedPd
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    saveStore.onSave = () => {
      const { pd } = lcTypesStore
      lcTypesStore.savedPd = pd
      return lcTypesStore.onSavePd?.(
        transformPdBeforeSave(pd, ctx as unknown as LcTypesEditor),
      )
    }
  },
}
