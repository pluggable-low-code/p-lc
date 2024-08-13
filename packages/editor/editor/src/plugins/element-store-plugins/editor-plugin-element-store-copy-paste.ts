import { readJsonFromClipboard, writeJsonToClipboard } from '@p-lc/shared'
import type { UidlComponent } from '@p-lc/uidl'
import { createElementId, dfsElementInElement } from '@p-lc/uidl-utils'
import { runInAction } from 'mobx'
import type {
  AnyEditorPlugin,
  EditorDefaultPlugin,
  EditorRawPlugin,
} from '../../types'
import { type editorPluginName } from '../editor-plugin-name'
import { type editorPluginPdStore } from '../pd-store-plugins'
import type { UidlStoreUidlElement } from '../uidl-store-plugins'
import {
  type editorPluginUidlStore,
  type editorPluginUidlStoreComponents,
  type editorPluginUidlStoreEdit,
} from '../uidl-store-plugins'
import { type editorPluginUidlUtilsConfig } from '../uidl-utils-config-plugins'
import { type editorPluginElementStoreEdit } from './editor-plugin-element-store-edit'
import { type editorPluginElementStoreFind } from './editor-plugin-element-store-find'
import { type editorPluginElementStoreSelect } from './editor-plugin-element-store-select'

/**
 * 编辑器元素仓库复制粘贴插件属性扩展
 */
export interface EditorPluginElementStoreCopyPastePropertiesExt {
  editor: {
    /**
     * 元素仓库
     */
    elementStore: {
      /**
       * 撤销
       * @param elementId 元素 ID
       */
      copy(elementId: string): Promise<void>
      /**
       * 重做
       * @param elementId 元素 ID
       */
      paste(elementId?: string | null): Promise<void>
    }
  }
}

/**
 * 剪贴板 JSON：元素
 */
export interface ClipboardJsonElement<
  Plugin extends AnyEditorPlugin = EditorDefaultPlugin,
> {
  /**
   * 组件
   */
  components?: UidlComponent[]
  /**
   * 元素
   */
  element: UidlStoreUidlElement<Plugin>
}

/**
 * 编辑器元素仓库复制粘贴插件
 */
export const editorPluginElementStoreCopyPaste: EditorRawPlugin<
  EditorPluginElementStoreCopyPastePropertiesExt,
  | typeof editorPluginName
  | typeof editorPluginUidlStore
  | typeof editorPluginUidlStoreEdit
  | typeof editorPluginUidlStoreComponents
  | typeof editorPluginUidlUtilsConfig
  | typeof editorPluginElementStoreFind
  | typeof editorPluginElementStoreEdit
  | typeof editorPluginElementStoreSelect
  | typeof editorPluginPdStore
> = {
  id: 'element-store-copy-paste',
  initEditor(ctx) {
    const { name, uidlStore, elementStore, uidlUtilsConfig, pdStore } = ctx
    const jsonType = `p-lc:${name}:element`
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    elementStore.copy = async (elementId) => {
      const ed = elementStore.findElementDetail(elementId)
      if (!ed) return
      const { uidl } = uidlStore
      const { element } = ed
      const elementTypeSet = new Set<string>()
      for (const d of dfsElementInElement(uidlUtilsConfig, element)) {
        elementTypeSet.add(d.element.type)
      }
      const components = uidl?.components?.filter(({ elementType }) =>
        elementTypeSet.has(elementType),
      )
      const json: ClipboardJsonElement = {
        element,
        components,
      }
      return writeJsonToClipboard(jsonType, json)
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    elementStore.paste = async (elementId) => {
      const json = await readJsonFromClipboard<ClipboardJsonElement>(jsonType)
      if (!json) return
      const { components = [], element } = json
      let targetElement: typeof element | undefined
      if (elementId) {
        targetElement = elementStore.findElementDetail(elementId)?.element
      }
      if (!elementStore.canAddElementByElement(targetElement)) {
        return
      }
      runInAction(() => {
        uidlStore.edit(() => {
          const elementTypeMap = new Map<string, string>()
          for (const component of components) {
            const { elementType, pkgName, componentType } = component
            const newElementType = uidlStore.ensureElementType(
              pkgName,
              componentType,
            )
            elementTypeMap.set(elementType, newElementType)
          }
          for (const { element: ele } of dfsElementInElement(
            uidlUtilsConfig,
            element,
          )) {
            ele.id = createElementId()
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const newElementType = elementTypeMap.get(ele.type)!
            ele.type = newElementType
            const componentName = pdStore.getComponentNameByEt(newElementType)
            ele.name = elementStore.generateElementName(componentName)
          }
          elementStore.addElementByElement(element, targetElement)
        })
        elementStore.selectElement(element.id)
      })
    }
  },
}
