import type { JsonPath } from '@p-lc/shared'
import type { Uidl } from '@p-lc/uidl'
import type {
  ElementOfUidl,
  EntityDetailTypeElement,
  EntityDetailTypeExpression,
  ExpressionOfUidl,
} from '../types'

/**
 * UIDL 工具集配置，需要提供 UIDL 扩展内容的处理方式
 */
export interface UidlUtilsConfig<U extends Uidl = Uidl> {
  /**
   * UIDL 生成器，字段名 -> 生成器
   */
  uidlGenerators: Record<string, UidlGenerator<U> | undefined>
  /**
   * 元素生成器，字段名 -> 生成器
   */
  elementGenerators: Record<string, ElementGenerator<U> | undefined>
  /**
   * 表达式生成器，表达式类型 -> 生成器
   */
  expressionGenerators: Record<string, ExpressionGenerator<U> | undefined>
  /**
   * UIDL 逻辑获取器，字段名 -> 获取器
   */
  uidlLogicGetters: Record<string, UidlLogicGetter<U> | undefined>
  /**
   * 元素逻辑获取器，字段名 -> 获取器
   */
  elementLogicGetters: Record<string, ElementLogicGetter<U> | undefined>
  /**
   * 表达式逻辑获取器，字段名 -> 获取器
   */
  expressionLogicGetters: Record<string, ExpressionLogicGetter<U> | undefined>
  /**
   * UIDL 逻辑设置器，字段名 -> 设置器
   */
  uidlLogicSetters: Record<string, UidlLogicSetter<U> | undefined>
  /**
   * 元素逻辑设置器，字段名 -> 设置器
   */
  elementLogicSetters: Record<string, ElementLogicSetter<U> | undefined>
  /**
   * 表达式逻辑设置器，字段名 -> 设置器
   */
  expressionLogicSetters: Record<string, ExpressionLogicSetter<U> | undefined>
  /**
   * UIDL 压缩器，字段名 -> 压缩器
   */
  uidlMinifiers: Record<string, UidlMinifier<U> | undefined>
  /**
   * 元素 压缩器，字段名 -> 压缩器
   */
  elementMinifiers: Record<string, ElementMinifier<U> | undefined>
  /**
   * 表达式压缩器，字段名 -> 压缩器
   */
  expressionMinifiers: Record<string, ExpressionMinifier<U> | undefined>
}

/**
 * UIDL 生成器，生成所有直接子实体
 */
export interface UidlGenerator<U extends Uidl = Uidl> {
  /**
   * UIDL 生成器，生成所有直接子实体
   * @param uidl UIDL
   */
  (uidl: U): Generator<ChildEntityDetail<U>, void, unknown>
}

/**
 * 元素生成器，生成所有直接子实体
 */
export interface ElementGenerator<U extends Uidl = Uidl> {
  /**
   * 元素生成器，生成所有直接子实体
   * @param element 元素
   */
  (element: ElementOfUidl<U>): Generator<ChildEntityDetail<U>, void, unknown>
}

/**
 * 表达式生成器，生成所有直接子实体
 */
export interface ExpressionGenerator<U extends Uidl = Uidl> {
  /**
   * 表达式生成器，生成所有直接子实体
   * @param expression 表达式
   */
  (
    expression: ExpressionOfUidl<U>,
  ): Generator<ChildEntityDetail<U>, void, unknown>
}

/**
 * 子实体详情
 */
export type ChildEntityDetail<U extends Uidl = Uidl> =
  | ChildElementDetail<U>
  | ChildExpressionDetail<U>

/**
 * 子实体详情基础部分
 */
export interface ChildEntityDetailBase {
  /**
   * JSON 路径
   */
  jsonPath: JsonPath
  /**
   * 逻辑路径
   */
  logicPath: JsonPath
}

/**
 * 子元素详情
 */
export interface ChildElementDetail<U extends Uidl = Uidl>
  extends ChildEntityDetailBase {
  /**
   * 类型
   */
  type: EntityDetailTypeElement
  /**
   * 元素
   */
  element: ElementOfUidl<U>
}

/**
 * 子表达式详情
 */
export interface ChildExpressionDetail<U extends Uidl = Uidl>
  extends ChildEntityDetailBase {
  /**
   * 类型
   */
  type: EntityDetailTypeExpression
  /**
   * 表达式
   */
  expression: ExpressionOfUidl<U>
}

/**
 * UIDL 逻辑获取器
 */
export interface UidlLogicGetter<U extends Uidl = Uidl> {
  /**
   * UIDL 逻辑获取器
   * @param uidl UIDL
   * @param logicPath 逻辑路径，长度大于 0
   * @param helper 助手
   */
  (
    uidl: U,
    logicPath: JsonPath,
    helper: LogicGetterHelper<U>,
  ): GetterEntityDetail<U>
}

/**
 * 元素逻辑获取器
 */
export interface ElementLogicGetter<U extends Uidl = Uidl> {
  /**
   * 元素逻辑获取器
   * @param element 元素
   * @param logicPath 逻辑路径，长度大于 0
   * @param helper 助手
   */
  (
    element: ElementOfUidl<U>,
    logicPath: JsonPath,
    helper: LogicGetterHelper<U>,
  ): GetterEntityDetail<U>
}

/**
 * 表达式逻辑获取器
 */
