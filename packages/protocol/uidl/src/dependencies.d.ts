import type { Code, ProCode } from './code'

/**
 * UIDL 依赖
 */
export type UidlDependency =
  | UidlComponentLibraryDependency
  | UidlUtilsDependency

/**
 * UIDL 依赖类型
 */
export type UidlDependencyType = NonNullable<UidlDependency['type']>

/**
 * UIDL 依赖基础部分
 */
export interface UidlDependencyBase {
  /**
   * 类型
   */
  type: string
  /**
   * 包名
   */
  pkgName: string
  /**
   * 包版本
   */
  pkgVersion: string
}

/**
 * UIDL 组件库依赖
 */
export interface UidlComponentLibraryDependency extends UidlDependencyBase {
  /**
   * 类型
   */
  type: 'component-library'
  /**
   * 所有组件代码，组件类型 -> 代码
   */
  codes: Record<string, Code>
}

/**
 * UIDL 工具集依赖
 */
export interface UidlUtilsDependency extends UidlDependencyBase {
  /**
   * 类型
   */
  type: 'utils'
  /**
   * 代码
   */
  code: ProCode
}
