import type { I18nResource } from '@p-lc/shared'
import type { UidlBaseExpression, UidlExpression } from '@p-lc/uidl'
import { getExpressionType } from '@p-lc/uidl-utils'
import { merge } from 'lodash-uni'

/**
 * UIDL 国际化扩展
 */
export interface UidlExtI18n {
  /**
   * 国际化资源
   */
  i18n?: I18nResource
}

/**
 * 国际化表达式类型
 */
export const EXPRESSION_TYPE_I18N = 'i18n'

/**
 * 国际化表达式
 */
export interface UidlExpressionI18n extends UidlBaseExpression {
  /**
   * 类型
   */
  type: typeof EXPRESSION_TYPE_I18N
  /**
   * （国际化语言资源的）键值
   */
  key: string
}

/**
 * 是国际化表达式
 * @param expr 表达式
 */
export function isI18nExpression(
  expr?: UidlExpression,
): expr is UidlExpressionI18n {
  return !!expr && getExpressionType(expr) === EXPRESSION_TYPE_I18N
}

/**
 * 合并国际化资源，原地修改
 * @param uidl UIDL
 * @param i18nResource 国际化资源
 * @returns 新的 UIDL
 */
export function mergeI18nResource<U extends UidlExtI18n>(
  uidl: U,
  i18nResource: I18nResource,
): void {
  uidl.i18n = merge(uidl.i18n, i18nResource)
}
