import type {
  AnyRuntimePlugin,
  Runtime,
  RuntimeDefaultPropertiesExtHkt,
  RuntimeDefaultPropertiesExtHktPlugin,
  RuntimePlugin,
} from '@p-lc/runtime'
import type { LiteralObject, Returnable } from '@p-lc/shared'
import { getReturnValue } from '@p-lc/shared'
import type { UidlData, UidlExtData } from '@p-lc/uidl-ext-data'
import { cloneDeep } from 'lodash-uni'
import { action, makeObservable, observable } from 'mobx'
import type { Get } from 'type-fest'

/**
 * 运行时 MobX 数据插件属性扩展高等类型
 */
export interface RuntimePluginMobxDataPropertiesExtHkt<
  Plugin extends AnyRuntimePlugin,
> {
  runtime: {
    /**
     * UIDL
     */
    uidl: UidlExtData
    /**
     * 数据，由其他插件扩展
     */
    data: LiteralObject
    /**
     * 设置数据选项，由其他插件扩展，只用于类型推导
     */
    setDataOptions: LiteralObject
    /**
     * 设置数据
     * @param data 数据
     * @param options 选项
     */
    setData(
      data: Returnable<RuntimeMobxData<Plugin>, [RuntimeMobxData<Plugin>]>,
      options?: RuntimeMobxSetDataOptions<Plugin>,
    ): void
    /**
     * 重新创建数据
     * @param data 数据
     */
    recreateData(data?: UidlData): void
  }
}

/**
 * 运行时 MobX 数据
 */
export type RuntimeMobxData<Plugin extends AnyRuntimePlugin> = Get<
  Runtime<Plugin>,
  ['data']
>

/**
 * 运行时 MobX 设置数据选项
 */
export type RuntimeMobxSetDataOptions<Plugin extends AnyRuntimePlugin> = Get<
  Runtime<Plugin>,
  ['setDataOptions']
> | void

/**
 * RuntimePluginMobxDataPropertiesExtHkt 辅助类型
 */
export interface $RuntimePluginMobxDataPropertiesExtHkt
  extends RuntimeDefaultPropertiesExtHkt {
  type: RuntimePluginMobxDataPropertiesExtHkt<
    RuntimeDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 运行时 MobX 数据插件
 */
export const runtimePluginMobxData: RuntimePlugin<$RuntimePluginMobxDataPropertiesExtHkt> =
  {
    id: 'mobx-data',
    initRuntime(ctx) {
      ctx.setData = action((data) => {
        ctx.data = getReturnValue(data, ctx.data)
      })
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      ctx.recreateData = (data) => {
        ctx.setData({
          ...cloneDeep(data),
        })
      }
      ctx.recreateData(ctx.uidl.data)
      makeObservable(ctx, {
        data: observable.ref,
      })
    },
  }
