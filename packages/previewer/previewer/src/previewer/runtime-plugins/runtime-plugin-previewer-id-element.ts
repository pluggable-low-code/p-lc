import type {
  AnyRuntimePlugin,
  RuntimeDefaultPropertiesExtHkt,
  RuntimeDefaultPropertiesExtHktPlugin,
  RuntimeFinalUidl,
  RuntimePlugin,
} from '@p-lc/runtime'
import {
  RUNTIME_EVENT_KEY_UIDL,
  type runtimePluginEmitter,
  type runtimePluginEmitterHotUpdateUidl,
} from '@p-lc/runtime-emitter-plugins'
import type { ElementOfUidl } from '@p-lc/uidl-utils'

/**
 * 运行时预览器 id 元素插件属性扩展高等类型
 */
export interface RuntimePluginPreviewerIdElementPropertiesExtHkt<
  Plugin extends AnyRuntimePlugin,
> {
  runtime: {
    /**
     * id UIDL 元素对照表
     */
    idUidlElementMap: Map<string, ElementOfUidl<RuntimeFinalUidl<Plugin>>>
    /**
     * 是根元素
     * @param elementId 元素 ID
     */
    isRootElement(elementId: string): boolean
  }
}

/**
 * RuntimePluginPreviewerIdElementPropertiesExtHkt 辅助类型
 */
export interface $RuntimePluginPreviewerIdElementPropertiesExtHkt
  extends RuntimeDefaultPropertiesExtHkt {
  type: RuntimePluginPreviewerIdElementPropertiesExtHkt<
    RuntimeDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 运行时预览器 id 元素插件
 */
export const runtimePluginPreviewerIdElement: RuntimePlugin<
  $RuntimePluginPreviewerIdElementPropertiesExtHkt,
  typeof runtimePluginEmitter | typeof runtimePluginEmitterHotUpdateUidl
> = {
  id: 'previewer-id-element-map',
  initRuntime(ctx) {
    creteMap()
    ctx.emitter.on(RUNTIME_EVENT_KEY_UIDL, creteMap)
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ctx.isRootElement = (elementId) => {
      return ctx.uidl.view.id === elementId
    }

    function creteMap(): void {
      ctx.idUidlElementMap = new Map()
    }
  },
  initElement(ctx) {
    const { uidlElement } = ctx
    ctx.root.idUidlElementMap.set(uidlElement.id, uidlElement)
  },
}
