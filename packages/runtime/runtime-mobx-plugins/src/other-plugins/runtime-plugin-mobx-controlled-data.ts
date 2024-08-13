import type {
  AnyRuntimePlugin,
  RuntimeDefaultPropertiesExtHkt,
  RuntimeDefaultPropertiesExtHktPlugin,
  RuntimePlugin,
} from '@p-lc/runtime'
import type { LiteralObject, Returnable } from '@p-lc/shared'
import { definePropertyByGetter, getReturnValue } from '@p-lc/shared'
import { action, computed, makeObservable } from 'mobx'
import type {
  RuntimeMobxData,
  RuntimeMobxSetDataOptions,
} from './runtime-plugin-mobx-data'

/**
 * 运行时 MobX 受控数据插件属性扩展高等类型
 */
export interface RuntimePluginMobxControlledDataPropertiesExtHkt<
  Plugin extends AnyRuntimePlugin,
> {
  runtime: {
    /**
     * 数据，由其他插件扩展
     */
    data: LiteralObject
    /**
     * 设置数据
     * @param data 新的数据
     * @param options 选项
     */
    setData(
      data: Returnable<RuntimeMobxData<Plugin>, [RuntimeMobxData<Plugin>]>,
      options?: RuntimeMobxSetDataOptions<Plugin>,
    ): void
  }
  runtimeInitOptions: {
    /**
     * 获取数据，可观察
     */
    getData(): RuntimeMobxData<Plugin>
    /**
     * 设置数据
     * @param data 数据
     * @param options 选项
     */
    setData(
      data: RuntimeMobxData<Plugin>,
      options?: RuntimeMobxSetDataOptions<Plugin>,
    ): void
  }
}

/**
 * RuntimePluginMobxControlledDataPropertiesExtHkt 辅助类型
 */
export interface $RuntimePluginMobxControlledDataPropertiesExtHkt
  extends RuntimeDefaultPropertiesExtHkt {
  type: RuntimePluginMobxControlledDataPropertiesExtHkt<
    RuntimeDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 运行时 MobX 受控数据插件
 */
export const runtimePluginMobxControlledData: RuntimePlugin<$RuntimePluginMobxControlledDataPropertiesExtHkt> =
  {
    id: 'mobx-controlled-data',
    initRuntime(ctx) {
      const {
        initOptions: { getData: initGetData, setData: initSetData },
      } = ctx
      definePropertyByGetter(ctx, 'data', () => initGetData())
      ctx.setData = action((data, ...args) =>
        initSetData(getReturnValue(data, ctx.data), ...args),
      )
      makeObservable(ctx, {
        data: computed,
      })
    },
  }
