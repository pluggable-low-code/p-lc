import type { AnyObject } from '@p-lc/shared'
import {
  arrayStartsWith,
  countKeys,
  STR_CHILDREN,
  STR_PROPS,
} from '@p-lc/shared'
import type {
  UidlExpressionArray,
  UidlExpressionObject,
  UidlExpressionSlot,
  UidlExpressionStatic,
  UidlUnnormalizedExpressionStatic,
} from '@p-lc/uidl'
import {
  get,
  isArray,
  isNumber,
  isObject,
  isUndefined,
  keys,
  mapValues,
  values,
} from 'lodash-uni'
import {
  childrenSlotLogicPath,
  ENTITY_DETAIL_TYPE_ELEMENT,
  ENTITY_DETAIL_TYPE_EXPRESSION,
  EXPRESSION_TYPE_ARRAY,
  EXPRESSION_TYPE_OBJECT,
  EXPRESSION_TYPE_SLOT,
  EXPRESSION_TYPE_STATIC,
} from '../constants'
import { mergeChildrenToProps, splitChildrenFromProps } from '../element'
import {
  createStaticExpression,
  getStaticExpressionValue,
  isNormalizedExpression,
  isStaticExpression,
  jsonToStaticExpression,
  normalizeExpression,
  toArrayExpression,
  toObjectExpression,
  unnormalizeExpression,
} from '../expression'
import type { GetterEntityDetail, UidlUtilsConfig } from './types'

/**
 * 默认 UIDL 工具集配置
 */
