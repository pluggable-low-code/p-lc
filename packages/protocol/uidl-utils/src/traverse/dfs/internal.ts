import type { JsonPath } from '@p-lc/shared'
import { definedValues } from '@p-lc/shared'
import type { Uidl } from '@p-lc/uidl'
import { last } from 'lodash-uni'
import type {
  ChildElementDetail,
  ChildEntityDetail,
  ChildExpressionDetail,
  UidlUtilsConfig,
} from '../../config'
import {
  ENTITY_DETAIL_TYPE_ELEMENT,
  ENTITY_DETAIL_TYPE_EXPRESSION,
  TRAVERSE_TIME_ENTER,
  TRAVERSE_TIME_EXIT,
} from '../../constants'
import { normalizeExpression } from '../../expression'
import type { EntityDetailType } from '../../types'
import type {
  TraverseElementDetail,
  TraverseEntityDetail,
  TraverseExpressionDetail,
  TraverseOptions,
  TraverseTime,
} from '../types'

/**
 * 内部：深度优先搜索实体
 * @param config UIDL 工具集配置
 * @param uidl UIDL
 * @param options 选项
 */
export function* internalDfsEntity<
  U extends Uidl = Uidl,
  T extends EntityDetailType = EntityDetailType,
>(
  config: UidlUtilsConfig<U>,
  uidl: U,
  options: TraverseOptions<T>,
): Generator<TraverseEntityDetail<U, T>, void, unknown> {
  for (const fn of definedValues(config.uidlGenerators)) {
    for (const ced of fn(uidl)) {
      yield* dfsEntityInEntityAndModifyPath(config, ced, [], [], [], options)
    }
  }
}

/**
 * 在实体中深度优先搜索实体，并修改路径
 * @param config UIDL 工具集配置
 * @param ced 子实体详情
 * @param fullJsonPath 从最顶层对象开始的 JSON 路径
 * @param fullLogicPath 从最顶层对象开始的逻辑路径
 * @param elementIdPath 从最顶层对象开始的元素 ID 路径
 * @param options 选项
 */
function* dfsEntityInEntityAndModifyPath<
  U extends Uidl = Uidl,
  T extends EntityDetailType = EntityDetailType,
>(
  config: UidlUtilsConfig<U>,
  ced: ChildEntityDetail<U>,
  fullJsonPath: JsonPath,
  fullLogicPath: JsonPath,
  elementIdPath: string[],
  options: TraverseOptions<T>,
): Generator<TraverseEntityDetail<U, T>, void, unknown> {
  const nextFullJsonPath = [...fullJsonPath, ...ced.jsonPath]
  const nextFullLogicPath = [...fullLogicPath, ...ced.logicPath]
  const nextElementIdPath =
    ced.type === ENTITY_DETAIL_TYPE_ELEMENT
      ? [...elementIdPath, ced.element.id]
      : elementIdPath
  yield* internalDfsEntityInEntity(
    config,
    ced,
    nextFullJsonPath,
    nextFullLogicPath,
    nextElementIdPath,
    options,
  )
}

/**
 * 内部：在实体中深度优先搜索实体
 * @param config UIDL 工具集配置
 * @param ced 实体详情
 * @param fullJsonPath 从最顶层对象开始的 JSON 路径
 * @param fullLogicPath 从最顶层对象开始的逻辑路径
 * @param elementIdPath 从最顶层对象开始的元素 ID 路径
 * @param options 选项
 */
export function* internalDfsEntityInEntity<
  U extends Uidl = Uidl,
  T extends EntityDetailType = EntityDetailType,
>(
  config: UidlUtilsConfig<U>,
  ced: ChildEntityDetail<U>,
  fullJsonPath: JsonPath,
  fullLogicPath: JsonPath,
  elementIdPath: string[],
  options: TraverseOptions<T>,
): Generator<TraverseEntityDetail<U, T>, void, unknown> {
  yield* (
    ced.type === ENTITY_DETAIL_TYPE_ELEMENT
      ? internalDfsEntityInElement
      : internalDfsEntityInExpression
  )(
    config,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ced as any,
    fullJsonPath,
    fullLogicPath,
    elementIdPath,
    options,
  )
}

