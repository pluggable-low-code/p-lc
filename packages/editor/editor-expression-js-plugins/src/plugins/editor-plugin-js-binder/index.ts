import type { EditorPlugin } from '@p-lc/editor'
import type { Binder } from '@p-lc/editor-element-attributes-store-plugins'
import { type editorPluginElementAttributesStoreBind } from '@p-lc/editor-element-attributes-store-plugins'
import { type LiteralObject } from '@p-lc/shared'
import { JsBinderBody } from './components'

export * from './components'

/**
 * JS 绑定器
 */
export const jsBinder: Binder = {
  type: 'js',
  name: 'JavaScript',
  index: 450,
  Component: JsBinderBody,
}

/**
 * 编辑器 JS 绑定器插件
 */
export const editorPluginJsBinder: EditorPlugin<
  LiteralObject,
  typeof editorPluginElementAttributesStoreBind
> = {
  id: 'js-binder',
  initEditor(ctx) {
    const { elementAttributesStore } = ctx
    elementAttributesStore.binders[jsBinder.type] = jsBinder
  },
}
