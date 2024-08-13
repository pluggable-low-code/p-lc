import type { DynamicPathSlot, StaticPathSlot } from '@p-lc/pd'

/**
 * 静态路径插槽类型
 */
export const SLOT_TYPE_STATIC_PATH: NonNullable<StaticPathSlot['type']> =
  'static-path'

/**
 * 动态路径插槽类型
 */
export const SLOT_TYPE_DYNAMIC_PATH: DynamicPathSlot['type'] = 'dynamic-path'

/**
 * 文本类型：国际化
 */
export const TEXT_TYPE_I18N = 'i18n'
