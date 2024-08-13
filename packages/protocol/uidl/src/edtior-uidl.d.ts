import type { CoreUidlExpression } from './core-uidl'
import type {
  Uidl,
  UidlBaseExpression,
  UidlElement,
  UidlExpressionArray,
  UidlExpressionObject,
  UidlExpressionSlot,
  UidlUnknownExpression,
} from './uidl'

/**
 * 编辑器 UIDL
 */
export interface EditorUidl<
  Expression extends EditorUidlExpression = EditorUidlExpression,
  Element extends EditorUidlElement<Expression> = EditorUidlElement<Expression>,
> extends Uidl<Expression, Element> {
  /**
   * 编辑器名称，用于区分 UIDL 由哪个编辑器产生，下发运行时前可以删除
   */
  editorName?: string
}

/**
 * 编辑器 UIDL 元素，即组件实例
 */
export interface EditorUidlElement<
  Expression extends EditorUidlExpression = EditorUidlExpression,
> extends UidlElement<Expression> {
  /**
   * 名称，用于辅助编辑，下发运行时前可以删除
   */
  name: string
}

/**
 * 编辑器 UIDL 表达式
 */
export type EditorUidlExpression =
  | CoreUidlExpression
  | UidlUnknownExpression
  | UidlExpressionObject<EditorUidlExpression>
  | UidlExpressionArray<EditorUidlExpression>
  | UidlExpressionSlot<EditorUidlExpression, EditorUidlElement>
  | UidlExpressionBox<EditorUidlExpression>

/**
 * 盒子表达式，除了表达式本身，还可以携带一些其他的信息，下发运行时前可以替换为内部表达式
 */
export interface UidlExpressionBox<
  Expression extends EditorUidlExpression = EditorUidlExpression,
> extends UidlBaseExpression {
  /**
   * 类型
   */
  type: 'box'
  /**
   * 表达式
   */
  expr?: Expression
  /**
   * 盒子类型
   */
  boxType: string & {}
}
