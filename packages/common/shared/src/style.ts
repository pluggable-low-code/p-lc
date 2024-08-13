import { isNumber } from 'lodash-uni'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import rawClsxLite from 'clsx/lite'

/**
 * 标准化样式值
 * @param v 样式值
 */
export function normalizeStyleValue(v: number | string): string {
  return isNumber(v) ? `${v}px` : v
}

/**
 * 用 var() 包裹 CSS 变量
 * @param name 原始名称
 */
export function cssVar(name: string): string {
  return `var(${name})`
}

/**
 * clsx 轻量版，用于合并 className
 */
export const clsxLite = rawClsxLite as (
  ...args: (string | null | undefined)[]
) => string
