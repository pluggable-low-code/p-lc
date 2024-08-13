import type { Uidl } from '@p-lc/uidl'
import type { UidlUtilsConfig } from '../config'
import {
  ENTITY_DETAIL_TYPE_ELEMENT,
  ENTITY_DETAIL_TYPE_EXPRESSION,
} from '../constants'
import type {
  ElementOfUidl,
  EntityDetailTypeElement,
  EntityDetailTypeExpression,
  ExpressionOfUidl,
} from '../types'
import { internalDfsEntityInElement } from './dfs/internal'
import { normalizeTraverseOptions } from './options'
import type {
  TraverseElementDetail,
  TraverseExpressionDetail,
  TraverseOptions,
} from './types'

/**
 * 在元素中广度优先搜索所有下一层子元素
 * @param config UIDL 工具集配置
 * @param element 元素
 * @param options 选项
 */
export function* bfsChildElementsInElement<U extends Uidl = Uidl>(
  config: UidlUtilsConfig<U>,
  element: ElementOfUidl<U>,
  options?: Partial<TraverseOptions<EntityDetailTypeElement>>,
): Generator<TraverseElementDetail<U>, void, unknown> {
  for (const ted of internalDfsEntityInElement(
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
        elementIdPathMaxLength: 2,
      },
      options,
    ),
  )) {
    if (ted.element !== element) {
      yield ted
    }
  }
}

/**
 * 在元素中广度优先搜索所有下一层子元素，不含详情
 * @param config UIDL 工具集配置
 * @param element 元素
 * @param options 选项
 */
export function* bfsPureChildElementsInElement<U extends Uidl = Uidl>(
  config: UidlUtilsConfig<U>,
  element: ElementOfUidl<U>,
  options?: Partial<TraverseOptions<EntityDetailTypeElement>>,
): Generator<ElementOfUidl<U>, void, unknown> {
  for (const ted of bfsChildElementsInElement(config, element, options)) {
    yield ted.element
  }
}

/**
 * 在元素中广度优先搜索所有表达式（不含子元素内的表达式）
 * @param config UIDL 工具集配置
 * @param element 元素
 * @param options 选项
 */
export function* bfsChildExpressionsInElement<U extends Uidl = Uidl>(
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
        elementIdPathMaxLength: 1,
      },
      options,
    ),
  )
}

/**
 * 在元素中广度优先搜索所有表达式（不含子元素内的表达式），不含详情
 * @param config UIDL 工具集配置
 * @param element 元素
 * @param options 选项
 */
export function* bfsPureChildExpressionsInElement<U extends Uidl = Uidl>(
  config: UidlUtilsConfig<U>,
  element: ElementOfUidl<U>,
  options?: Partial<TraverseOptions<EntityDetailTypeExpression>>,
): Generator<ExpressionOfUidl<U>, void, unknown> {
  for (const ted of bfsChildExpressionsInElement(config, element, options)) {
    yield ted.expression
  }
}
