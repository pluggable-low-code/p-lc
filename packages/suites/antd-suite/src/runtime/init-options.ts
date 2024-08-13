import * as lcTypesAntd from '@lc-types/antd'
import type { InitOptionsOfRuntime } from '@p-lc/runtime'
import type { AntdRuntime } from './types'

/**
 * antd 运行时初始化选项
 */
export const antdRuntimeInitOptions: Partial<
  InitOptionsOfRuntime<AntdRuntime>
> = {
  dependencies: {
    ['@lc-types/antd']: lcTypesAntd,
  },
}
