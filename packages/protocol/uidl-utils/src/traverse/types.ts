import type { JsonPath } from '@p-lc/shared'
import type { Uidl } from '@p-lc/uidl'
import type {
  ChildElementDetail,
  ChildEntityDetailBase,
  ChildExpressionDetail,
} from '../config'
import type { TRAVERSE_TIME_ENTER, TRAVERSE_TIME_EXIT } from '../constants'
import type {
  EntityDetailType,
  EntityDetailTypeElement,
  EntityDetailTypeExpression,
} from '../types'

/**
 * 遍历实体详情
 */
export type TraverseEntityDetail<
  U extends Uidl = Uidl,
  T extends EntityDetailType = EntityDetailType,
> = T extends EntityDetailTypeElement
  ? TraverseElementDetail<U>
  : T extends EntityDetailTypeExpression
    ? TraverseExpressionDetail<U>
    : never

/**
 * 遍历实体详情基础部分
 */
export interface TraverseEntityDetailBase extends ChildEntityDetailBase {
  /**
   * 遍历时机
   */
  traverseTime: TraverseTime
  /**
   * 从最顶层对象开始的 JSON 路径
   */
  fullJsonPath: JsonPath
  /**
   * 从最顶层对象开始的逻辑路径
   */
  fullLogicPath: JsonPath
  /**
   * 从最顶层对象开始的元素 ID 路径
   */
  elementIdPath: string[]
  /**
   * 当前元素 ID，即 elementIdPath 的最后一项
   */
  elementId: string | null
  /**
   * 父元素 ID，即 elementIdPath 的倒数第二项
   */
  parentElementId: string | null
}

/**
 * 遍历时机
 */
export type TraverseTime =
  | typeof TRAVERSE_TIME_ENTER
  | typeof TRAVERSE_TIME_EXIT

/**
 * 遍历元素详情
 */
export interface TraverseElementDetail<U extends Uidl = Uidl>
  extends TraverseEntityDetailBase,
    ChildElementDetail<U> {}

/**
 * 遍历表达式详情
 */
export interface TraverseExpressionDetail<U extends Uidl = Uidl>
  extends TraverseEntityDetailBase,
    ChildExpressionDetail<U> {}

/**
 * 遍历选项
 */
export interface TraverseOptions<
  T extends EntityDetailType = EntityDetailType,
> {
  /**
   * 需要遍历的实体详情类型，true 表示需要遍历
   */
  entityDetailTypes: T[]
  /**
   * 需要遍历的时机，true 表示需要遍历
   */
  traverseTimes: TraverseTime[]
  /**
   * 元素 ID 路径最大长度
   */
  elementIdPathMaxLength: number
}
