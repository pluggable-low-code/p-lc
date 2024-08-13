import { IS_APPLE_DEVICE, isPartialObject } from '@p-lc/shared'
import type { Writable } from 'type-fest'

/**
 * 简单快捷键，标志 + 键值
 */
export type SimpleShortcut = [number] | [number, string]

/**
 * 空
 */
export const SIMPLE_SHORTCUT_FLAG_NONE = 0

/**
 * meta 键按下
 */
export const SIMPLE_SHORTCUT_FLAG_META = 1 << 0

/**
 * ctrl 键按下
 */
export const SIMPLE_SHORTCUT_FLAG_CTRL = 1 << 1

/**
 * alt 键按下
 */
export const SIMPLE_SHORTCUT_FLAG_ALT = 1 << 2

/**
 * shift 键按下
 */
export const SIMPLE_SHORTCUT_FLAG_SHIFT = 1 << 3

/**
 * * Apple：meta 键按下
 * * Windows：ctrl 键按下
 */
export const SIMPLE_SHORTCUT_FLAG_MOD = 1 << 4

/**
 * 键值改为使用代码值
 */
export const SIMPLE_SHORTCUT_FLAG_CODE = 1 << 5

/**
 * 匹配简单快捷键
 * @param ss 简单快捷键
 * @param ev 键盘事件
 */
export function matchSimpleShortcut(
  [flags, key]: SimpleShortcut,
  ev: KeyboardEvent,
): boolean {
  const mod = SIMPLE_SHORTCUT_FLAG_MOD & flags
  const p: Partial<Writable<KeyboardEvent>> = {}
  p.metaKey = !!(SIMPLE_SHORTCUT_FLAG_META & flags || (mod && IS_APPLE_DEVICE))
  p.ctrlKey = !!(SIMPLE_SHORTCUT_FLAG_CTRL & flags || (mod && !IS_APPLE_DEVICE))
  p.altKey = !!(SIMPLE_SHORTCUT_FLAG_ALT & flags)
  p.shiftKey = !!(SIMPLE_SHORTCUT_FLAG_SHIFT & flags)
  if (key) {
    if (SIMPLE_SHORTCUT_FLAG_CODE & flags) {
      p.code = key
    } else {
      p.key = key
    }
  }
  return isPartialObject(ev, p)
}

/**
 * 创建批量匹配简单快捷键函数
 * @param sss 多个简单快捷键
 */
export function createBatchMatchSimpleShortcut(
  ...sss: SimpleShortcut[]
): (ev: KeyboardEvent) => boolean {
  return (ev) => sss.some((ss) => matchSimpleShortcut(ss, ev))
}
