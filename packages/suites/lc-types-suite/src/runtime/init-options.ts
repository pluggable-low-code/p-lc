import type { LcTypesReactRuntime } from '@p-lc/lc-types-react-runtime'
import * as lcTypesUi from '@p-lc/lc-types-ui'
import type { InitOptionsOfRuntime } from '@p-lc/runtime'
import { PKG_NAME_LC_TYPES_UI } from '@p-lc/shared'

/**
 * 低代码类型 React 运行时初始化选项
 */
export const lcTypesReactRuntimeInitOptions: Partial<
  InitOptionsOfRuntime<LcTypesReactRuntime>
> = {
  dependencies: {
    [PKG_NAME_LC_TYPES_UI]: lcTypesUi,
  },
}
