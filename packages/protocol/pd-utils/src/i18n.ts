import type { I18nResource, I18nText, Text } from '@p-lc/pd'
import { countKeys, isObjectButNotArray } from '@p-lc/shared'
import type { UidlExpression } from '@p-lc/uidl'
import {
  EXPRESSION_TYPE_I18N,
  isI18nExpression,
  type UidlExpressionI18n,
} from '@p-lc/uidl-ext-i18n'
import { getStaticExpressionValue } from '@p-lc/uidl-utils'
import { isObject, isString, mapKeys, mapValues, pick } from 'lodash-uni'
import { TEXT_TYPE_I18N } from './constants'

/**
 * 合并包名到国际化键值
 * @param pkgName 包名
 * @param key 键值
 */
export function mergePkgNameToI18nKey(pkgName: string, key: string): string {
  return `${pkgName}$_$${key}`
}

/**
 * 合并包名到国际化资源，返回新对象
 * @param pkgName 包名
 * @param i18n 国际化资源
 */
export function mergePkgNameToI18nResource(
  pkgName: string,
  i18n: I18nResource,
): I18nResource {
  return mapValues(i18n, (i18nLng) =>
    mapKeys(i18nLng, (...[, key]) => mergePkgNameToI18nKey(pkgName, key)),
  )
}

/**
 * 是文本，字符串文本或国际化文本
 * @param v 值
 */
export function isText(v: unknown): v is Text {
  if (isString(v)) return true
  if (isObjectButNotArray(v)) {
    const { type = TEXT_TYPE_I18N, key, ...rest } = v as I18nText
    return type === TEXT_TYPE_I18N && isString(key) && !countKeys(rest)
  }
  return false
}

/**
 * UIDL 表达式转文本
 * @param expr 表达式
 */
export function uidlExpressionToText(
  expr?: UidlExpression | undefined,
): Text | undefined {
  if (isI18nExpression(expr)) return pick(expr, 'key')
  const value = getStaticExpressionValue(expr)
  if (isString(value)) return value
}

/**
 * 文本转 UIDL 表达式
 * @param text 文本
 */
export function textToUidlExpression(
  text?: Text | undefined,
): UidlExpression | undefined {
  if (!isObject(text)) return text
  return {
    ...text,
    type: EXPRESSION_TYPE_I18N,
  } satisfies UidlExpressionI18n
}
