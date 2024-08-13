import type { JsonPath, UnknownObject } from '@p-lc/shared'
import { definePropertyByGetter, isPromise } from '@p-lc/shared'
import {
  CODE_TYPE_LOW,
  DEFAULT_IMPORT_EXPORT_PATH,
  UIDL_DEPENDENCY_TYPE_COMPONENT_LIBRARY,
  UIDL_DEPENDENCY_TYPE_UTILS,
} from '@p-lc/uidl-utils'
import { get, set, values } from 'lodash-uni'
import type { RuntimeRawPlugin } from '../types'
import { type runtimePluginDependencies } from './runtime-plugin-dependencies'
import { type runtimePluginLoadCode } from './runtime-plugin-load-code'
import { type runtimePluginUidl } from './runtime-plugin-uidl'

/**
 * 运行时加载依赖插件属性扩展
 */
export interface RuntimePluginLoadDependenciesPropertiesExt {
  runtime: {
    /**
     * 加载依赖
     */
    loadDependencies(): void
    /**
     * 正在加载依赖
     */
    isLoadingDependencies: boolean
    /**
     * 加载中的依赖数量
     */
    loadingDependenciesCount: number
    /**
     * 更新加载中的依赖数量
     * @param fn 更新函数
     */
    updateLoadingDependenciesCount(fn: (count: number) => number): void
  }
}

/**
 * 运行时加载依赖插件
 */
export const runtimePluginLoadDependencies: RuntimeRawPlugin<
  RuntimePluginLoadDependenciesPropertiesExt,
  | typeof runtimePluginUidl
  | typeof runtimePluginDependencies
  | typeof runtimePluginLoadCode
> = {
  id: 'load-dependencies',
  initRuntime(ctx) {
    ctx.loadDependencies = loadDependencies
    definePropertyByGetter(
      ctx,
      'isLoadingDependencies',
      () => !!ctx.loadingDependenciesCount,
    )
    ctx.loadingDependenciesCount = 0
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ctx.updateLoadingDependenciesCount = (fn) => {
      ctx.loadingDependenciesCount = fn(ctx.loadingDependenciesCount)
    }

    function loadDependencies(): void {
      const {
        uidl: { dependencies: uidlDependencies },
        loadCode,
      } = ctx
      for (const uidlDep of uidlDependencies || []) {
        const { pkgName } = uidlDep
        switch (uidlDep.type) {
          case UIDL_DEPENDENCY_TYPE_COMPONENT_LIBRARY: {
            const { codes } = uidlDep
            for (const code of values(codes)) {
              const { importPath = DEFAULT_IMPORT_EXPORT_PATH } = code
              setToDeps(
                ctx.dependencies,
                loadCode(code, uidlDep),
                code.type === CODE_TYPE_LOW ? [] : code.exportPath,
                [pkgName, ...importPath],
              )
            }
            break
          }
          case UIDL_DEPENDENCY_TYPE_UTILS: {
            const { code } = uidlDep
            const { importPath = DEFAULT_IMPORT_EXPORT_PATH } = code
            setToDeps(
              ctx.dependencies,
              loadCode(code, uidlDep),
              code.exportPath,
              [pkgName, ...importPath],
            )
            break
          }
        }
      }
    }

    function setToDeps(
      deps: UnknownObject,
      ret: unknown,
      exportPath: JsonPath = DEFAULT_IMPORT_EXPORT_PATH,
      importPath: JsonPath = DEFAULT_IMPORT_EXPORT_PATH,
    ): void {
      if (isPromise(ret)) {
        ctx.updateLoadingDependenciesCount((c) => ++c)
        ;(async (): Promise<void> => {
          try {
            setToDeps(deps, await ret, exportPath, importPath)
          } finally {
            ctx.updateLoadingDependenciesCount((c) => --c)
          }
        })()
        return
      }
      set(deps, importPath, get(ret, exportPath))
    }
  },
}
