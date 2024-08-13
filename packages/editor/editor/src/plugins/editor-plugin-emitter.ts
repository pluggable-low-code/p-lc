import type { ForceToObject, LiteralObject } from '@p-lc/shared'
import type { Emitter } from 'mitt'
import mitt from 'mitt'
import { action, makeObservable } from 'mobx'
import type { Get } from 'type-fest'
import type {
  AnyEditorPlugin,
  Editor,
  EditorDefaultPropertiesExtHkt,
  EditorDefaultPropertiesExtHktPlugin,
  EditorRawPlugin,
} from '../types'

/**
 * 编辑器发射器插件属性扩展高等类型
 */
export interface EditorPluginEmitterPropertiesExtHkt<
  Plugin extends AnyEditorPlugin,
> {
  editor: {
    /**
     * 发射器事件，由其他插件扩展，只用于类型推导
     */
    emitterEvents: LiteralObject
    /**
     * 发射器
     */
    emitter: Emitter<ForceToObject<Get<Editor<Plugin>, ['emitterEvents']>>>
  }
}

/**
 * EditorPluginEmitterPropertiesExtHkt 辅助类型
 */
export interface $EditorPluginEmitterPropertiesExtHkt
  extends EditorDefaultPropertiesExtHkt {
  type: EditorPluginEmitterPropertiesExtHkt<
    EditorDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 编辑器发射器插件
 */
export const editorPluginEmitter: EditorRawPlugin<$EditorPluginEmitterPropertiesExtHkt> =
  {
    id: 'emitter',
    initEditor(ctx) {
      ctx.emitter = mitt()
      makeObservable(ctx.emitter, {
        emit: action,
      })
    },
  }
