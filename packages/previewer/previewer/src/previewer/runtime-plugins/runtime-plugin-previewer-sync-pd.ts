import type { RuntimePlugin } from '@p-lc/runtime'
import type { Promisable } from '@p-lc/shared'
import type { PdForPreview } from './runtime-plugin-previewer-pd-for-preview'
import { type runtimePluginPreviewerPdForPreview } from './runtime-plugin-previewer-pd-for-preview'

/**
 * 运行时预览器同步 PD 插件属性扩展
 */
export interface RuntimePluginPreviewerSyncPdPropertiesExt {
  runtime: {
    /**
     * 运行时暴露
     */
    runtimeExpose: SyncPdRuntimeApis
  }
}

/**
 * 同步 PD 运行时接口
 */
export interface SyncPdRuntimeApis {
  /**
   * 同步 PD
   * @param pdsForPreview 预览用 PD
   */
  syncPd(pdsForPreview: PdForPreview[]): Promisable<void>
}

/**
 * 运行时预览器同步 PD 插件
 */
export const runtimePluginPreviewerSyncPd: RuntimePlugin<
  RuntimePluginPreviewerSyncPdPropertiesExt,
  typeof runtimePluginPreviewerPdForPreview
> = {
  id: 'previewer-sync-pd',
  initRuntime(ctx) {
    const { runtimeExpose } = ctx
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    runtimeExpose.syncPd = (pdsForPreview) => {
      ctx.pdsForPreview = pdsForPreview
    }
  },
}
