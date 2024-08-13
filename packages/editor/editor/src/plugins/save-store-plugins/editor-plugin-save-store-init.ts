import type { Promisable } from '@p-lc/shared'
import type {
  AnyEditorPlugin,
  Editor,
  EditorDefaultPropertiesExtHkt,
  EditorDefaultPropertiesExtHktPlugin,
  EditorRawPlugin,
} from '../../types'
import type { UidlStoreUidl } from '../uidl-store-plugins'
import { type editorPluginSaveStore } from './editor-plugin-save-store'

/**
 * 编辑器保存仓库插件初始化属性扩展
 */
export interface EditorPluginSaveStoreInitPropertiesExtHkt<
  Plugin extends AnyEditorPlugin,
> {
  editorInitOptions: {
    /**
     * 保存事件
     * @param uidl
     * @param ctx 上下文，编辑器
     */
    onSave?(uidl: UidlStoreUidl<Plugin>, ctx: Editor<Plugin>): Promisable<void>
  }
}

/**
 * EditorPluginSaveStoreInitPropertiesExtHkt 辅助类型
 */
export interface $EditorPluginSaveStoreInitPropertiesExtHkt
  extends EditorDefaultPropertiesExtHkt {
  type: EditorPluginSaveStoreInitPropertiesExtHkt<
    EditorDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 编辑器保存仓库初始化插件
 */
export const editorPluginSaveStoreInit: EditorRawPlugin<
  $EditorPluginSaveStoreInitPropertiesExtHkt,
  typeof editorPluginSaveStore
> = {
  id: 'save-store-init',
  initEditor(ctx) {
    const { saveStore } = ctx
    saveStore.onSave = ctx.initOptions.onSave || saveStore.onSave
  },
}
