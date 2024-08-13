import type {
  AnyRuntimePlugin,
  RuntimeDefaultPropertiesExtHkt,
  RuntimeDefaultPropertiesExtHktPlugin,
  RuntimeFinalUidl,
  RuntimePlugin,
} from '@p-lc/runtime'
import type {
  runtimePluginEmitter,
  runtimePluginEmitterHotUpdateUidl,
} from '@p-lc/runtime-emitter-plugins'
import { RUNTIME_EVENT_KEY_UIDL } from '@p-lc/runtime-emitter-plugins'
import type { Promisable } from '@p-lc/shared'

/**
 * 运行时预览器热更新 UIDL 插件属性扩展高等类型
 */
export interface RuntimePluginPreviewerHotUpdateUidlPropertiesExtHkt<
  Plugin extends AnyRuntimePlugin,
> {
  runtime: {
    /**
     * 运行时暴露
     */
    runtimeExpose: HotUpdateUidlRuntimeApis<Plugin>
  }
}

/**
 * 热更新 UIDL 运行时接口
 */
export interface HotUpdateUidlRuntimeApis<Plugin extends AnyRuntimePlugin> {
  /**
   * 热更新 UIDL
   * @param uidl UIDL
   */
  hotUpdateUidl(uidl: RuntimeFinalUidl<Plugin>): Promisable<void>
}

/**
 * RuntimePluginPreviewerHotUpdateUidlPropertiesExtHkt 辅助类型
 */
export interface $RuntimePluginPreviewerHotUpdateUidlPropertiesExtHkt
  extends RuntimeDefaultPropertiesExtHkt {
  type: RuntimePluginPreviewerHotUpdateUidlPropertiesExtHkt<
    RuntimeDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 运行时预览器热更新 UIDL 插件
 */
export const runtimePluginPreviewerHotUpdateUidl: RuntimePlugin<
  $RuntimePluginPreviewerHotUpdateUidlPropertiesExtHkt,
  typeof runtimePluginEmitter | typeof runtimePluginEmitterHotUpdateUidl
> = {
  id: 'previewer-huu',
  initRuntime(ctx) {
    const { runtimeExpose, emitter } = ctx
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    runtimeExpose.hotUpdateUidl = (uidl) => {
      emitter.emit(RUNTIME_EVENT_KEY_UIDL, { uidl })
    }
  },
}
