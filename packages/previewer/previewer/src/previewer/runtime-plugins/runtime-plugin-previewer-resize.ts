import type { RuntimePlugin } from '@p-lc/runtime'
import { type runtimePluginEmitter } from '@p-lc/runtime-emitter-plugins'
import {
  filterNotNil,
  getClosestHtmlElement,
  intersectionTwo,
} from '@p-lc/shared'
import { isNil } from 'lodash-uni'
import {
  RUNTIME_EVENT_KEY_HOST_ELEMENT,
  type runtimePluginElementDom,
} from './runtime-plugin-element-dom'

/**
 * 运行时预览器调整大小插件属性扩展
 */
export interface RuntimePluginPreviewerResizePropertiesExt {
  runtime: {
    /**
     * 编辑器调用
     */
    editorCall: ResizeEditorApis
    /**
     * 运行时暴露
     */
    runtimeExpose: ResizeRuntimeApis
  }
}

/**
 * 调整大小运行时接口
 */
export interface ResizeRuntimeApis {
  /**
   * 通过 ID 观察元素调整大小，自动取消其他元素的观察
   * @param ids 元素 ID
   */
  observeElementResizeByIds(ids: string[]): void
}

/**
 * 调整大小编辑器接口
 */
export interface ResizeEditorApis {
  /**
   * 元素调整大小事件
   * @param id 元素 ID
   */
  onElementResize(id: string): void
}

/**
 * 运行时预览器调整大小插件
 */
export const runtimePluginPreviewerResize: RuntimePlugin<
  RuntimePluginPreviewerResizePropertiesExt,
  typeof runtimePluginElementDom | typeof runtimePluginEmitter
> = {
  id: 'previewer-resize',
  initRuntime(ctx) {
    const { runtimeExpose, emitter } = ctx
    let observingIdSet = new Set<string>()
    let observingHostElements: HTMLElement[] = []
    const resizeObserver = new ResizeObserver((entries) => {
      const { editorCall } = ctx
      for (const entry of entries) {
        const el = getClosestHtmlElement(entry.target)
        if (!el) continue
        const id = ctx.getFirstElementId(el)
        if (isNil(id)) continue
        editorCall.onElementResize(id)
      }
    })
    runtimeExpose.observeElementResizeByIds = observeElementResizeByIds
    emitter.on(RUNTIME_EVENT_KEY_HOST_ELEMENT, (options) => {
      const { editorCall } = ctx
      const { elementId } = options
      if (observingIdSet.has(elementId)) {
        observeElementResizeByIds([...observingIdSet])
      }
      editorCall.onElementResize(elementId)
    })
    return () => resizeObserver.disconnect()

    function observeElementResizeByIds(ids: string[]): void {
      const els = filterNotNil(ids.map((id) => ctx.getFirstHostElement(id)))
      const [oldOnly, , newOnly] = intersectionTwo(observingHostElements, els)
      for (const el of oldOnly) {
        resizeObserver.unobserve(el)
      }
      for (const el of newOnly) {
        resizeObserver.observe(el)
      }
      observingIdSet = new Set(ids)
      observingHostElements = els
    }
  },
}
