import type { Uidl } from '@p-lc/uidl'
import type { UidlUtilsConfig } from '../../config'
import {
  ENTITY_DETAIL_TYPE_ELEMENT,
  ENTITY_DETAIL_TYPE_EXPRESSION,
} from '../../constants'
import type {
  ElementOfUidl,
  EntityDetailType,
  EntityDetailTypeElement,
  EntityDetailTypeExpression,
  ExpressionOfUidl,
} from '../../types'
import { normalizeTraverseOptions } from '../options'
import type {
  TraverseElementDetail,
  TraverseEntityDetail,
  TraverseExpressionDetail,
  TraverseOptions,
} from '../types'
import {
  internalDfsEntity,
  internalDfsEntityInElement,
  internalDfsEntityInExpression,
} from './internal'

/**
 * 深度优先搜索实体
 * @param config UIDL 工具集配置
 * @param uidl UIDL
 * @param options 选项
 */
export function* dfsEntity<
  U extends Uidl = Uidl,
  T extends EntityDetailType = EntityDetailType,
>(
  config: UidlUtilsConfig<U>,
  uidl: U,
  options?: Partial<TraverseOptions<T>>,
): Generator<TraverseEntityDetail<U, T>, void, unknown> {
  yield* internalDfsEntity(config, uidl, normalizeTraverseOptions(options))
}

/**
 * 深度优先搜索元素
 * @param config UIDL 工具集配置
 * @param uidl UIDL
 * @param options 选项
 */
export function* dfsElement<U extends Uidl = Uidl>(
  config: UidlUtilsConfig<U>,
  uidl: U,
  options?: Partial<TraverseOptions<EntityDetailTypeElement>>,
): Generator<TraverseElementDetail<U>, void, unknown> {
  yield* internalDfsEntity(
    config,
    uidl,
    normalizeTraverseOptions(
      {
        entityDetailTypes: [ENTITY_DETAIL_TYPE_ELEMENT],
      },
      options,
    ),
  )
}

/**
 * 深度优先搜索元素
 * @param config UIDL 工具集配置
 * @param uidl UIDL
 * @param options 选项
 */
export function* dfsExpression<U extends Uidl = Uidl>(
  config: UidlUtilsConfig<U>,
  uidl: U,
  options?: Partial<TraverseOptions<EntityDetailTypeExpression>>,
): Generator<TraverseExpressionDetail<U>, void, unknown> {
  yield* internalDfsEntity(
    config,
    uidl,
    normalizeTraverseOptions(
      {
        entityDetailTypes: [ENTITY_DETAIL_TYPE_EXPRESSION],
      },
      options,
    ),
  )
}

/**
 * 在元素中深度优先搜索实体
 * @param config UIDL 工具集配置
 * @param element 元素
 * @param options 选项
 */
export function* dfsEntityInElement<
  U extends Uidl = Uidl,
  T extends EntityDetailType = EntityDetailType,
>(
  config: UidlUtilsConfig<U>,
  element: ElementOfUidl<U>,
  options?: Partial<TraverseOptions<T>>,
): Generator<TraverseEntityDetail<U, T>, void, unknown> {
  yield* internalDfsEntityInElement(
    config,
    {
      type: ENTITY_DETAIL_TYPE_ELEMENT,
      element,
      jsonPath: [],
      logicPath: [],
    },
    [],
    [],
    [element.id],
    normalizeTraverseOptions(options),
  )
}

/**
 * 在元素中深度优先搜索元素
 * @param config UIDL 工具集配置
 * @param element 元素
 * @param options 选项
 */
export function* dfsElementInElement<U extends Uidl = Uidl>(
  config: UidlUtilsConfig<U>,
  element: ElementOfUidl<U>,
  options?: Partial<TraverseOptions<EntityDetailTypeElement>>,
): Generator<TraverseElementDetail<U>, void, unknown> {
  yield* internalDfsEntityInElement(
    config,
    {
      type: ENTITY_DETAIL_TYPE_ELEMENT,
      element,
      jsonPath: [],
      logicPath: [],
    },
    [],
    [],
    [element.id],
    normalizeTraverseOptions(
      {
        entityDetailTypes: [ENTITY_DETAIL_TYPE_ELEMENT],
      },
      options,
    ),
  )
}

/**
 * 在元素中深度优先搜索表达式
 * @param config UIDL 工具集配置
 * @param element 元素
 * @param options 选项
 */
export function* dfsExpressionInElement<U extends Uidl = Uidl>(
  config: UidlUtilsConfig<U>,
  element: ElementOfUidl<U>,
  options?: Partial<TraverseOptions<EntityDetailTypeExpression>>,
): Generator<TraverseExpressionDetail<U>, void, unknown> {
  yield* internalDfsEntityInElement(
    config,
    {
      type: ENTITY_DETAIL_TYPE_ELEMENT,
      element,
      jsonPath: [],
      logicPath: [],
    },
    [],
    [],
    [element.id],
    normalizeTraverseOptions(
      {
        entityDetailTypes: [ENTITY_DETAIL_TYPE_EXPRESSION],
      },
      options,
    ),
  )
}

/**
 * 在表达式中深度优先搜索实体
 * @param config UIDL 工具集配置
 * @param expression 表达式
 * @param options 选项
 */
export function* dfsEntityInExpression<
  U extends Uidl = Uidl,
  T extends EntityDetailType = EntityDetailType,
>(
  config: UidlUtilsConfig<U>,
  expression: ExpressionOfUidl<U>,
  options?: Partial<TraverseOptions<T>>,
): Generator<TraverseEntityDetail<U, T>, void, unknown> {
  yield* internalDfsEntityInExpression(
    config,
    {
      type: ENTITY_DETAIL_TYPE_EXPRESSION,
      expression,
      jsonPath: [],
      logicPath: [],
    },
    [],
    [],
    [],
    normalizeTraverseOptions(options),
  )
}

/**
 * 在表达式中深度优先搜索元素
 * @param config UIDL 工具集配置
 * @param expression 表达式
 * @param options 选项
 */
export function* dfsElementInExpression<U extends Uidl = Uidl>(
  config: UidlUtilsConfig<U>,
  expression: ExpressionOfUidl<U>,
  options?: Partial<TraverseOptions<EntityDetailTypeElement>>,
): Generator<TraverseElementDetail<U>, void, unknown> {
  yield* internalDfsEntityInExpression(
    config,
    {
      type: ENTITY_DETAIL_TYPE_EXPRESSION,
      expression,
      jsonPath: [],
      logicPath: [],
    },
    [],
    [],
    [],
    normalizeTraverseOptions(
      {
        entityDetailTypes: [ENTITY_DETAIL_TYPE_ELEMENT],
      },
      options,
    ),
  )
}

/**
 * 在表达式中深度优先搜索表达式
 * @param config UIDL 工具集配置
 * @param expression 表达式
 * @param options 选项
 */
export function* dfsExpressionInExpression<U extends Uidl = Uidl>(
  config: UidlUtilsConfig<U>,
  expression: ExpressionOfUidl<U>,
  options?: Partial<TraverseOptions<EntityDetailTypeExpression>>,
): Generator<TraverseExpressionDetail<U>, void, unknown> {
  yield* internalDfsEntityInExpression(
    config,
    {
      type: ENTITY_DETAIL_TYPE_EXPRESSION,
      expression,
      jsonPath: [],
      logicPath: [],
    },
    [],
    [],
    [],
    normalizeTraverseOptions(
      {
        entityDetailTypes: [ENTITY_DETAIL_TYPE_EXPRESSION],
      },
      options,
    ),
  )
}
