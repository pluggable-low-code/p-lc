import {
  ALIGN_POINT_BL,
  ALIGN_POINT_BR,
  ALIGN_POINT_TL,
  ALIGN_POINT_TR,
} from '../constants'
import {
  getRectangleHeight,
  getRectangleWidth,
  type Rectangle,
} from './rectangle'

/**
 * 简单对齐类型
 */
export type SimpleAlignType =
  | [typeof ALIGN_POINT_BL, typeof ALIGN_POINT_TL]
  | [typeof ALIGN_POINT_BR, typeof ALIGN_POINT_TR]
  | [typeof ALIGN_POINT_TL, typeof ALIGN_POINT_TL]
  | [typeof ALIGN_POINT_TR, typeof ALIGN_POINT_TR]
  | [typeof ALIGN_POINT_BL, typeof ALIGN_POINT_BL]
  | [typeof ALIGN_POINT_BR, typeof ALIGN_POINT_BR]
  | [typeof ALIGN_POINT_TL, typeof ALIGN_POINT_BL]
  | [typeof ALIGN_POINT_TR, typeof ALIGN_POINT_BR]

/**
 * 简单对齐矩形，只生成几种常用对齐类型，目前只用于预览器遮罩选中的元素边界
 * @param rectContainer 容器矩形
 * @param rectTarget 目标矩形
 * @param rectSource 源矩形
 */
export function simpleAlignRectangle(
  rectContainer: Rectangle,
  rectTarget: Rectangle,
  rectSource: Rectangle,
): SimpleAlignType {
  const {
    s: { y: rectContainerSY },
    e: { y: rectContainerEY },
  } = rectContainer
  const {
    s: { y: rectTargetSY },
    e: { y: rectTargetEY },
  } = rectTarget
  const targetWidth = getRectangleWidth(rectTarget)
  const sourceWidth = getRectangleWidth(rectSource)
  const sourceHeight = getRectangleHeight(rectSource)
  let isRight = false
  if (sourceWidth > targetWidth) {
    // 较宽
    const {
      s: { x: rectContainerSX },
      e: { x: rectContainerEX },
    } = rectContainer
    const {
      s: { x: rectTargetSX },
      e: { x: rectTargetEX },
    } = rectTarget
    if (rectTargetSX - rectContainerSX > rectContainerEX - rectTargetEX) {
      // 左边空间比较大
      isRight = true
    }
  }
  if (rectTargetSY - sourceHeight >= rectContainerSY) {
    // 外部 & 顶部
    return [
      alignPointBottom(isRight),
      alignPointTop(isRight),
    ] as SimpleAlignType
  }
  if (rectTargetEY + sourceHeight <= rectContainerEY) {
    // 外部 & 底部
    return [
      alignPointTop(isRight),
      alignPointBottom(isRight),
    ] as SimpleAlignType
  }
  if (rectTargetSY - rectContainerSY > rectContainerEY - rectTargetEY) {
    // 内部 & 顶部，底部优先
    const t = alignPointTop(isRight)
    return [t, t] as SimpleAlignType
  }
  // 外部 & 底部
  const b = alignPointBottom(isRight)
  return [b, b] as SimpleAlignType
}

/**
 * 对齐点顶部
 * @param isRight 是右边
 */
function alignPointTop(
  isRight: boolean,
): typeof ALIGN_POINT_TL | typeof ALIGN_POINT_TR {
  return isRight ? ALIGN_POINT_TR : ALIGN_POINT_TL
}

/**
 * 对齐点底部
 * @param isRight 是右边
 */
function alignPointBottom(
  isRight: boolean,
): typeof ALIGN_POINT_BL | typeof ALIGN_POINT_BR {
  return isRight ? ALIGN_POINT_BR : ALIGN_POINT_BL
}
