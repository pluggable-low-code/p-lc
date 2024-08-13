import type { LcTypesReactRuntimePlugin } from '@p-lc/lc-types-react-runtime'
import type { InitInlineRuntime } from '@p-lc/previewer'
import type { ReactInlinePreviewerRuntimePlugin } from '@p-lc/react-previewer'
import { runtimeReactInlinePreviewerPlugins } from '@p-lc/react-previewer'
import type { InitOptionsOfRuntime, Runtime } from '@p-lc/runtime'
import { runtimePluginAntdPopupContainer } from '@p-lc/runtime-antd-plugins'
import {
  createLcTypesReactRuntime,
  lcTypesReactRuntimeInitOptions,
} from '../runtime'
import type { LcTypesEditorPlugin } from './types'

/**
 * 低代码类型预览器运行时插件
 */
export type LcTypesPreviewerRuntimePlugin =
  | LcTypesReactRuntimePlugin
  | ReactInlinePreviewerRuntimePlugin
  | typeof runtimePluginAntdPopupContainer

/**
 * 低代码类型预览器运行时
 */
export type LcTypesPreviewerRuntime = Runtime<LcTypesPreviewerRuntimePlugin>

/**
 * 创建低代码类型预览器运行时
 */
export const initLcTypesPreviewerRuntime: InitInlineRuntime<
  LcTypesEditorPlugin
> = (uidl, inlineRuntimeInitOptions, ctx) => {
  const {
    uidlUtilsConfig,
    lcTypesStore,
    i18nStore: { language },
  } = ctx
  return createLcTypesReactRuntime()
    .use(...runtimeReactInlinePreviewerPlugins, runtimePluginAntdPopupContainer)
    .init({
      ...inlineRuntimeInitOptions,
      ...(lcTypesReactRuntimeInitOptions as Partial<
        InitOptionsOfRuntime<LcTypesPreviewerRuntime>
      >),
      uidl,
      uidlUtilsConfig,
      getData() {
        return lcTypesStore.editingData
      },
      setData(data) {
        lcTypesStore.setEditingData(data)
      },
      language,
    }) satisfies LcTypesPreviewerRuntime
}
