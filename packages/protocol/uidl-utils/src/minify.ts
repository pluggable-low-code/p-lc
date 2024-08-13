import { definedValues, echo } from '@p-lc/shared'
import type { Uidl } from '@p-lc/uidl'
import type { MinifierHelper, UidlUtilsConfig } from './config'
import { getExpressionType } from './expression'
import type { ElementOfUidl, ExpressionOfUidl } from './types'

/**
 * 创建压缩器助手
 * @param config UIDL 工具集配置
 */
export function createMinifierHelper<U extends Uidl = Uidl>(
  config: UidlUtilsConfig<U>,
): MinifierHelper<U> {
  const helper: MinifierHelper<U> = {
    minifyElement(element) {
      for (const fn of definedValues(config.elementMinifiers)) {
        element = fn(element, helper)
      }
      return element
    },
    minifyExpression(expr) {
      const fn = config.expressionMinifiers[getExpressionType(expr)]
      return fn ? fn(expr, helper) : expr
    },
  }
  return helper
}

/**
 * 压缩 UIDL，有损，只保留运行时需要的部分
 * @param config UIDL 工具集配置
 * @param uidl UIDL
 */
export function minify<U extends Uidl = Uidl>(
  config: UidlUtilsConfig<U>,
  uidl: U,
): U {
  const helper = createMinifierHelper(config)
  for (const fn of definedValues(config.uidlMinifiers)) {
    uidl = fn(uidl, helper)
  }
  return uidl
}

/**
 * 压缩元素，有损，只保留运行时需要的部分
 * @param config UIDL 工具集配置
 * @param element 元素
 */
export function minifyElement<U extends Uidl = Uidl>(
  config: UidlUtilsConfig<U>,
  element: ElementOfUidl<U>,
): ElementOfUidl<U> {
  const { minifyElement: m } = createMinifierHelper(config)
  return m(element)
}

/**
 * 压缩表达式，有损，只保留运行时需要的部分
 * @param config UIDL 工具集配置
 * @param expression 表达式
 */
export function minifyExpression<U extends Uidl = Uidl>(
  config: UidlUtilsConfig<U>,
  expression: ExpressionOfUidl<U>,
): ExpressionOfUidl<U> {
  const { minifyExpression: m } = createMinifierHelper(config)
  return m(expression)
}

/**
 * 浅压缩表达式，不含表达式内的元素，有损，只保留运行时需要的部分
 * @param config UIDL 工具集配置
 * @param expression 表达式
 */
export function minifyExpressionShallow<U extends Uidl = Uidl>(
  config: UidlUtilsConfig<U>,
  expression: ExpressionOfUidl<U>,
): ExpressionOfUidl<U> {
  const helper = createMinifierHelper(config)
  helper.minifyElement = echo
  const { minifyExpression: m } = helper
  return m(expression)
}
