/**
 * 点
 */
export interface Point {
  /**
   * x 轴坐标
   */
  x: number
  /**
   * y 轴坐标
   */
  y: number
}

/**
 * 原点
 */
export const zeroPoint = createPoint(0)

/**
 * 创建点
 * @param x x 轴坐标
 * @param y y 轴坐标
 */
export function createPoint(x: number, y = x): Point {
  return { x, y }
}

/**
 * 通过事件 client 相关属性创建点
 * @param ev 事件
 */
export function createPointByEventClient(ev: {
  clientX: number
  clientY: number
}): Point {
  return createPoint(ev.clientX, ev.clientY)
}

/**
 * 创建反向的点
 * @param p 点
 */
export function createNegativePoint(p: Point): Point {
  return subPoint(zeroPoint, p)
}

/**
 * 加点，返回新的点
 * @param p1 点 1
 * @param p2 点 2
 */
export function addPoint(p1: Point, p2: Point): Point {
  return {
    x: p1.x + p2.x,
    y: p1.y + p2.y,
  }
}

/**
 * 减点，返回新的点
 * @param p1 点 1
 * @param p2 点 2
 */
export function subPoint(p1: Point, p2: Point): Point {
  return {
    x: p1.x - p2.x,
    y: p1.y - p2.y,
  }
}

/**
 * 乘点，返回新的点
 * @param p1 点 1
 * @param p2 点 2
 */
export function mulPoint(p1: Point, p2: Point): Point {
  return {
    x: p1.x * p2.x,
    y: p1.y * p2.y,
  }
}

/**
 * 距离平方
 * @param p1 点 1
 * @param p2 点 2
 */
export function distanceSquare(p1: Point, p2: Point): number {
  const sp = subPoint(p1, p2)
  return sp.x ** 2 + sp.y ** 2
}

/**
 * 嵌入位置
 */
export interface InsetPos {
  /**
   * 左偏移
   */
  left: number
  /**
   * 上偏移
   */
  top: number
}

/**
 * 点转嵌入位置
 * @param p 点
 */
export function pointToInsetPos(p: Point): InsetPos {
  return {
    left: p.x,
    top: p.y,
  }
}

/**
 * 点转 CSS 平移
 * @param p 点
 */
export function pointToTranslate(p: Point): string {
  return `translate3d(${p.x}px,${p.y}px,0)`
}

/**
 * 点转数组
 * @param p 点
 */
export function pointToArray(p: Point): [number, number] {
  return [p.x, p.y]
}
