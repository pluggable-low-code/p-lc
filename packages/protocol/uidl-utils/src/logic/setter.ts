import type { JsonPath } from '@p-lc/shared'
import type { Uidl } from '@p-lc/uidl'
import { isUndefined } from 'lodash-uni'
import type {
  LogicSetterHelper,
  SetterEntityDetail,
  UidlUtilsConfig,
} from '../config'
import {
  ENTITY_DETAIL_TYPE_ELEMENT,
  ENTITY_DETAIL_TYPE_EXPRESSION,
  EXPRESSION_TYPE_STATIC,
} from '../constants'
import { getExpressionType, unnormalizeExpression } from '../expression'
import type { ElementOfUidl, ExpressionOfUidl } from '../types'

/**
 * 创建逻辑设置器助手
 * @param config UIDL 工具集配置
 */
export function createLogicSetterHelper<U extends Uidl = Uidl>(
  config: UidlUtilsConfig<U>,
): LogicSetterHelper<U> {
  const helper: LogicSetterHelper<U> = {
    setInElement(element, logicPath, entity) {
      if (!logicPath.length) {
        if (!entity) return entity
        if (entity.type !== ENTITY_DETAIL_TYPE_ELEMENT) {
          throw new Error(
            `Can not setByElement with a invalid entity. type=${entity.type}`,
          )
        }
        return entity.element
      }
      const key = logicPath[0]
      const fn = config.elementLogicSetters[key]
      if (!fn) {
        throw new Error(
          `Can not setByElement with a invalid setter. key=${key}`,
        )
      }
      return fn(element, logicPath, entity, helper)
    },
    setInExpression(expr, logicPath, entity) {
      if (!logicPath.length) {
        if (!entity) return entity
        if (entity.type !== ENTITY_DETAIL_TYPE_EXPRESSION) {
          throw new Error(
            `Can not setByExpression with a invalid entity. type=${entity.type}`,
          )
        }
        return unnormalizeExpression(entity.expression) as ExpressionOfUidl<U>
      }
      const fn = config.expressionLogicSetters[getExpressionType(expr)]
      if (fn) {
        return fn(expr, logicPath, entity, helper)
      }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return config.expressionLogicSetters[EXPRESSION_TYPE_STATIC]!(
        null as ExpressionOfUidl<U>,
        logicPath,
        entity,
        helper,
      )
    },
  }
  return helper
}
/**
 * 在 UIDL 中设置实体，原地修改
 * @param config UIDL 工具集配置
 * @param uidl UIDL
 * @param logicPath 逻辑路径，长度大于 0
 * @param entity 实体
 */
export function logicSetEntity<U extends Uidl = Uidl>(
  config: UidlUtilsConfig<U>,
  uidl: U,
  logicPath: JsonPath,
  entity: SetterEntityDetail<U>,
): U {
  const helper = createLogicSetterHelper(config)
  const key = logicPath[0]
  const fn = config.uidlLogicSetters[key]
  if (!fn) {
    throw new Error(`Can not logicSetEntity with a invalid setter. key=${key}`)
  }
  return fn(uidl, logicPath, entity, helper)
}

/**
 * 在元素中设置实体，原地修改
 * @param config UIDL 工具集配置
 * @param element 元素
 * @param logicPath 逻辑路径，长度大于 0
 * @param entity 实体
 */
export function logicSetEntityInElement<U extends Uidl = Uidl>(
  config: UidlUtilsConfig<U>,
  element: ElementOfUidl<U>,
  logicPath: JsonPath,
  entity: SetterEntityDetail<U>,
): ElementOfUidl<U> {
  const { setInElement } = createLogicSetterHelper(config)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return setInElement(element, logicPath, entity)!
}

/**
 * 在表达式中设置实体，会尽量原地修改，但最外层表达式被修改时，以返回值为准
 * @param config UIDL 工具集配置
 * @param expression 表达式
 * @param logicPath 逻辑路径，长度大于 0
 * @param entity 实体
 */
export function logicSetEntityInExpression<U extends Uidl = Uidl>(
  config: UidlUtilsConfig<U>,
  expression: ExpressionOfUidl<U>,
  logicPath: JsonPath,
  entity: SetterEntityDetail<U>,
): ExpressionOfUidl<U> {
  const { setInExpression } = createLogicSetterHelper(config)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return setInExpression(expression, logicPath, entity)!
}

/**
 * 在 UIDL 中设置元素，原地修改
 * @param config UIDL 工具集配置
 * @param uidl UIDL
 * @param logicPath 逻辑路径，长度大于 0
 * @param childElement 子元素，不传表示删除
 */
export function logicSetElement<U extends Uidl = Uidl>(
  config: UidlUtilsConfig<U>,
  uidl: U,
  logicPath: JsonPath,
  childElement?: ElementOfUidl<U>,
): U {
  return logicSetEntity(
    config,
    uidl,
    logicPath,
    childElement && {
      type: ENTITY_DETAIL_TYPE_ELEMENT,
      element: childElement,
    },
  )
}

/**
 * 在元素中设置元素，原地修改
 * @param config UIDL 工具集配置
 * @param element 元素
 * @param logicPath 逻辑路径，长度大于 0
 * @param childElement 子元素，不传表示删除
 */
export function logicSetElementInElement<U extends Uidl = Uidl>(
  config: UidlUtilsConfig<U>,
  element: ElementOfUidl<U>,
  logicPath: JsonPath,
  childElement?: ElementOfUidl<U>,
): ElementOfUidl<U> {
  return logicSetEntityInElement(
    config,
    element,
    logicPath,
    childElement && {
      type: ENTITY_DETAIL_TYPE_ELEMENT,
      element: childElement,
    },
  )
}

/**
 * 在元素中设置表达式，原地修改
 * @param config UIDL 工具集配置
 * @param element 元素
 * @param logicPath 逻辑路径，长度大于 0
 * @param expression 表达式，不传表示删除
 */
export function logicSetExpressionInElement<U extends Uidl = Uidl>(
  config: UidlUtilsConfig<U>,
  element: ElementOfUidl<U>,
  logicPath: JsonPath,
  expression?: ExpressionOfUidl<U>,
): ElementOfUidl<U> {
  return logicSetEntityInElement(
    config,
    element,
    logicPath,
    isUndefined(expression)
      ? expression
      : {
          type: ENTITY_DETAIL_TYPE_EXPRESSION,
          expression,
        },
  )
}
