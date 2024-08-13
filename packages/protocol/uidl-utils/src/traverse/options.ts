import { assign } from 'lodash-uni'
import {
  ENTITY_DETAIL_TYPE_ELEMENT,
  ENTITY_DETAIL_TYPE_EXPRESSION,
  TRAVERSE_TIME_ENTER,
} from '../constants'
import type { EntityDetailType } from '../types'
import type { TraverseOptions } from './types'

/**
 * 默认遍历选项
 */
export const defaultTraverseOptions: TraverseOptions = {
  entityDetailTypes: [
    ENTITY_DETAIL_TYPE_ELEMENT,
    ENTITY_DETAIL_TYPE_EXPRESSION,
  ],
  traverseTimes: [TRAVERSE_TIME_ENTER],
  elementIdPathMaxLength: Infinity,
}

/**
 * 标准化遍历选项
 * @param optionsList 选项列表
 */
export function normalizeTraverseOptions<
  T extends EntityDetailType = EntityDetailType,
>(
  ...optionsList: (Partial<TraverseOptions<T>> | undefined)[]
): TraverseOptions<T> {
  return assign({}, defaultTraverseOptions, ...optionsList)
}
