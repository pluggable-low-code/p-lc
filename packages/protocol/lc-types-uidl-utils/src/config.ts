import type { LcTypesUidl } from '@p-lc/lc-types-uidl'
import { arrayableToArray } from '@p-lc/shared'
import type { UidlUtilsConfig } from '@p-lc/uidl-utils'
import {
  defaultEditorUidlUtilsConfig,
  ENTITY_DETAIL_TYPE_EXPRESSION,
  getStaticExpressionValue,
} from '@p-lc/uidl-utils'
import { isArray, isNumber, isString, isUndefined, merge } from 'lodash-uni'

/**
 * 低代码类型 UIDL 工具集配置
 */
export const lcTypesUidlUtilsConfig: UidlUtilsConfig<LcTypesUidl> = merge(
  {},
  defaultEditorUidlUtilsConfig as unknown as UidlUtilsConfig<LcTypesUidl>,
  {
    elementGenerators: {
      *logicPath({ logicPath: expr }) {
        if (!isUndefined(expr)) {
          yield {
            type: ENTITY_DETAIL_TYPE_EXPRESSION,
            expression: expr,
            jsonPath: ['logicPath'],
            logicPath: ['logicPath'],
          }
        }
      },
    },
    elementLogicGetters: {
      logicPath({ logicPath: expr }, logicPath, { getInExpression }) {
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
    elementLogicSetters: {
      logicPath(element, logicPath, entity, { setInExpression }) {
        const childRet = setInExpression(
          element.logicPath ?? null,
          logicPath.slice(1),
          entity,
        )
        const value = childRet && getStaticExpressionValue(childRet)
        if (isArray(value) || isNumber(value) || isString(value)) {
          element.logicPath = arrayableToArray(value)
        } else {
          delete element.logicPath
        }
        return element
      },
    },
  } as Partial<UidlUtilsConfig<LcTypesUidl>>,
)