export interface ExpressionLogicGetter<U extends Uidl = Uidl> {
  /**
   * 表达式逻辑获取器
   * @param expression 表达式
   * @param logicPath 逻辑路径，长度大于 0
   * @param helper 助手
   */
  (
    expression: ExpressionOfUidl<U>,
    logicPath: JsonPath,
    helper: LogicGetterHelper<U>,
  ): GetterEntityDetail<U>
}

/**
 * 逻辑获取器助手
 */
export interface LogicGetterHelper<U extends Uidl = Uidl> {
  /**
   * 在元素中获取
   * @param element 元素
   * @param logicPath 逻辑路径，长度可以为 0
   */
  getInElement(
    element: ElementOfUidl<U>,
    logicPath: JsonPath,
  ): GetterEntityDetail<U>
  /**
   * 在表达式中获取
   * @param expression 表达式
   * @param logicPath 逻辑路径，长度可以为 0
   */
  getInExpression(
    expression: ExpressionOfUidl<U>,
    logicPath: JsonPath,
  ): GetterEntityDetail<U>
}

/**
 * 获取器实体详情，`undefined` 表示实体不存在
 */
export type GetterEntityDetail<U extends Uidl = Uidl> =
  | undefined
  | Omit<ChildElementDetail<U>, 'logicPath'>
  | (Omit<ChildExpressionDetail<U>, 'logicPath'> & {
      /**
       * 是表达式的一部分，比如静态表达式里的某个字段，默认：false
       */
      isPart?: boolean
    })

/**
 * UIDL 逻辑设置器
 */
export interface UidlLogicSetter<U extends Uidl = Uidl> {
  /**
   * UIDL 逻辑获取器
   * @param uidl UIDL
   * @param logicPath 逻辑路径，长度大于 0
   * @param entity 实体
   * @param helper 助手
   */
  (
    uidl: U,
    logicPath: JsonPath,
    entity: SetterEntityDetail<U>,
    helper: LogicSetterHelper<U>,
  ): U
}

/**
 * 元素逻辑设置器
 */
export interface ElementLogicSetter<U extends Uidl = Uidl> {
  /**
   * 元素逻辑获取器
   * @param element 元素
   * @param logicPath 逻辑路径，长度大于 0
   * @param entity 实体
   * @param helper 助手
   */
  (
    element: ElementOfUidl<U>,
    logicPath: JsonPath,
    entity: SetterEntityDetail<U>,
    helper: LogicSetterHelper<U>,
  ): ElementOfUidl<U> | undefined
}

/**
 * 表达式逻辑设置器
 */
export interface ExpressionLogicSetter<U extends Uidl = Uidl> {
  /**
   * 表达式逻辑获取器
   * @param expression 表达式
   * @param logicPath 逻辑路径，长度大于 0
   * @param entity 实体
   * @param helper 助手
   */
  (
    expression: ExpressionOfUidl<U>,
    logicPath: JsonPath,
    entity: SetterEntityDetail<U>,
    helper: LogicSetterHelper<U>,
  ): ExpressionOfUidl<U> | undefined
}

/**
 * 逻辑设置器助手
 */
export interface LogicSetterHelper<U extends Uidl = Uidl> {
  /**
   * 在元素中设置
   * @param element 元素
   * @param logicPath 逻辑路径，长度可以为 0
   * @param entity 实体
   */
  setInElement(
    element: ElementOfUidl<U>,
    logicPath: JsonPath,
    entity: SetterEntityDetail<U>,
  ): ElementOfUidl<U> | undefined
  /**
   * 在表达式中设置
   * @param expression 表达式
   * @param logicPath 逻辑路径，长度可以为 0
   * @param entity 实体
   */
  setInExpression(
    expression: ExpressionOfUidl<U>,
    logicPath: JsonPath,
    entity: SetterEntityDetail<U>,
  ): ExpressionOfUidl<U> | undefined
}

/**
 * 设置器实体详情，`undefined` 表示删除
 */
export type SetterEntityDetail<U extends Uidl = Uidl> =
  | undefined
  | Omit<ChildElementDetail<U>, 'logicPath' | 'jsonPath'>
  | Omit<ChildExpressionDetail<U>, 'logicPath' | 'jsonPath'>

/**
 * UIDL 压缩器
 */
export interface UidlMinifier<U extends Uidl = Uidl> {
  /**
   * UIDL 压缩器
   * @param uidl UIDL
   * @param helper 助手
   */
  (uidl: U, helper: MinifierHelper<U>): U
}

/**
 * 元素压缩器
 */
export interface ElementMinifier<U extends Uidl = Uidl> {
  /**
   * 元素压缩器
   * @param element 元素
   * @param helper 助手
   */
  (element: ElementOfUidl<U>, helper: MinifierHelper<U>): ElementOfUidl<U>
}

/**
 * 表达式压缩器
 */
export interface ExpressionMinifier<U extends Uidl = Uidl> {
  /**
   * 表达式压缩器
   * @param expression 表达式
   * @param helper 助手
   */
  (
    expression: ExpressionOfUidl<U>,
    helper: MinifierHelper<U>,
  ): ExpressionOfUidl<U>
}

/**
 * 压缩器助手
 */
export interface MinifierHelper<U extends Uidl = Uidl> {
  /**
   * 压缩元素
   * @param element 元素
   */
  minifyElement(element: ElementOfUidl<U>): ElementOfUidl<U>
  /**
   * 压缩表达式
   * @param expression 表达式
   */
  minifyExpression(expression: ExpressionOfUidl<U>): ExpressionOfUidl<U>
}
