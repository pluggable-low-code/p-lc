import { inRange } from 'lodash-uni'
import { mathAbs } from '../es'
import type { EchoFn } from '../types'
import type { Point } from './point'
import { addPoint, createPoint, subPoint } from './point'

/**
 * 矩形
 */
export interface Rectangle {
  /**
   * 起点，左上角
   */
  s: Point
  /**
   * 终点，右下角
   */
  e: Point
}

/**
 * 创建矩形
 * @param s 起点
 * @param e 终点
 */
export function createRectangle(s: Point, e: Point): Rectangle {
  return { s, e }
}

/**
 * 通过原生的 DOMRect 对象创建矩形
 * @param d DOMRect 对象
 */
export function createRectangleByDOMRect(d: DOMRect): Rectangle {
  return createRectangle(createPoint(d.x, d.y), createPoint(d.right, d.bottom))
}

/**
 * 通过 HTML 元素创建矩形
 * @param el HTML 元素
 */
export function createRectangleByHtmlElement(el: HTMLElement): Rectangle {
  return createRectangleByDOMRect(el.getBoundingClientRect())
}

/**
 * 通过点转换创建矩形
 * @param rect 原有矩形
 * @param transformS 起点转换
 * @param transformE 终点转换
 */
export function createRectangleByPointTransform(
  rect: Rectangle,
  transformS: EchoFn<Point>,
  transformE = transformS,
): Rectangle {
  return createRectangle(transformS(rect.s), transformE(rect.e))
}

/**
 * 通过缩放创建矩形
 * @param rect 原有矩形
 * @param n 缩放距离
 */
export function createRectangleByZoom(rect: Rectangle, n: number): Rectangle {
  const p = createPoint(n, n)
  return createRectangle(subPoint(rect.s, p), addPoint(rect.e, p))
}

/**
 * 通过平移创建矩形
 * @param rect 原有矩形
 * @param vector 向量
 */
export function createRectangleByTranslate(
  rect: Rectangle,
  vector: Point,
): Rectangle {
  return createRectangle(addPoint(rect.s, vector), addPoint(rect.e, vector))
}

/**
 * 获取矩形宽度
 * @param r 矩形
 */
export function getRectangleWidth(r: Rectangle): number {
  return r.e.x - r.s.x
}

/**
 * 获取矩形高度
 * @param r 矩形
 */
export function getRectangleHeight(r: Rectangle): number {
  return r.e.y - r.s.y
}

/**
 * 获取矩形里的比例点
 * @param p 原始点
 * @param r 矩形
 */
export function getRatioPointInRectangle(p: Point, r: Rectangle): Point {
  return createPoint(
    (p.x - r.s.x) / getRectangleWidth(r),
    (p.y - r.s.y) / getRectangleHeight(r),
  )
}

/**
 * 获取矩形里的比例矩形
 * @param currentR 当前矩形
 * @param targetR 目标矩形
 */
export function getRatioRectangleInRectangle(
  currentR: Rectangle,
  targetR: Rectangle,
): Rectangle {
  return createRectangle(
    getRatioPointInRectangle(currentR.s, targetR),
    getRatioPointInRectangle(currentR.e, targetR),
  )
}

/**
 * 是几乎相同的矩形
 * @param r1 矩形 1
 * @param r2 矩形 2
 * @param ratioPrecision 比例精度，默认：0.1
 */
export function isAlmostSameRectangle(
  r1: Rectangle,
  r2: Rectangle,
  ratioPrecision = 0.1,
): boolean {
  const rr = getRatioRectangleInRectangle(r1, r2)
  return (
    mathAbs(rr.s.x) < ratioPrecision &&
    mathAbs(rr.s.y) < ratioPrecision &&
    mathAbs(1 - rr.e.x) < ratioPrecision &&
    mathAbs(1 - rr.e.y) < ratioPrecision
  )
}

/**
 * 是否在矩形内
 * @param p 点
 * @param r 矩形
 */
export function isInRectangle(p: Point, r: Rectangle): boolean {
  return inRange(p.x, r.s.x, r.e.x) && inRange(p.y, r.s.y, r.e.y)
}
