import type { RuntimePlugin } from '@p-lc/runtime'
import { winAddEventListener, winRemoveEventListener } from '@p-lc/shared'
import { isNil } from 'lodash-uni'
import { type runtimePluginElementDom } from './runtime-plugin-element-dom'

/**
 * 运行时预览器悬浮插件属性扩展
 */
export interface RuntimePluginPreviewerHoverPropertiesExt {
  runtime: {
    /**
     * 编辑器调用
     */
    editorCall: HoverEditorApis
  }
}

/**
 * 悬浮编辑器接口
 */
export interface HoverEditorApis {
  /**
   * 悬浮元素
   * @param elementId 元素 ID
   */
  hoverElement(elementId: string | null): void
}

/**
 * 运行时预览器悬浮插件
 */
export const runtimePluginPreviewerHover: RuntimePlugin<
  RuntimePluginPreviewerHoverPropertiesExt,
  typeof runtimePluginElementDom
> = {
  id: 'previewer-hover',
  initRuntime(ctx) {
    winAddEventListener('mousemove', handleMouseMove, true)
    return () => winRemoveEventListener('mousemove', handleMouseMove, true)

    function handleMouseMove(ev: MouseEvent): void {
      const { editorCall } = ctx
      const elementId = ctx.getFirstElementInfoByChildNode(ev.target)?.[0]
      if (isNil(elementId)) return
      editorCall.hoverElement(elementId)
    }
  },
}
