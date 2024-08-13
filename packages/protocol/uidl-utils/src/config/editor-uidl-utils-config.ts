import type {
  EditorUidl,
  EditorUidlElement,
  UidlElement,
  UidlExpressionBox,
} from '@p-lc/uidl'
import { isUndefined, merge } from 'lodash-uni'
import {
  ENTITY_DETAIL_TYPE_EXPRESSION,
  EXPRESSION_TYPE_BOX,
} from '../constants'
import type { UidlUtilsConfig } from './types'
import { defaultUidlUtilsConfig } from './uidl-utils-config'

/**
 * 默认编辑器 UIDL 工具集配置
 */
export const defaultEditorUidlUtilsConfig: UidlUtilsConfig<EditorUidl> = merge(
  {},
  defaultUidlUtilsConfig as unknown as UidlUtilsConfig<EditorUidl>,
  {
    expressionGenerators: {
      *[EXPRESSION_TYPE_BOX](expression) {
        const expr = expression as UidlExpressionBox
        yield {
          type: ENTITY_DETAIL_TYPE_EXPRESSION,
          expression: expr.expr,
          jsonPath: ['expr'],
          logicPath: [],
        }
      },
    },
    expressionLogicGetters: {
      [EXPRESSION_TYPE_BOX](expression, logicPath, { getInExpression }) {
        const expr = expression as UidlExpressionBox
        const childRet = getInExpression(expr.expr ?? null, logicPath)
        if (!childRet) return childRet
        return {
          ...childRet,
          jsonPath: ['expr', ...childRet.jsonPath],
        }
      },
    },
    expressionLogicSetters: {
      [EXPRESSION_TYPE_BOX](
        expression,
        logicPath,
        entity,
        { setInExpression },
      ) {
        const expr = expression as UidlExpressionBox
        const childRet = setInExpression(expr.expr ?? null, logicPath, entity)
        if (isUndefined(childRet)) return childRet
        expr.expr = childRet
        return expr
      },
    },
    uidlMinifiers: {
      editorName(uidl) {
        delete uidl.editorName
        return uidl
      },
    },
    elementMinifiers: {
      name(element) {
        delete (element as EditorUidlElement | UidlElement).name
        return element
      },
    },
    expressionMinifiers: {
      [EXPRESSION_TYPE_BOX](expression, { minifyExpression }) {
        const expr = expression as UidlExpressionBox
        const innerExpr = expr.expr
        return innerExpr && minifyExpression(innerExpr)
      },
    },
  } as Partial<UidlUtilsConfig<EditorUidl>>,
)
