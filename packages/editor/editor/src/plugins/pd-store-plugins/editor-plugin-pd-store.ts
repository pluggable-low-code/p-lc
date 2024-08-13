import type { Cd, Pd, Slot, StaticPathSlot } from '@p-lc/pd'
import {
  createUnknownTempSlot,
  isChildrenSlot,
  isSlotMatched,
  mergePkgNameToI18nResource,
} from '@p-lc/pd-utils'
import type { JsonPath, ReadonlyUnknownArray } from '@p-lc/shared'
import { create, jsonStringify } from '@p-lc/shared'
import { childrenSlotLogicPath } from '@p-lc/uidl-utils'
import { isString } from 'lodash-uni'
import { action, makeObservable, observable } from 'mobx'
import type {
  AnyEditorPlugin,
  EditorDefaultPropertiesExtHkt,
  EditorDefaultPropertiesExtHktPlugin,
  EditorRawPlugin,
} from '../../types'
import { type editorPluginElementStoreFind } from '../element-store-plugins'
import { type editorPluginI18nStore } from '../i18n-store-plugins'
import type { UidlStoreUidlElement } from '../uidl-store-plugins'
import {
  type editorPluginUidlStore,
  type editorPluginUidlStoreComponents,
} from '../uidl-store-plugins'

/**
 * 编辑器 PD 仓库插件属性扩展高等类型
 */
export interface EditorPluginPdStorePropertiesExtHkt<
  Plugin extends AnyEditorPlugin,
> {
  editor: {
    /**
     * PD 仓库
     */
    pdStore: PdStore<Plugin>
  }
}

/**
 * PD 仓库
 */
export interface PdStore<Plugin extends AnyEditorPlugin> {
  /**
   * PD（对照表），pkgName -> PD
   */
  pds: Record<string, Pd | undefined>
  /**
   * 添加 PD
   * @param pd PD
   */
  addPd(pd: Pd): void
  /**
   * 删除 PD
   * @param pkgName 包名
   */
  deletePd(pkgName: string): void
  /**
   * 获取 PD
   * @param pkgName 包名
   */
  getPd(pkgName: string): Pd
  /**
   * 获取包版本
   * @param pkgName 报名
   */
  getPkgVersion(pkgName: string): string
  /**
   * CD（对照表），pkgName -> componentType -> CD
   */
  cds: Record<string, Record<string, Cd | undefined> | undefined>
  /**
   * 获取 CD
   * @param pkgName 包名
   * @param componentType 组件类型
   */
  getCd(pkgName: string, componentType: string): Cd
  /**
   * 通过元素类型获取 CD
   * @param elementType 元素类型
   */
  getCdByEt(elementType: string): Cd
  /**
   * 获取组件名称
   * @param pkgName 包名
   * @param componentType 组件类型
   */
  getComponentName(pkgName: string, componentType: string): string
  /**
   * 通过元素类型获取组件名称
   * @param elementType 元素类型
   */
  getComponentNameByEt(elementType: string): string
  /**
   * 获取组件图标
   * @param pkgName 包名
   * @param componentType 组件类型
   */
  getComponentIcon(pkgName: string, componentType: string): string | null
  /**
   * 通过元素类型获取组件图标
   * @param elementType 元素类型
   */
  getComponentIconByEt(elementType: string): string | null
  /**
   * 获取插槽
   * @param pkgName 包名
   * @param componentType 组件类型
   */
  getSlots(pkgName: string, componentType: string): Slot[]
  /**
   * 通过元素类型获取插槽
   * @param elementType 元素类型
   */
  getSlotsByEt(elementType: string): Slot[]
  /**
   * 获取插槽
   * @param pkgName 包名
   * @param componentType 组件类型
   * @param logicPath 逻辑路径
   */
  getSlot(
    pkgName: string,
    componentType: string,
    logicPath: JsonPath,
  ): Slot | null
  /**
   * 通过元素类型获取插槽
   * @param elementType 元素类型
   * @param logicPath 逻辑路径
   */
  getSlotByEt(elementType: string, logicPath: JsonPath): Slot | null
  /**
   * 是容器组件，有默认子元素插槽
   * @param pkgName 包名
   * @param componentType 组件类型
   */
  isContainerComponent(pkgName: string, componentType: string): boolean
  /**
   * 通过元素类型判断为容器组件，有默认子元素插槽
   * @param elementType 元素类型
   */
  isContainerComponentByEt(elementType: string): boolean
  /**
   * 获取默认子元素插槽，会自动创建未知插槽
   * @param element 元素或元素 ID
   */
  getChildrenSlotWithUnknown(
    element: UidlStoreUidlElement<Plugin> | string,
  ): StaticPathSlot | null
}

