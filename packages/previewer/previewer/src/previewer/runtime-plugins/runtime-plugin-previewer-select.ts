import type { RuntimePlugin } from '@p-lc/runtime'
import { docAddEventListener, docRemoveEventListener } from '@p-lc/shared'
import { isNil } from 'lodash-uni'
import { type runtimePluginElementDom } from './runtime-plugin-element-dom'

/**
 * 运行时预览器选择插件属性扩展
 */
export interface RuntimePluginPreviewerSelectPropertiesExt {
  runtime: {
    /**
     * 编辑器调用
     */
    editorCall: SelectEditorApis
  }
}

/**
 * 选择编辑器接口
 */
export interface SelectEditorApis {
  /**
   * 选择元素
   * @param elementId 元素 ID
   */
  selectElement(elementId: string | null): void
}

/**
 * 运行时预览器选择插件
 */
export const runtimePluginPreviewerSelect: RuntimePlugin<
  RuntimePluginPreviewerSelectPropertiesExt,
  typeof runtimePluginElementDom
> = {
  id: 'previewer-select',
  initRuntime(ctx) {
    // window 可能会停止冒泡阻止点击
    docAddEventListener('click', handleDocClick, true)
    return () => docRemoveEventListener('click', handleDocClick, true)

    function handleDocClick(ev: MouseEvent): void {
      const { editorCall } = ctx
      const elementId = ctx.getFirstElementInfoByChildNode(ev.target)?.[0]
      if (isNil(elementId)) return
      editorCall.selectElement(elementId)
    }
  },
}
