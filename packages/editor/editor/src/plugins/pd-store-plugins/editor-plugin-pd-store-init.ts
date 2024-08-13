import type { Pd } from '@p-lc/pd'
import type { EditorRawPlugin } from '../../types'
import { type editorPluginPdStore } from './editor-plugin-pd-store'

/**
 * 编辑器 PD 仓库初始化插件属性扩展
 */
export interface EditorPluginPdStoreInitPropertiesExt {
  editorInitOptions: {
    /**
     * PD
     */
    pds?: Pd[]
  }
}

/**
 * 编辑器 PD 仓库初始化插件
 */
export const editorPluginPdStoreInit: EditorRawPlugin<
  EditorPluginPdStoreInitPropertiesExt,
  typeof editorPluginPdStore
> = {
  id: 'pd-store-init',
  initEditor(ctx) {
    const {
      initOptions: { pds: initPds },
      pdStore,
    } = ctx
    for (const pd of initPds || []) {
      pdStore.addPd(pd)
    }
  },
}
