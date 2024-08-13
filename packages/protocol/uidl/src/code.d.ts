import type { Uidl } from './uidl'

/**
 * 代码
 */
export type Code = ProCode | LowCode

/**
 * 代码类型
 */
export type CodeType = NonNullable<Code['type']>

/**
 * 代码基础部分
 */
export interface CodeBase {
  /**
   * 类型
   */
  type?: string
  /**
   * 导入路径，指最终 `ctx.dependencies[pkgName]` 里的路径，默认为: `['default']`
   */
  importPath?: (string | number)[]
}

/**
 * 全代码
 */
export type ProCode = FromDependenciesProCode | FromUnknownProCode

/**
 * 全代码基础部分
 */
export interface ProCodeBase extends CodeBase {
  /**
   * 类型
   */
  type?: 'pro'
  /**
   * 来源
   */
  from?: string
  /**
   * 导出路径，默认为: `['default']`
   */
  exportPath?: (string | number)[]
}

/**
 * 来自（运行时初始化时，外部提供的）dependencies 全代码
 */
export interface FromDependenciesProCode extends ProCodeBase {
  /**
   * 来源
   */
  from?: 'dependencies'
}

/**
 * 未知来源全代码，由其他插件扩展，比如：esm、cjs 等
 */
export interface FromUnknownProCode extends ProCodeBase {
  /**
   * 来源
   */
  from: string & {}
  /**
   * 扩展字段
   */
  [key: string]: unknown
}

/**
 * 低代码
 */
export interface LowCode extends CodeBase {
  /**
   * 类型
   */
  type: 'low'
  /**
   * UIDL
   */
  uidl: Uidl
}
