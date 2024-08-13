import type { Pd } from '@p-lc/pd'

/**
 * 接口响应包装
 */
export type ApiResWrapper<T = void> = T extends void
  ? {
      /**
       * 编码
       */
      code: number
    }
  : {
      /**
       * 编码
       */
      code: number
      /**
       * 数据
       */
      data: T
    }

/**
 * 接口响应：加载低代码类型
 */
export type ApiResLoadLcTypes = ApiResWrapper<Pd>

/**
 * 接口：加载低代码类型
 */
export interface ApiLoadLcTypes {
  (): Promise<ApiResWrapper<Pd>>
}

/**
 * 接口响应：保存低代码类型
 */
export type ApiResSaveLcTypes = ApiResWrapper

/**
 * 接口：保存低代码类型
 */
export interface ApiSaveLcTypes {
  /**
   * 接口：保存低代码类型
   * @params pd PD
   */
  (pd: Pd): Promise<ApiResSaveLcTypes>
}
