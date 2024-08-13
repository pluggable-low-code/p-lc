import type { Cd, Pd, Slot, StaticPathSlot } from '@p-lc/pd'
import { isSlotMatched, SLOT_TYPE_DYNAMIC_PATH } from '@p-lc/pd-utils'
import type { RuntimePlugin } from '@p-lc/runtime'
import type { JsonPath } from '@p-lc/shared'

/**
 * 运行时预览器预览用 PD 插件属性扩展
 */
export interface RuntimePluginPreviewerPdForPreviewPropertiesExt {
  runtime: {
    /**
     * 预览用 PD
     */
    pdsForPreview: PdForPreview[]
    /**
     * 获取插槽
     * @param elementType 元素类型
     * @param logicPath 逻辑路径
     */
    getSlot(elementType: string, logicPath: JsonPath): Slot | null
    /**
     * 获取静态路径插槽
     * @param elementType 元素类型
     */
    getStaticPathSlots(elementType: string): StaticPathSlot[]
  }
  runtimeInitOptions: {
    /**
     * 预览用 PD
     */
    pdsForPreview: PdForPreview[]
  }
}

/**
 * 预览用 PD，只摘取少量预览器运行时需要的信息
 */
export interface PdForPreview extends Pick<Pd, 'pkgName' | 'pkgVersion'> {
  /**
   * 组件
   */
  components: CdForPreview[]
}

/**
 * 预览用 CD
 */
export interface CdForPreview extends Pick<Cd, 'type' | 'slots'> {
  /**
   * 元素类型
   */
  elementType: string
}

/**
 * 运行时预览器预览用 PD 插件
 */
export const runtimePluginPreviewerPdForPreview: RuntimePlugin<RuntimePluginPreviewerPdForPreviewPropertiesExt> =
  {
    id: 'previewer-pd-for-preview',
    initRuntime(ctx) {
      ctx.pdsForPreview = ctx.initOptions.pdsForPreview
      const elementTypeCdMap = new Map<string, CdForPreview>()
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      ctx.getSlot = (elementType, logicPath) => {
        refreshElementTypeCds()
        return (
          elementTypeCdMap
            .get(elementType)
            ?.slots?.find((slot) => isSlotMatched(slot, logicPath, false)) ||
          null
        )
      }
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      ctx.getStaticPathSlots = (elementType) => {
        refreshElementTypeCds()
        return (elementTypeCdMap.get(elementType)?.slots || []).filter(
          (slot) => slot.type !== SLOT_TYPE_DYNAMIC_PATH,
        )
      }
      let cachedPdsForPreview: typeof ctx.pdsForPreview | null = null
      function refreshElementTypeCds(): void {
        const { pdsForPreview } = ctx
        if (pdsForPreview === cachedPdsForPreview) return
        cachedPdsForPreview = pdsForPreview
        elementTypeCdMap.clear()
        for (const pd of pdsForPreview) {
          for (const cd of pd.components) {
            elementTypeCdMap.set(cd.elementType, cd)
          }
        }
      }
    },
  }
