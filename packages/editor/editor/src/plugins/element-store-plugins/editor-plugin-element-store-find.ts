import type { TraverseElementDetail } from '@p-lc/uidl-utils'
import { dfsElement } from '@p-lc/uidl-utils'
import { action, makeObservable, observable } from 'mobx'
import type {
  AnyEditorPlugin,
  EditorDefaultPropertiesExtHkt,
  EditorDefaultPropertiesExtHktPlugin,
  EditorRawPlugin,
} from '../../types'
import { type editorPluginEmitter } from '../editor-plugin-emitter'
import type { UidlStoreUidl } from '../uidl-store-plugins'
import {
  EDITOR_EVENT_KEY_UIDL,
  EDITOR_EVENT_KEY_UIDL_COMPOSITION_UPDATE,
  type editorPluginUidlStore,
  type editorPluginUidlStoreEdit,
} from '../uidl-store-plugins'
import { type editorPluginUidlUtilsConfig } from '../uidl-utils-config-plugins'

/**
 * 编辑器元素仓库查找插件属性扩展高等类型
 */
export interface EditorPluginElementStoreFindPropertiesExtHkt<
  Plugin extends AnyEditorPlugin,
> {
  editor: {
    /**
     * 元素仓库
     */
    elementStore: {
      /**
       * 元素详情缓存表
       */
      elementDetailCacheMap: Map<
        string,
        TraverseElementDetail<UidlStoreUidl<Plugin>>
      >
      /**
       * 元素名称集合
       */
      elementNameSet: Set<string>
      /**
       * 将被缓存的 UIDL
       */
      uidlToBeCached: UidlStoreUidl<Plugin> | null
      /**
       * 已缓存的 UIDL
       */
      cachedUidl: UidlStoreUidl<Plugin> | null
      /**
       * 刷新查找缓存
       */
      refreshFindCache(): void
      /**
       * 查找元素详情
       * @param id 元素 ID
       */
      findElementDetail(
        id: string,
      ): TraverseElementDetail<UidlStoreUidl<Plugin>> | null
      /**
       * 是否有元素名称
       * @param name 元素名称
       */
      hasElementName(name: string): boolean
      /**
       * 生成元素名称
       * @param componentName 组件名称
       */
      generateElementName(componentName: string): string
      /**
       * 是子元素
       * @param parentId 父元素 ID
       * @param childId 子元素 ID
       * @param deep 深度判断，默认 true
       */
      isChildElement(parentId: string, childId: string, deep?: boolean): boolean
      /**
       * 获取父元素 ID
       * @param id 元素 ID
       */
      getParentElementId(id?: string | null): string | null
    }
  }
}

/**
 * EditorPluginElementStoreFindPropertiesExtHkt 辅助类型
 */
export interface $EditorPluginElementStoreFindPropertiesExtHkt
  extends EditorDefaultPropertiesExtHkt {
  type: EditorPluginElementStoreFindPropertiesExtHkt<
    EditorDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 编辑器元素仓库查找插件
 */
export const editorPluginElementStoreFind: EditorRawPlugin<
  $EditorPluginElementStoreFindPropertiesExtHkt,
  | typeof editorPluginUidlStore
  | typeof editorPluginUidlStoreEdit
  | typeof editorPluginEmitter
  | typeof editorPluginUidlUtilsConfig
> = {
  id: 'element-store-fd',
  initEditor(ctx) {
    const { emitter, uidlUtilsConfig, uidlStore, elementStore } = ctx
    const elementDetailCacheMap = (elementStore.elementDetailCacheMap =
      new Map() as typeof elementStore.elementDetailCacheMap)
    const elementNameSet = (elementStore.elementNameSet =
      new Set() as typeof elementStore.elementNameSet)
    elementStore.uidlToBeCached = uidlStore.uidl
    elementStore.cachedUidl = null
    const componentNameIndexMap = new Map<string, number>()
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    elementStore.refreshFindCache = () => {
      const uidl = elementStore.uidlToBeCached
      if (elementStore.cachedUidl === uidl) {
        return
      }
      elementStore.cachedUidl = uidl
      elementDetailCacheMap.clear()
      elementNameSet.clear()
      if (uidl) {
        for (const ed of dfsElement(uidlUtilsConfig, uidl)) {
          elementDetailCacheMap.set(ed.element.id, ed)
          elementNameSet.add(ed.element.name)
        }
      }
      componentNameIndexMap.clear()
    }
    emitter.on(
      EDITOR_EVENT_KEY_UIDL,
      action(({ uidl }) => {
        elementStore.uidlToBeCached = uidl
      }),
    )
    emitter.on(
      EDITOR_EVENT_KEY_UIDL_COMPOSITION_UPDATE,
      action(({ draft }) => {
        elementStore.uidlToBeCached = draft
      }),
    )
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    elementStore.findElementDetail = (id) => {
      elementStore.refreshFindCache()
      return elementDetailCacheMap.get(id) || null
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    elementStore.hasElementName = (name) => {
      elementStore.refreshFindCache()
      return elementNameSet.has(name)
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    elementStore.generateElementName = (componentName) => {
      let elementName = componentName
      let i = componentNameIndexMap.get(componentName) || 2
      while (elementStore.hasElementName(elementName)) {
        elementName = `${componentName} ${i++}`
      }
      componentNameIndexMap.set(componentName, i)
      return elementName
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    elementStore.isChildElement = (parentId, childId, deep = true) => {
      const childEd = elementStore.findElementDetail(childId)
      if (!childEd) return false
      return deep
        ? childEd.elementIdPath.includes(parentId)
        : childEd.parentElementId === parentId
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    elementStore.getParentElementId = (id) => {
      return (id && elementStore.findElementDetail(id)?.parentElementId) || null
    }
    makeObservable(elementStore, {
      uidlToBeCached: observable.ref,
    })
  },
}
