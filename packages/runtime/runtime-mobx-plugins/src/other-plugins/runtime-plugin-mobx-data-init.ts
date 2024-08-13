import type {
  AnyRuntimePlugin,
  RuntimeDefaultPropertiesExtHkt,
  RuntimeDefaultPropertiesExtHktPlugin,
  RuntimePlugin,
} from '@p-lc/runtime'
import { assign } from 'lodash-uni'
import type { RuntimeMobxData } from './runtime-plugin-mobx-data'
import { type runtimePluginMobxData } from './runtime-plugin-mobx-data'

/**
 * 运行时 MobX 数据初始化插件属性扩展高等类型
 */
export interface RuntimePluginMobxDataInitPropertiesExtHkt<
  Plugin extends AnyRuntimePlugin,
> {
  runtimeInitOptions: {
    /**
     * （初始化）数据
     */
    data?: RuntimeMobxData<Plugin>
  }
}

/**
 * RuntimePluginMobxDataInitPropertiesExtHkt 辅助类型
 */
export interface $RuntimePluginMobxDataInitPropertiesExtHkt
  extends RuntimeDefaultPropertiesExtHkt {
  type: RuntimePluginMobxDataInitPropertiesExtHkt<
    RuntimeDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 运行时 MobX 数据初始化插件
 */
export const runtimePluginMobxDataInit: RuntimePlugin<
  $RuntimePluginMobxDataInitPropertiesExtHkt,
  typeof runtimePluginMobxData
> = {
  id: 'mobx-data-init',
  initRuntime(ctx) {
    const {
      initOptions: { data: initData },
    } = ctx
    assign(ctx.data, initData)
  },
}
