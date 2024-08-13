import type { DynamicPathSlot, Slot, StaticPathSlot } from '@p-lc/pd'
import type { JsonPath } from '@p-lc/shared'
import { arrayStartsWith } from '@p-lc/shared'
import { childrenSlotLogicPath } from '@p-lc/uidl-utils'
import { isEqual } from 'lodash-uni'
import { SLOT_TYPE_DYNAMIC_PATH, SLOT_TYPE_STATIC_PATH } from './constants'

/**
 * 判断插槽匹配情况
 * @param slot 插槽
 * @param logicPath 逻辑路径
 * @param exact 精确，默认 true
 */
export function isSlotMatched(
  slot: Slot,
  logicPath: JsonPath,
  exact = true,
): boolean {
  switch (slot.type) {
    case undefined:
    case SLOT_TYPE_STATIC_PATH: {
      if (arrayStartsWith(logicPath, slot.logicPath, undefined, exact)) {
        return true
      }
      break
    }
    case SLOT_TYPE_DYNAMIC_PATH: {
      if (
        arrayStartsWith(
          logicPath,
          slot.dynamicLogicPath,
          (...[, b]) => b === '*',
          exact,
        )
      ) {
        return true
      }
      break
    }
  }
  return false
}

/**
 * 为静态路径插槽查找标识符
 * @param slot 插槽
 * @param logicPath 逻辑路径
 */
export function findIdentifierForDynamicPathSlot(
  slot: DynamicPathSlot,
  logicPath: JsonPath,
): string | null {
  for (let i = logicPath.length - 1; i >= 0; i--) {
    if (slot.dynamicLogicPath[i] === '*') {
      return `${logicPath[i]}`
    }
  }
  return null
}

/**
 * 是默认子元素插槽（children）
 * @param slot 插槽
 */
export function isChildrenSlot(slot: Slot): slot is StaticPathSlot {
  return (
    slot.type !== SLOT_TYPE_DYNAMIC_PATH &&
    isEqual(slot.logicPath, childrenSlotLogicPath)
  )
}

/**
 * 逻辑路径转临时名称
 * @param logicPath 逻辑路径
 */
export function logicPathToTempName(logicPath: JsonPath): string {
  return logicPath.join('.')
}

/**
 * 创建未知的临时插槽，用于 UIDL 里有，PD 里却没声明的场景
 * @param logicPath 逻辑路径
 */
export function createUnknownTempSlot(logicPath: JsonPath): StaticPathSlot {
  return {
    logicPath,
  }
}