/**
 * EditorPluginPdStorePropertiesExtHkt 辅助类型
 */
export interface $EditorPluginPdStorePropertiesExtHkt
  extends EditorDefaultPropertiesExtHkt {
  type: EditorPluginPdStorePropertiesExtHkt<
    EditorDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 编辑器 PD 仓库插件
 */
export const editorPluginPdStore: EditorRawPlugin<
  $EditorPluginPdStorePropertiesExtHkt,
  | typeof editorPluginI18nStore
  | typeof editorPluginUidlStore
  | typeof editorPluginUidlStoreComponents
  | typeof editorPluginElementStoreFind
> = {
  id: 'pd-store',
  initEditor(ctx) {
    const { i18nStore, uidlStore } = ctx
    const pdStore = (ctx.pdStore = {} as typeof ctx.pdStore)
    pdStore.pds = create(null) as typeof pdStore.pds
    pdStore.cds = create(null) as typeof pdStore.cds
    const { pds, cds } = makeObservable(pdStore, {
      pds: observable.shallow,
      cds: observable.shallow,
    })
    pdStore.addPd = action((pd) => {
      const pkgName = pd.pkgName
      pds[pkgName] = pd
      for (const cd of pd.components) {
        const cs = cds[pkgName] || (cds[pkgName] = create(null))
        cs[cd.type] = cd
      }
      if (pd.i18n) {
        i18nStore.addResource(mergePkgNameToI18nResource(pd.pkgName, pd.i18n))
      }
    })
    pdStore.deletePd = action((pkgName) => {
      delete pds[pkgName]
      delete cds[pkgName]
    })
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    pdStore.getPd = (pkgName) => {
      const pd = pds[pkgName]
      if (!pd) {
        throw new Error(`The pd ${jsonStringify(pkgName)} is not exists.`)
      }
      return pd
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    pdStore.getPkgVersion = (pkgName) => {
      return pdStore.getPd(pkgName).pkgVersion
    }
    pdStore.getCdByEt = byElementType(
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      (pdStore.getCd = (pkgName, componentType) => {
        const cs = cds[pkgName]
        if (!cs) {
          throw new Error(`The pd ${jsonStringify(pkgName)} is not exists.`)
        }
        const cd = cs[componentType]
        if (!cd) {
          throw new Error(
            `The component ${jsonStringify(componentType)} of pd ${jsonStringify(pkgName)} is not exists.`,
          )
        }
        return cd
      }),
    )
    pdStore.getComponentNameByEt = byElementType(
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      (pdStore.getComponentName = (pkgName, componentType) => {
        const cd = pdStore.getCd(pkgName, componentType)
        return i18nStore.tText(cd.name, { pkgName })
      }),
    )
    pdStore.getComponentIconByEt = byElementType(
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      (pdStore.getComponentIcon = (pkgName, componentType) => {
        const cd = pdStore.getCd(pkgName, componentType)
        return cd.icon ?? null
      }),
    )
    pdStore.getSlotsByEt = byElementType(
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      (pdStore.getSlots = (pkgName, componentType) => {
        const cd = pdStore.getCd(pkgName, componentType)
        return cd.slots || []
      }),
    )
    pdStore.getSlotByEt = byElementType(
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      (pdStore.getSlot = (pkgName, componentType, logicPath) => {
        return (
          pdStore
            .getSlots(pkgName, componentType)
            .find((slot) => isSlotMatched(slot, logicPath, false)) || null
        )
      }),
    )
    pdStore.isContainerComponentByEt = byElementType(
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      (pdStore.isContainerComponent = (pkgName, componentType) => {
        const slots = pdStore.getSlots(pkgName, componentType)
        const childrenSlot = slots.find(isChildrenSlot)
        return !!childrenSlot
      }),
    )
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    pdStore.getChildrenSlotWithUnknown = (element) => {
      if (isString(element)) {
        const ed = ctx.elementStore.findElementDetail(element)
        if (!ed) return ed
        element = ed.element
      }
      const rawSlots = ctx.pdStore.getSlotsByEt(element.type)
      let childrenSlot = rawSlots.find(isChildrenSlot)
      if (!childrenSlot && element.children?.length) {
        childrenSlot = createUnknownTempSlot(childrenSlotLogicPath)
      }
      return childrenSlot || null
    }

    function byElementType<Args extends ReadonlyUnknownArray, Return>(
      fn: (pkgName: string, componentType: string, ...args: Args) => Return,
    ): (elementType: string, ...args: Args) => Return {
      return (elementType, ...args) => {
        const { pkgName, componentType } =
          uidlStore.getUidlComponent(elementType)
        return fn(pkgName, componentType, ...args)
      }
    }
  },
}
