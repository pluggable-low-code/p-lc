import type { RuntimePlugin } from '@p-lc/runtime'
import { type runtimePluginEmitter } from '@p-lc/runtime-emitter-plugins'
import { firstValueOfSet, getClosestHtmlElementBy } from '@p-lc/shared'
import { isNil } from 'lodash-uni'

/**
 * 运行时元素 DOM 插件属性扩展
 */
export interface RuntimePluginElementDomPropertiesExt {
  runtime: {
    /**
     * 发射器事件
     */
    emitterEvents: {
      /**
       * 宿主元素变化事件
       */
      hostElement: {
        /**
         * 类型
         */
        type:
          | typeof EVENT_HOST_ELEMENT_TYPE_LINK
          | typeof RUNTIME_EVENT_HOST_ELEMENT_TYPE_UNLINK
        /**
         * 元素 ID
         */
        elementId: string
        /**
         * 宿主元素
         */
        el: HTMLElement
      }
    }
    /**
     * 元素 ID -> 宿主元素，列表渲染的情况下，可能有多个宿主元素
     */
    elementIdToHostElements: Map<string, Set<HTMLElement>>
    /**
     * 宿主元素 -> 元素 ID，有些无宿主元素的元素渲染后，会关联到子元素的宿主元素上
     */
    hostElementToElementIds: Map<HTMLElement, Set<string>>
    /**
     * 链接宿主元素
     * @param elementId 元素 ID
     * @param el 宿主元素
     * @param autoEmit 是否自动发射事件，默认：true
     */
    linkHostElement(
      elementId: string,
      el: HTMLElement,
      autoEmit?: boolean,
    ): void
    /**
     * 取消链接宿主元素
     * @param elementId 元素 ID
     * @param el 宿主元素
     * @param autoEmit 是否自动发射事件，默认：true
     */
    unlinkHostElement(
      elementId: string,
      el: HTMLElement,
      autoEmit?: boolean,
    ): void
    /**
     * 获取首个宿主元素
     * @param elementId 元素 ID
     */
    getFirstHostElement(elementId: string): HTMLElement | null
    /**
     * 获取首个元素 ID
     * @param el 宿主元素
     */
    getFirstElementId(el: HTMLElement): string | null
    /**
     * 通过子节点获取首个元素信息
     * @param node 节点
     * @returns 元素 ID，宿主元素
     */
    getFirstElementInfoByChildNode(node: unknown): [string, HTMLElement] | null
  }
}

/**
 * 运行时事件键值：宿主元素变化
 */
export const RUNTIME_EVENT_KEY_HOST_ELEMENT = 'hostElement'

/**
 * 宿主元素变化事件类型：链接
 */
export const EVENT_HOST_ELEMENT_TYPE_LINK = 'link'

/**
 * 运行时宿主元素变化事件类型：取消链接
 */
export const RUNTIME_EVENT_HOST_ELEMENT_TYPE_UNLINK = 'unlink'

/**
 * 运行时元素 DOM 插件
 */
export const runtimePluginElementDom: RuntimePlugin<
  RuntimePluginElementDomPropertiesExt,
  typeof runtimePluginEmitter
> = {
  id: 'element-dom',
  initRuntime(ctx) {
    const { emitter } = ctx
    ctx.elementIdToHostElements = new Map()
    ctx.hostElementToElementIds = new Map()
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ctx.linkHostElement = (elementId, el, autoEmit = true) => {
      const { elementIdToHostElements, hostElementToElementIds } = ctx
      let hasChanged = false
      let hostElementSet = elementIdToHostElements.get(elementId)
      if (!hostElementSet) {
        elementIdToHostElements.set(elementId, (hostElementSet = new Set()))
      }
      if (!hostElementSet.has(el)) {
        hostElementSet.add(el)
        hasChanged = true
      }
      let elementIdSet = hostElementToElementIds.get(el)
      if (!elementIdSet) {
        hostElementToElementIds.set(el, (elementIdSet = new Set()))
      }
      elementIdSet.add(elementId)
      if (autoEmit && hasChanged) {
        emitter.emit(RUNTIME_EVENT_KEY_HOST_ELEMENT, {
          type: EVENT_HOST_ELEMENT_TYPE_LINK,
          elementId,
          el,
        })
      }
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ctx.unlinkHostElement = (elementId, el, autoEmit = true) => {
      const { elementIdToHostElements, hostElementToElementIds } = ctx
      let hasChanged = false
      const hostElementSet = elementIdToHostElements.get(elementId)
      if (hostElementSet?.has(el)) {
        hasChanged = true
        hostElementSet.delete(el)
        if (!hostElementSet.size) {
          elementIdToHostElements.delete(elementId)
        }
      }
      const elementIdSet = hostElementToElementIds.get(el)
      if (elementIdSet) {
        elementIdSet.delete(elementId)
        if (!elementIdSet.size) {
          hostElementToElementIds.delete(el)
        }
      }
      if (autoEmit && hasChanged) {
        emitter.emit(RUNTIME_EVENT_KEY_HOST_ELEMENT, {
          type: RUNTIME_EVENT_HOST_ELEMENT_TYPE_UNLINK,
          elementId,
          el,
        })
      }
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ctx.getFirstHostElement = (elementId) => {
      const { elementIdToHostElements } = ctx
      const hostElementSet = elementIdToHostElements.get(elementId)
      if (hostElementSet) {
        return firstValueOfSet(hostElementSet) ?? null
      }
      return null
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ctx.getFirstElementId = (el) => {
      const { hostElementToElementIds } = ctx
      const elementIdSet = hostElementToElementIds.get(el)
      if (elementIdSet) {
        return firstValueOfSet(elementIdSet) ?? null
      }
      return null
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ctx.getFirstElementInfoByChildNode = (node) => {
      let ret = null as [string, HTMLElement] | null
      getClosestHtmlElementBy(node, (el) => {
        const id = ctx.getFirstElementId(el)
        if (isNil(id)) return false
        ret = [id, el]
        return true
      })
      return ret
    }
  },
}
