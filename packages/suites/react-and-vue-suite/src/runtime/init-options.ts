import type { InitOptionsOfRuntime } from '@p-lc/runtime'
import { DEFAULT_PKG_NAME } from '@p-lc/uidl-utils'
import { demoUi } from './demo-ui'
import type { RavReactRuntime, RavVueRuntime } from './types'

/**
 * RAV React 运行时初始化选项
 */
export const ravRuntimeInitOptions: Partial<
  InitOptionsOfRuntime<RavReactRuntime>
> &
  Partial<InitOptionsOfRuntime<RavVueRuntime>> = {
  dependencies: {
    [DEFAULT_PKG_NAME]: demoUi,
  },
}
