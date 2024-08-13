import type { RuntimePlugin } from '@p-lc/runtime'
import type { JsonPath, Point, Rectangle } from '@p-lc/shared'
import {
  CLASS_NAME_LC_POPUP,
  createRectangleByHtmlElement,
  getClosestHtmlElement,
  isHtmlElement,
  jsonParse,
} from '@p-lc/shared'
import { type runtimePluginElementDom } from './runtime-plugin-element-dom'
import type { runtimePluginPreviewerIdElement } from './runtime-plugin-previewer-id-element'
import type { runtimePluginPreviewerPdForPreview } from './runtime-plugin-previewer-pd-for-preview'

/**
 * 运行时预览器位置插件属性扩展
 */
export interface RuntimePluginPreviewerPositionPropertiesExt {
  runtime: {
    /**
     * 运行时暴露
     */
    runtimeExpose: PositionRuntimeApis
  }
}

/**
 * 位置运行时接口
 */
export interface PositionRuntimeApis {
  /**
   * 通过视口的点获取元素位置
   * @param p 点
   */
  elementPositionFromPoint(p: Point): ElementPosition | null
  /**
   * 通过 ID 获取元素位置
   * @param id 元素 ID
   */
  elementPositionFromId(id: string): ElementPosition | null
}

/**
 * 元素位置
 */
export interface ElementPosition {
  /**
   * 元素 ID
   */
  elementId: string
  /**
   * 通过 DOM 查找的父元素 ID，不一定是 UIDL 上的父元素
   */
  parentElementIdByDom: string | null
  /**
   * 边界
   */
  bounding: Rectangle
  /**
   * 插槽位置
   */
  slotPos?: ElementSlotPosition
}

/**
 * 元素插槽位置
 */
export interface ElementSlotPosition
  extends Pick<DomDataLcSlot, 'slotLogicPath' | 'dynamicRender'> {
  /**
   * 边界
   */
  bounding: Rectangle
}

/**
 * DOM 数据：低代码插槽
 */
export interface DomDataLcSlot {
  /**
   * 元素 ID
   */
  elementId: string
  /**
   * 插槽逻辑路径
   */
  slotLogicPath: JsonPath
  /**
   * 动态渲染
   */
  dynamicRender?: boolean
}

/**
 * 运行时预览器位置插件
 */
export const runtimePluginPreviewerPosition: RuntimePlugin<
  RuntimePluginPreviewerPositionPropertiesExt,
  | typeof runtimePluginElementDom
  | typeof runtimePluginPreviewerIdElement
  | typeof runtimePluginPreviewerPdForPreview
> = {
  id: 'previewer-position',
  initRuntime(ctx) {
    const { runtimeExpose } = ctx
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    runtimeExpose.elementPositionFromPoint = (p) => {
      const posEl = getClosestHtmlElement(document.elementFromPoint(p.x, p.y))
      const elInfo = ctx.getFirstElementInfoByChildNode(posEl)
      if (!elInfo) return elInfo
      const [id, el] = elInfo
      const parentElementIdByDom = getParentElementIdByDom(el)
      const bounding = createRectangleByHtmlElement(el)
      const elPos: ElementPosition = {
        elementId: id,
        parentElementIdByDom,
        bounding,
      }
      let slotEl = posEl?.closest('.lc-slot-placeholder[data-lc-slot]')
      if (!slotEl && !parentElementIdByDom && !ctx.isRootElement(id)) {
        // 没命中插槽，但命中了弹窗元素
        const elementType = ctx.idUidlElementMap.get(id)?.type
        const staticPathSlots = elementType
          ? ctx.getStaticPathSlots(elementType)
          : null
        if (staticPathSlots?.length === 1) {
          // 直接取唯一的静态插槽
          const slot = staticPathSlots[0]
          elPos.slotPos = {
            slotLogicPath: slot.logicPath,
            dynamicRender: slot.dynamicRender,
            bounding,
          }
        } else {
          // 约定 lc-popup 也可以挂 data-lc-slot 来辅助编辑，但不挂也没关系
          slotEl = el.closest(`.${CLASS_NAME_LC_POPUP}[data-lc-slot]`)
        }
      }
      if (isHtmlElement(slotEl)) {
        const { slotLogicPath, dynamicRender } = jsonParse(
          slotEl.dataset.lcSlot as string,
        ) as DomDataLcSlot
        elPos.slotPos = {
          slotLogicPath,
          dynamicRender,
          bounding: createRectangleByHtmlElement(slotEl),
        }
      }
      return elPos
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    runtimeExpose.elementPositionFromId = (id) => {
      const el = ctx.getFirstHostElement(id)
      if (!el) return null
      return {
        elementId: id,
        parentElementIdByDom: getParentElementIdByDom(el),
        bounding: createRectangleByHtmlElement(el),
      }
    }

    function getParentElementIdByDom(el: HTMLElement): string | null {
      const parentElInfo = ctx.getFirstElementInfoByChildNode(el.parentElement)
      return parentElInfo?.[0] || null
    }
  },
}
