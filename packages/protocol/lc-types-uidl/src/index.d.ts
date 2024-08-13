import type { Cd, CdExtendsKeys, Pd } from '@p-lc/pd'
import type {
  EditorUidl,
  EditorUidlElement,
  EditorUidlExpression,
} from '@p-lc/uidl'
import type { UidlExpressionI18n, UidlExtI18n } from '@p-lc/uidl-ext-i18n'

/**
 * 低代码类型 UIDL
 */
export interface LcTypesUidl
  extends Pick<Cd, CdExtendsKeys>,
    Pick<Pd, 'i18n'>,
    EditorUidl<LcTypesUidlExpression, LcTypesUidlElement>,
    UidlExtI18n {}

/**
 * 低代码类型 UIDL 元素
 */
export interface LcTypesUidlElement
  extends EditorUidlElement<LcTypesUidlExpression> {
  /**
   * 当前元素所编辑的逻辑路径，会累加父元素的逻辑路径
   *
   * logicPath 视为静态表达式的子集
   */
  logicPath?: (string | number)[]
}

/**
 * 低代码类型 UIDL 表达式
 */
export type LcTypesUidlExpression = EditorUidlExpression | UidlExpressionI18n
