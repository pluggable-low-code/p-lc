import type { InitInlineRuntime } from '@p-lc/previewer'
import type { ReactInlinePreviewerRuntimePlugin } from '@p-lc/react-previewer'
import { runtimeReactInlinePreviewerPlugins } from '@p-lc/react-previewer'
import type { InitOptionsOfRuntime, Runtime } from '@p-lc/runtime'
import { runtimePluginAntdPopupContainer } from '@p-lc/runtime-antd-plugins'
import { runtimePluginEmitterHotUpdateUidlRecreateData } from '@p-lc/runtime-emitter-plugins'
import {
  antdRuntimeInitOptions,
  createAntdRuntime,
  type AntdRuntimePlugin,
} from '../runtime'
import type { AntdEditorPlugin } from './types'

/**
 * antd 预览器运行时插件
 */
export type AntdPreviewerRuntimePlugin =
  | AntdRuntimePlugin
  | ReactInlinePreviewerRuntimePlugin
  | typeof runtimePluginAntdPopupContainer
  | typeof runtimePluginEmitterHotUpdateUidlRecreateData

/**
 * antd 预览器运行时
 */
export type AntdPreviewerRuntime = Runtime<AntdPreviewerRuntimePlugin>

/**
 * 创建 antd 预览器运行时
 */
export const initAntdPreviewerRuntime: InitInlineRuntime<AntdEditorPlugin> = (
  uidl,
  inlineRuntimeInitOptions,
  ctx,
) => {
  const {
    i18nStore: { language },
  } = ctx
  return createAntdRuntime()
    .use(
      ...runtimeReactInlinePreviewerPlugins,
      runtimePluginAntdPopupContainer,
      runtimePluginEmitterHotUpdateUidlRecreateData,
    )
    .init({
      ...inlineRuntimeInitOptions,
      ...(antdRuntimeInitOptions as Partial<
        InitOptionsOfRuntime<AntdPreviewerRuntime>
      >),
      uidl,
      language,
    }) satisfies AntdPreviewerRuntime
}
