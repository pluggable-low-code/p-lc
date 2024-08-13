import { create } from '@p-lc/shared'
import type {
  Code,
  CodeType,
  FromDependenciesProCode,
  ProCode,
  UidlDependency,
} from '@p-lc/uidl'
import { DEFAULT_CODE_TYPE, DEFAULT_PRO_CODE_FROM } from '@p-lc/uidl-utils'
import type { RuntimeRawPlugin } from '../types'
import { type runtimePluginDependencies } from './runtime-plugin-dependencies'
import { type runtimePluginUidl } from './runtime-plugin-uidl'

/**
 * 运行时加载代码插件属性扩展
 */
export interface RuntimePluginLoadCodePropertiesExt {
  runtime: {
    /**
     * 加载代码
     */
    loadCode: CodeLoader
    /**
     * 代码加载器（对照表）
     */
    codeLoaders: Record<CodeType, CodeLoader>
    /**
     * 全代码加载器（对照表）
     */
    proCodeLoaders: Record<string, ProCodeLoader>
  }
}

/**
 * 代码加载器
 */
export interface CodeLoader<C extends Code = Code> {
  /**
   * 代码加载器
   * @param code 代码
   * @param uidlDep UIDL 依赖
   */
  (code: C, uidlDep: UidlDependency): unknown
}

/**
 * 全代码加载器
 */
export interface ProCodeLoader<PC extends ProCode = ProCode> {
  /**
   * 全代码加载器
   * @param code 代码
   * @param uidlDep UIDL 依赖
   */
  (code: PC, uidlDep: UidlDependency): unknown
}

/**
 * 运行时加载代码插件
 */
export const runtimePluginLoadCode: RuntimeRawPlugin<
  RuntimePluginLoadCodePropertiesExt,
  typeof runtimePluginUidl | typeof runtimePluginDependencies
> = {
  id: 'load-code',
  initRuntime(ctx) {
    ctx.loadCode = ((code, uidlDep) => {
      const type = code.type || DEFAULT_CODE_TYPE
      const codeLoader = ctx.codeLoaders[type]
      if (process.env.NODE_ENV === 'development' && !codeLoader) {
        console.error(`Please set codeLoader for type=${type}.`, {
          code,
          uidlDep,
        })
      }
      return codeLoader(code, uidlDep)
    }) as typeof ctx.loadCode
    const codeLoaders = (ctx.codeLoaders = create(
      null,
    ) as typeof ctx.codeLoaders)
    codeLoaders.pro = ((code: ProCode, uidlDep) => {
      const { from: codeFrom = DEFAULT_PRO_CODE_FROM } = code
      const proCodeLoader = ctx.proCodeLoaders[codeFrom]
      if (process.env.NODE_ENV === 'development' && !proCodeLoader) {
        console.error(`Please set proCodeLoader for from=${codeFrom}.`, {
          code,
          uidlDep,
        })
      }
      return proCodeLoader(code, uidlDep)
    }) as typeof codeLoaders.pro
    const proCodeLoaders = (ctx.proCodeLoaders = create(
      null,
    ) as typeof ctx.proCodeLoaders)
    proCodeLoaders[DEFAULT_PRO_CODE_FROM] = ((
      code: FromDependenciesProCode,
      uidlDep,
    ) => {
      void code
      return ctx.dependencies[uidlDep.pkgName]
    }) as ProCodeLoader
  },
}