export const defaultUidlUtilsConfig: UidlUtilsConfig = {
  uidlGenerators: {
    *view(uidl) {
      yield {
        type: ENTITY_DETAIL_TYPE_ELEMENT,
        element: uidl.view,
        jsonPath: ['view'],
        logicPath: ['view'],
      }
    },
  },
  elementGenerators: {
    *props({ props }) {
      if (props) {
        for (const key in props) {
          yield {
            type: ENTITY_DETAIL_TYPE_EXPRESSION,
            expression: props[key],
            jsonPath: [STR_PROPS, key],
            logicPath: [STR_PROPS, key],
          }
        }
      }
    },
    *children({ children }) {
      if (children) {
        for (let i = 0; i < children.length; i++) {
          yield {
            type: ENTITY_DETAIL_TYPE_ELEMENT,
            element: children[i],
            jsonPath: [STR_CHILDREN, i],
            logicPath: [STR_PROPS, STR_CHILDREN, i],
          }
        }
      }
    },
    *if({ if: expr }) {
      if (!isUndefined(expr)) {
        yield {
          type: ENTITY_DETAIL_TYPE_EXPRESSION,
          expression: expr,
          jsonPath: ['if'],
          logicPath: ['if'],
        }
      }
    },
    *for({ for: expr }) {
      if (!isUndefined(expr)) {
        yield {
          type: ENTITY_DETAIL_TYPE_EXPRESSION,
          expression: expr,
          jsonPath: ['for'],
          logicPath: ['for'],
        }
      }
    },
  },
  expressionGenerators: {
    *[EXPRESSION_TYPE_OBJECT](expression) {
      const expr = expression as UidlExpressionObject
      for (const key in expr.value) {
        yield {
          type: ENTITY_DETAIL_TYPE_EXPRESSION,
          expression: expr.value[key],
          jsonPath: ['value', key],
          logicPath: [key],
        }
      }
    },
    *[EXPRESSION_TYPE_ARRAY](expression) {
      const expr = expression as UidlExpressionArray
      for (let i = 0; i < expr.value.length; i++) {
        yield {
          type: ENTITY_DETAIL_TYPE_EXPRESSION,
          expression: expr.value[i],
          jsonPath: ['value', i],
          logicPath: [i],
        }
      }
    },
    *[EXPRESSION_TYPE_SLOT](expression) {
      const expr = expression as UidlExpressionSlot
      for (let i = 0; i < expr.value.length; i++) {
        yield {
          type: ENTITY_DETAIL_TYPE_ELEMENT,
          element: expr.value[i],
          jsonPath: ['value', i],
          logicPath: [i],
        }
      }
    },
  },
  uidlLogicGetters: {
    view({ view }, logicPath, { getInElement }) {
      const [key, ...restLogicPath] = logicPath
      const childRet = getInElement(view, restLogicPath)
      if (!childRet) return childRet
      return {
        ...childRet,
        jsonPath: [key, ...childRet.jsonPath],
      }
    },
  },
  elementLogicGetters: {
    props({ props, children }, logicPath, { getInExpression, getInElement }) {
      let ret: GetterEntityDetail
      if (props) {
        const [keyProps, key, ...restLogicPath] = logicPath
        const childExpr = props[key]
        if (!isUndefined(childExpr)) {
          const childRet = getInExpression(childExpr, restLogicPath)
          if (childRet) {
            ret = {
              ...childRet,
              jsonPath: [keyProps, key, ...childRet.jsonPath],
            }
          }
        }
      }
      if (
        !ret &&
        children &&
        arrayStartsWith(logicPath, childrenSlotLogicPath)
      ) {
        if (logicPath.length === 2) {
          return {
            type: ENTITY_DETAIL_TYPE_EXPRESSION,
            expression: {
              type: EXPRESSION_TYPE_SLOT,
              value: children,
            },
            jsonPath: [STR_CHILDREN],
          }
        }
        const [index, ...restLogicPath] = logicPath.slice(2)
        const childElement = children[index as number]
        if (isUndefined(childElement)) return
        const childRet = getInElement(childElement, restLogicPath)
        if (!childRet) return childRet
        return {
          ...childRet,
          jsonPath: [STR_CHILDREN, index, ...childRet.jsonPath],
        }
      }
      return ret
    },
    if({ if: expr }, logicPath, { getInExpression }) {
      if (isUndefined(expr)) return
      const [key, ...restLogicPath] = logicPath
      const childRet = getInExpression(expr, restLogicPath)
      if (!childRet) return childRet
      return {
        ...childRet,
        jsonPath: [key, ...childRet.jsonPath],
      }
    },
    for({ for: expr }, logicPath, { getInExpression }) {
      if (isUndefined(expr)) return
      const [key, ...restLogicPath] = logicPath
      const childRet = getInExpression(expr, restLogicPath)
      if (!childRet) return childRet
      return {
        ...childRet,
        jsonPath: [key, ...childRet.jsonPath],
      }
    },
  },
  expressionLogicGetters: {
    [EXPRESSION_TYPE_STATIC](expression, logicPath) {
      const expr = expression as
        | UidlExpressionStatic
        | UidlUnnormalizedExpressionStatic
      const isNormalized = isNormalizedExpression(expr)
      const retExpr = get(isNormalized ? expr.value : expr, logicPath)
      if (isUndefined(retExpr)) return
      return {
        type: ENTITY_DETAIL_TYPE_EXPRESSION,
        expression: retExpr,
        jsonPath: isNormalized ? ['value', ...logicPath] : logicPath,
        isPart: true,
      }
    },
    [EXPRESSION_TYPE_OBJECT](expression, logicPath, { getInExpression }) {
      const expr = expression as UidlExpressionObject
      const [key, ...restLogicPath] = logicPath
      const childExpr = expr.value[key]
      if (isUndefined(childExpr)) return
      const childRet = getInExpression(childExpr, restLogicPath)
      if (!childRet) return childRet
      return {
        ...childRet,
        jsonPath: ['value', key, ...childRet.jsonPath],
      }
    },
    [EXPRESSION_TYPE_ARRAY](expression, logicPath, { getInExpression }) {
      const expr = expression as UidlExpressionArray
      const [index, ...restLogicPath] = logicPath
      const childExpr = expr.value[index as number]
      if (isUndefined(childExpr)) return
      const childRet = getInExpression(childExpr, restLogicPath)
      if (!childRet) return childRet
      return {
        ...childRet,
        jsonPath: ['value', index, ...childRet.jsonPath],
      }
    },
    [EXPRESSION_TYPE_SLOT](expression, logicPath, { getInElement }) {
      const expr = expression as UidlExpressionSlot
      const [index, ...restLogicPath] = logicPath
      const childElement = expr.value[index as number]
      if (isUndefined(childElement)) return
      const childRet = getInElement(childElement, restLogicPath)
      if (!childRet) return childRet
      return {
        ...childRet,
        jsonPath: ['value', index, ...childRet.jsonPath],
      }
    },
  },
  uidlLogicSetters: {
    view(uidl, logicPath, entity, { setInElement }) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      uidl.view = setInElement(uidl.view, logicPath.slice(1), entity)!
      return uidl
    },
  },
  elementLogicSetters: {
    props(element, logicPath, entity, { setInExpression }) {
      let { props, children } = element
      if (
        !children &&
        arrayStartsWith(logicPath, childrenSlotLogicPath) &&
        logicPath.length === 3
      ) {
        // 自动初始化 children
        children = element.children = []
      }
      props = mergeChildrenToProps(children, props)
      const key = logicPath[1]
      const childRet = setInExpression(props[key], logicPath.slice(2), entity)
      if (isUndefined(childRet)) delete props[key]
      else props[key] = childRet
      ;[children, props] = splitChildrenFromProps(props)
      if (children) element.children = children
      else delete element.children
      if (countKeys(props)) element.props = props
      else delete element.props
      return element
    },
    if(element, logicPath, entity, { setInExpression }) {
      const childRet = setInExpression(
        element.if ?? null,
        logicPath.slice(1),
        entity,
      )
      if (isUndefined(childRet)) delete element.if
      else element.if = childRet
      return element
    },
    for(element, logicPath, entity, { setInExpression }) {
      const childRet = setInExpression(
        element.for ?? null,
        logicPath.slice(1),
        entity,
      )
      if (isUndefined(childRet)) delete element.for
      else element.for = childRet
      return element
    },
  },
  expressionLogicSetters: {
    [EXPRESSION_TYPE_STATIC](
      expression,
      logicPath,
      entity,
      { setInExpression },
    ) {
      const expr = expression as
        | UidlExpressionStatic
        | UidlUnnormalizedExpressionStatic
      const ne = normalizeExpression(expr)
      const [key, ...restLogicPath] = logicPath
      // 确保 ne.value 是数组或对象
      if (isObject(ne.value)) {
        // noop
      } else {
        ne.value = isNumber(key) ? [] : {}
      }
      const childRet = setInExpression(
        jsonToStaticExpression((ne.value as AnyObject)[key] ?? null),
        restLogicPath,
        entity,
      )
      if (isUndefined(childRet)) {
        if (isArray(ne.value)) {
          ne.value.splice(key as number, 1)
        } else {
          delete (ne.value as AnyObject)[key]
        }
        return unnormalizeExpression(ne)
      }
      if (isStaticExpression(childRet)) {
        ;(ne.value as AnyObject)[key] = getStaticExpressionValue(childRet)
        return unnormalizeExpression(ne)
      }
      let ret: UidlExpressionArray | UidlExpressionObject
      if (isArray(ne.value)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        ret = toArrayExpression(ne)!
      } else {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        ret = toObjectExpression(ne)!
      }
      ;(ret.value as AnyObject)[key] = childRet
      return ret
    },
    [EXPRESSION_TYPE_OBJECT](
      expression,
      logicPath,
      entity,
      { setInExpression },
    ) {
      const expr = expression as UidlExpressionObject
      const { value: exprValue } = expr
      const [key, ...restLogicPath] = logicPath
      const childRet = setInExpression(
        exprValue[key] ?? null,
        restLogicPath,
        entity,
      )
      if (isUndefined(childRet)) delete exprValue[key]
      else exprValue[key] = childRet
      return minifyObjectExpressionShallow(expr)
    },
    [EXPRESSION_TYPE_ARRAY](
      expression,
      logicPath,
      entity,
      { setInExpression },
    ) {
      const expr = expression as UidlExpressionArray
      const [index, ...restLogicPath] = logicPath
      const childRet = setInExpression(
        expr.value[index as number] ?? null,
        restLogicPath,
        entity,
      )
      if (isUndefined(childRet)) {
        expr.value.splice(index as number, 1)
      } else expr.value[index as number] = childRet
      return minifyArrayExpressionShallow(expr)
    },
    [EXPRESSION_TYPE_SLOT](expression, logicPath, entity, { setInElement }) {
      const expr = expression as UidlExpressionSlot
      const [index, ...restLogicPath] = logicPath
      const childRet = setInElement(
        expr.value[index as number],
        restLogicPath,
        entity,
      )
      if (childRet) expr.value[index as number] = childRet
      else {
        expr.value.splice(index as number, 1)
      }
      return expr
    },
  },
  uidlMinifiers: {
    dependencies(uidl) {
      if (!uidl.dependencies?.length) {
        delete uidl.dependencies
      }
      return uidl
    },
    components(uidl) {
      if (!uidl.components?.length) {
        delete uidl.components
      }
      return uidl
    },
    view(uidl, { minifyElement }) {
      uidl.view = minifyElement(uidl.view)
      return uidl
    },
  },
  elementMinifiers: {
    props(element, { minifyExpression }) {
      const { props } = element
      if (props) {
        const ks = keys(props)
        if (!ks.length) {
          delete element.props
        } else {
          element.props = mapValues(props, minifyExpression)
        }
      }
      return element
    },
    children(element, { minifyElement }) {
      const { children } = element
      if (children?.length) {
        element.children = children.map(minifyElement)
      } else {
        delete element.children
      }
      return element
    },
  },
  expressionMinifiers: {
    [EXPRESSION_TYPE_STATIC]: unnormalizeExpression,
    [EXPRESSION_TYPE_OBJECT](expression, { minifyExpression }) {
      const expr = expression as UidlExpressionObject
      expr.value = mapValues(expr.value, minifyExpression)
      return minifyObjectExpressionShallow(expr)
    },
    [EXPRESSION_TYPE_ARRAY](expression, { minifyExpression }) {
      const expr = expression as UidlExpressionArray
      expr.value = expr.value.map(minifyExpression)
      return minifyArrayExpressionShallow(expr)
    },
    [EXPRESSION_TYPE_SLOT](expression, { minifyElement }) {
      const expr = expression as UidlExpressionSlot
      expr.value = expr.value.map(minifyElement)
      return expr
    },
  },
}

/**
 * 浅压缩对象表达式
 * @param expression 对象表达式
 */
export function minifyObjectExpressionShallow(
  expression: UidlExpressionObject,
): UidlExpressionObject | UidlExpressionStatic {
  const { value } = expression
  if (values(value).every(isStaticExpression)) {
    return createStaticExpression(mapValues(value, getStaticExpressionValue))
  }
  return expression
}

/**
 * 浅压缩数组表达式
 * @param expression 数组表达式
 */
export function minifyArrayExpressionShallow(
  expression: UidlExpressionArray,
): UidlExpressionArray | UidlUnnormalizedExpressionStatic {
  const { value } = expression
  if (value.every(isStaticExpression)) {
    return value.map(getStaticExpressionValue)
  }
  return expression
}