/**
 * 内部：在元素中深度优先搜索实体
 * @param config UIDL 工具集配置
 * @param ced 实体详情
 * @param fullJsonPath 从最顶层对象开始的 JSON 路径
 * @param fullLogicPath 从最顶层对象开始的逻辑路径
 * @param elementIdPath 从最顶层对象开始的元素 ID 路径
 * @param options 选项
 */
export function* internalDfsEntityInElement<
  U extends Uidl = Uidl,
  T extends EntityDetailType = EntityDetailType,
>(
  config: UidlUtilsConfig<U>,
  ced: ChildElementDetail<U>,
  fullJsonPath: JsonPath,
  fullLogicPath: JsonPath,
  elementIdPath: string[],
  options: TraverseOptions<T>,
): Generator<TraverseEntityDetail<U, T>, void, unknown> {
  if (elementIdPath.length > options.elementIdPathMaxLength) {
    return
  }
  const shouldYield =
    (options.entityDetailTypes as EntityDetailType[]).indexOf(
      ENTITY_DETAIL_TYPE_ELEMENT,
    ) !== -1
  if (
    shouldYield &&
    options.traverseTimes.indexOf(TRAVERSE_TIME_ENTER) !== -1
  ) {
    yield getTed(TRAVERSE_TIME_ENTER)
  }
  for (const fn of definedValues(config.elementGenerators)) {
    for (const d of fn(ced.element)) {
      yield* dfsEntityInEntityAndModifyPath(
        config,
        d,
        fullJsonPath,
        fullLogicPath,
        elementIdPath,
        options,
      )
    }
  }
  if (shouldYield && options.traverseTimes.indexOf(TRAVERSE_TIME_EXIT) !== -1) {
    yield getTed(TRAVERSE_TIME_EXIT)
  }

  function getTed(traverseTime: TraverseTime): TraverseEntityDetail<U, T> {
    const ted: TraverseElementDetail<U> = {
      ...ced,
      traverseTime,
      fullJsonPath,
      fullLogicPath,
      elementIdPath,
      elementId: last(elementIdPath) ?? null,
      parentElementId: elementIdPath[elementIdPath.length - 2] ?? null,
    }
    return ted as TraverseEntityDetail<U, T>
  }
}

/**
 * 内部：在表达式中深度优先搜索实体
 * @param config UIDL 工具集配置
 * @param ced 实体详情
 * @param fullJsonPath 从最顶层对象开始的 JSON 路径
 * @param fullLogicPath 从最顶层对象开始的逻辑路径
 * @param elementIdPath 从最顶层对象开始的元素 ID 路径
 * @param options 选项
 */
export function* internalDfsEntityInExpression<
  U extends Uidl = Uidl,
  T extends EntityDetailType = EntityDetailType,
>(
  config: UidlUtilsConfig<U>,
  ced: ChildExpressionDetail<U>,
  fullJsonPath: JsonPath,
  fullLogicPath: JsonPath,
  elementIdPath: string[],
  options: TraverseOptions<T>,
): Generator<TraverseEntityDetail<U, T>, void, unknown> {
  const shouldYield =
    (options.entityDetailTypes as EntityDetailType[]).indexOf(
      ENTITY_DETAIL_TYPE_EXPRESSION,
    ) !== -1
  if (
    shouldYield &&
    options.traverseTimes.indexOf(TRAVERSE_TIME_ENTER) !== -1
  ) {
    yield getTed(TRAVERSE_TIME_ENTER)
  }
  const ne = normalizeExpression(ced.expression)
  const fn = config.expressionGenerators[ne.type]
  if (fn) {
    for (const d of fn(ced.expression)) {
      yield* dfsEntityInEntityAndModifyPath(
        config,
        d,
        fullJsonPath,
        fullLogicPath,
        elementIdPath,
        options,
      )
    }
  }
  if (shouldYield && options.traverseTimes.indexOf(TRAVERSE_TIME_EXIT) !== -1) {
    yield getTed(TRAVERSE_TIME_EXIT)
  }

  function getTed(traverseTime: TraverseTime): TraverseEntityDetail<U, T> {
    const ted: TraverseExpressionDetail<U> = {
      ...ced,
      traverseTime,
      fullJsonPath,
      fullLogicPath,
      elementIdPath,
      elementId: last(elementIdPath) ?? null,
      parentElementId: elementIdPath[elementIdPath.length - 2] ?? null,
    }
    return ted as TraverseEntityDetail<U, T>
  }
}
