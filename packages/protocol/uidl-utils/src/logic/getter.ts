import type { JsonPath } from '@p-lc/shared'
import type { Uidl } from '@p-lc/uidl'
import { get, isArray } from 'lodash-uni'
import type {
  GetterEntityDetail,
  LogicGetterHelper,
  UidlUtilsConfig,
} from '../config'
import {
  ENTITY_DETAIL_TYPE_ELEMENT,
  ENTITY_DETAIL_TYPE_EXPRESSION,
} from '../constants'
import { getExpressionType } from '../expression'
import type { ElementOfUidl, ExpressionOfUidl } from '../types'

/**
 * 创建逻辑获取器助手
 * @param config UIDL 工具集配置
 */
export function createLogicGetterHelper<U extends Uidl = Uidl>(
  config: UidlUtilsConfig<U>,
): LogicGetterHelper<U> {
  const helper: LogicGetterHelper<U> = {
    getInElement(element, logicPath) {
      if (!logicPath.length) {
        return {
          type: ENTITY_DETAIL_TYPE_ELEMENT,
          element,
          jsonPath: [],
        }
      }
      const key = logicPath[0]
      const fn = config.elementLogicGetters[key]
      return fn?.(element, logicPath, helper)
    },
    getInExpression(expr, logicPath) {
      if (!logicPath.length) {
        return {
          type: ENTITY_DETAIL_TYPE_EXPRESSION,
          expression: expr,
          jsonPath: [],
        }
      }
      const fn = config.expressionLogicGetters[getExpressionType(expr)]
      return fn?.(expr, logicPath, helper)
    },
  }
  return helper
}

/**
 * 通过 UIDL 获取实体
 * @param config UIDL 工具集配置
 * @param uidl UIDL
 * @param logicPath 逻辑路径
 */
export function logicGetEntity<U extends Uidl = Uidl>(
  config: UidlUtilsConfig<U>,
  uidl: U,
  logicPath: JsonPath,
): GetterEntityDetail<U> {
  const helper = createLogicGetterHelper(config)
  const key = logicPath[0]
  const fn = config.uidlLogicGetters[key]
  return fn?.(uidl, logicPath, helper)
}

/**
 * 在元素中获取实体
 * @param config UIDL 工具集配置
 * @param element 元素
 * @param logicPath 逻辑路径
 */
export function logicGetEntityInElement<U extends Uidl = Uidl>(
  config: UidlUtilsConfig<U>,
  element: ElementOfUidl<U>,
  logicPath: JsonPath,
): GetterEntityDetail<U> {
  const { getInElement } = createLogicGetterHelper(config)
  return getInElement(element, logicPath)
}

/**
 * 在表达式中获取实体
 * @param config UIDL 工具集配置
 * @param expression 表达式
 * @param logicPath 逻辑路径
 */
export function logicGetEntityInExpression<U extends Uidl = Uidl>(
  config: UidlUtilsConfig<U>,
  expression: ExpressionOfUidl<U>,
  logicPath: JsonPath,
): GetterEntityDetail<U> {
  const { getInExpression } = createLogicGetterHelper(config)
  return getInExpression(expression, logicPath)
}

/**
 * 获取器实体详情转元素
 * @param ed 获取器实体详情
 */
export function getterEntityDetailToElement<U extends Uidl = Uidl>(
  ed: GetterEntityDetail<U>,
): ElementOfUidl<U> | undefined {
  if (ed?.type === ENTITY_DETAIL_TYPE_ELEMENT) {
    return ed.element
  }
}

/**
 * 获取器实体详情转表达式
 * @param ed 获取器实体详情
 */
export function getterEntityDetailToExpression<U extends Uidl = Uidl>(
  ed: GetterEntityDetail<U>,
): ExpressionOfUidl<U> | undefined {
  if (ed?.type === ENTITY_DETAIL_TYPE_EXPRESSION) {
    return ed.expression
  }
}

/**
 * 在元素中获取元素
 * @param config UIDL 工具集配置
 * @param element 元素
 * @param logicPath 逻辑路径
 */
export function logicGetElementInElement<U extends Uidl = Uidl>(
  config: UidlUtilsConfig<U>,
  element: ElementOfUidl<U>,
  logicPath: JsonPath,
): ElementOfUidl<U> | undefined {
  const { getInElement } = createLogicGetterHelper(config)
  return getterEntityDetailToElement(getInElement(element, logicPath))
}

/**
 * 在元素中获取表达式
 * @param config UIDL 工具集配置
 * @param element 元素
 * @param logicPath 逻辑路径
 */
export function logicGetExpressionInElement<U extends Uidl = Uidl>(
  config: UidlUtilsConfig<U>,
  element: ElementOfUidl<U>,
  logicPath: JsonPath,
): ExpressionOfUidl<U> | undefined {
  const { getInElement } = createLogicGetterHelper(config)
  return getterEntityDetailToExpression(getInElement(element, logicPath))
}

/**
 * 在元素中获取元素数组，`undefined` 表示数组不存在或数组为空
 * @param config UIDL 工具集配置
 * @param element 元素
 * @param logicPath 逻辑路径
 */
export function logicGetElementArrayInElement<U extends Uidl = Uidl>(
  config: UidlUtilsConfig<U>,
  element: ElementOfUidl<U>,
  logicPath: JsonPath,
): ElementOfUidl<U>[] | undefined {
  const ed = logicGetEntityInElement(config, element, [...logicPath, 0])
  if (ed?.type === ENTITY_DETAIL_TYPE_ELEMENT) {
    const ret = get(element, ed.jsonPath.slice(0, -1))
    if (isArray(ret)) return ret
  }
}
