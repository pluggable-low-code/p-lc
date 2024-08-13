import type { LcTypesUidl, LcTypesUidlElement } from '@p-lc/lc-types-uidl'
import type { RuntimePlugin } from '@p-lc/runtime'

/**
 * 运行时低代码类型 UIDL 插件属性扩展
 */
export interface RuntimePluginLcTypesUidlPropertiesExt {
  runtime: {
    /**
     * UIDL
     */
    uidl: LcTypesUidl
    /**
     * 数据
     */
    data: LcTypesRuntimeData
    /**
     * 设置数据选项
     */
    setDataOptions: LcTypesRuntimeSetDataOptions
  }
}

/**
 * 低代码类型运行时数据
 */
export interface LcTypesRuntimeData {
  /**
   * （编辑中的）UIDL 元素
   */
  uidlElement: LcTypesUidlElement | null
}

/**
 * 低代码类型运行时设置数据选项
 */
export interface LcTypesRuntimeSetDataOptions {
  /**
   * 配方 ID
   */
  recipeId?: string | number | null
}

/**
 * 运行时低代码类型 UIDL 插件
 */
export const runtimePluginLcTypesUidl: RuntimePlugin<RuntimePluginLcTypesUidlPropertiesExt> =
  {
    id: 'lc-types-uidl',
  }
