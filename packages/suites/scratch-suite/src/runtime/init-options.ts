import type { InitOptionsOfRuntime } from '@p-lc/runtime'
import { DEFAULT_PKG_NAME } from '@p-lc/uidl-utils'
import { scratchUi } from './scratch-ui'
import type { ScratchReactRuntime } from './types'

/**
 * 起步 React 运行时初始化选项
 */
export const scratchReactRuntimeInitOptions: Partial<
  InitOptionsOfRuntime<ScratchReactRuntime>
> = {
  dependencies: {
    [DEFAULT_PKG_NAME]: scratchUi,
  },
}
