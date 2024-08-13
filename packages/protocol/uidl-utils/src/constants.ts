import { STR_CHILDREN, STR_DEFAULT, STR_PROPS, STR_STATIC } from '@p-lc/shared'
import type {
  DefaultPkgName,
  FromDependenciesProCode,
  LowCode,
  ProCodeBase,
  UidlComponentLibraryDependency,
  UidlExpressionArray,
  UidlExpressionBox,
  UidlExpressionObject,
  UidlExpressionSlot,
  UidlExpressionStatic,
  UidlUtilsDependency,
} from '@p-lc/uidl'

/**
 * 静态表达式类型
 */
export const EXPRESSION_TYPE_STATIC: UidlExpressionStatic['type'] = STR_STATIC

/**
 * 对象表达式类型
 */
export const EXPRESSION_TYPE_OBJECT: UidlExpressionObject['type'] = 'object'

/**
 * 数组表达式类型
 */
export const EXPRESSION_TYPE_ARRAY: UidlExpressionArray['type'] = 'array'

/**
 * 插槽表达式类型
 */
export const EXPRESSION_TYPE_SLOT: UidlExpressionSlot['type'] = 'slot'

/**
 * 盒子表达式类型
 */
export const EXPRESSION_TYPE_BOX: UidlExpressionBox['type'] = 'box'

/**
 * 默认包名
 */
export const DEFAULT_PKG_NAME: DefaultPkgName = ''

/**
 * 默认包版本
 */
export const DEFAULT_PKG_VERSION: DefaultPkgName = ''

/**
 * UIDL 组件库依赖类型
 */
export const UIDL_DEPENDENCY_TYPE_COMPONENT_LIBRARY: NonNullable<
  UidlComponentLibraryDependency['type']
> = 'component-library'

/**
 * UIDL 工具集依赖类型
 */
export const UIDL_DEPENDENCY_TYPE_UTILS: UidlUtilsDependency['type'] = 'utils'

/**
 * 默认 UIDL 依赖类型
 */
export const DEFAULT_UIDL_DEPENDENCY_TYPE =
  UIDL_DEPENDENCY_TYPE_COMPONENT_LIBRARY

/**
 * 全代码类型
 */
export const CODE_TYPE_PRO: NonNullable<ProCodeBase['type']> = 'pro'

/**
 * 低代码类型
 */
export const CODE_TYPE_LOW: LowCode['type'] = 'low'

/**
 * 默认代码类型
 */
export const DEFAULT_CODE_TYPE = CODE_TYPE_PRO

/**
 * 默认全代码来源
 */
export const DEFAULT_PRO_CODE_FROM =
  'dependencies' satisfies FromDependenciesProCode['from']

/**
 * 默认导入导出路径
 */
export const DEFAULT_IMPORT_EXPORT_PATH = [STR_DEFAULT]

/**
 * 实体详情类型：元素
 */
export const ENTITY_DETAIL_TYPE_ELEMENT = 'element'

/**
 * 实体详情类型：表达式
 */
export const ENTITY_DETAIL_TYPE_EXPRESSION = 'expression'

/**
 * 遍历时机：进入
 */
export const TRAVERSE_TIME_ENTER = 'enter'

/**
 * 遍历时机：离开
 */
export const TRAVERSE_TIME_EXIT = 'exit'

/**
 * 默认子元素插槽（children）对应的逻辑路径
 */
export const childrenSlotLogicPath = [STR_PROPS, STR_CHILDREN]

/**
 * 元素类型分隔符，用于分割元素类型，比如：`'Button_0'`
 */
export const ELEMENT_TYPE_SEPARATOR = '_'
