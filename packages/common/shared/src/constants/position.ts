/**
 * 位置类型：上
 */
export const POSITION_TYPE_TOP = 'top'

/**
 * 位置类型：右
 */
export const POSITION_TYPE_RIGHT = 'right'

/**
 * 位置类型：下
 */
export const POSITION_TYPE_BOTTOM = 'bottom'

/**
 * 位置类型：左
 */
export const POSITION_TYPE_LEFT = 'left'

/**
 * 位置类型：中
 */
export const POSITION_TYPE_CENTER = 'center'

/**
 * 对齐点：上左
 */
export const ALIGN_POINT_TL = 'tl'

/**
 * 对齐点：上中
 */
export const ALIGN_POINT_TC = 'tc'

/**
 * 对齐点：上右
 */
export const ALIGN_POINT_TR = 'tr'

/**
 * 对齐点：上左
 */
export const ALIGN_POINT_CL = 'cl'

/**
 * 对齐点：上左
 */
export const ALIGN_POINT_CC = 'cc'

/**
 * 对齐点：上左
 */
export const ALIGN_POINT_CR = 'cr'

/**
 * 对齐点：上左
 */
export const ALIGN_POINT_BL = 'bl'

/**
 * 对齐点：上左
 */
export const ALIGN_POINT_BC = 'bc'

/**
 * 对齐点：上左
 */
export const ALIGN_POINT_BR = 'br'

/**
 * 对齐点
 */
export type AlignPoint =
  | typeof ALIGN_POINT_TL
  | typeof ALIGN_POINT_TC
  | typeof ALIGN_POINT_TR
  | typeof ALIGN_POINT_CL
  | typeof ALIGN_POINT_CC
  | typeof ALIGN_POINT_CR
  | typeof ALIGN_POINT_BL
  | typeof ALIGN_POINT_BC
  | typeof ALIGN_POINT_BR

/**
 * 对齐类型
 */
export type AlignType = [AlignPoint, AlignPoint]
