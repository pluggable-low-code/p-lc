import type { Disposer } from '@mobo-ts/shared'
import type { Point } from './graph'
import { createPoint, mulPoint, pointToArray } from './graph'
import { sleepFrame } from './time'

/**
 * a 标签打开新页面属性
 */
export const aOpenProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const

/**
 * 是 HTML 元素
 * @param v 值
 */
export function isHtmlElement(v: unknown): v is HTMLElement {
  return v instanceof HTMLElement
}

/**
 * 是 DOM 元素
 * @param v 值
 */
export function isDomElement(v: unknown): v is Element {
  return v instanceof Element
}

/**
 * 是 DOM 节点
 * @param v 值
 */
export function isDomNode(v: unknown): v is Node {
  return v instanceof Node
}

/**
 * 获取最近的 HTML 元素
 * @param node 节点
 */
export function getClosestHtmlElement(node: unknown): HTMLElement | null {
  if (!node) return null
  if (isHtmlElement(node)) return node
  if (isDomNode(node)) return node.parentElement
  return null
}

/**
 * 通过预测函数获取最近的 HTML 元素
 * @param node 节点
 * @param predicate 预测函数
 */
export function getClosestHtmlElementBy(
  node: unknown,
  predicate: (el: HTMLElement) => boolean,
): HTMLElement | null {
  for (let el = getClosestHtmlElement(node); el; el = el.parentElement) {
    if (predicate(el)) return el
  }
  return null
}

/**
 * 是可滚动的 HTML 元素
 * @param el HTML 元素
 */
export function isScrollableHtmlElement(el: HTMLElement): boolean {
  return el.scrollHeight > el.clientHeight
}

/**
 * 是可见的 HTML 元素
 * @param el HTML 元素
 */
export function isVisibleHtmlElement(el: HTMLElement): boolean {
  return el.checkVisibility({
    contentVisibilityAuto: true,
    opacityProperty: true,
    visibilityProperty: true,
  })
}

/**
 * 是子 HTML 元素
 * @param elParent 父 HTML 元素
 * @param elChild 子 HTML 元素
 */
export function isChildHtmlElement(
  elParent: HTMLElement,
  elChild: unknown,
): elChild is HTMLElement {
  return (
    isHtmlElement(elChild) &&
    !!getClosestHtmlElementBy(elChild, (el) => el === elParent)
  )
}

/**
 * 有 CSS 类
 * @param el HTML 元素
 * @param cls CSS 类
 */
export function hasCssClass(el: HTMLElement, cls: string): boolean {
  return el.classList.contains(cls)
}

/**
 * 添加 CSS 类
 * @param el HTML 元素
 * @param cls CSS 类
 */
export function addCssClass(el: HTMLElement, cls: string): void {
  el.classList.add(cls)
}

/**
 * 移除 CSS 类
 * @param el HTML 元素
 * @param cls CSS 类
 */
export function removeCssClass(el: HTMLElement, cls: string): void {
  el.classList.remove(cls)
}

/**
 * 可滚动的
 */
export interface Scrollable {
  /**
   * 相对滚动
   * @param x x 轴距离
   * @param y y 轴距离
   */
  scrollBy(x: number, y: number): void
}

/**
 * 持续滚动器
 */
export interface ContinuousScroller<T extends Scrollable> {
  /**
   * 可滚动对象
   */
  obj: T
  /**
   * 每秒滚动的距离
   */
  vector: Point
  /**
   * 处理
   */
  dispose: Disposer
}

/**
 * 开始持续滚动
 * @param obj 可滚动对象
 * @param vector 每秒滚动的距离
 */
export function startContinuousScroll<T extends Scrollable>(
  obj: T,
  vector: Point,
): ContinuousScroller<T> {
  let disposed = false
  const scroller: ContinuousScroller<T> = {
    obj,
    vector,
    dispose() {
      disposed = true
    },
  }
  ;(async (): Promise<void> => {
    let lastT = performance.now()
    while (!disposed) {
      const t = await sleepFrame()
      const ratio = (t - lastT) / 1000
      obj.scrollBy(
        ...pointToArray(mulPoint(createPoint(ratio), scroller.vector)),
      )
      lastT = t
    }
  })()
  return scroller
}
