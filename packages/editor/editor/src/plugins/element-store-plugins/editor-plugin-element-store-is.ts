import {
  definePropertyByGetter,
  deleteUndefinedValues,
  isPartialObject,
} from '@p-lc/shared'
import { isObject } from 'lodash-uni'
import type {
  AnyEditorPlugin,
  DepPluginUniteEditorPlugin,
  EditorDefaultPropertiesExtHkt,
  EditorDefaultPropertiesExtHktPlugin,
  EditorRawPlugin,
} from '../../types'
import type {
  editorPluginUidlStoreComponents,
  UidlStoreUidlElement,
} from '../uidl-store-plugins'
import { type editorPluginUidlStore } from '../uidl-store-plugins'
import type { editorPluginElementStoreFind } from './editor-plugin-element-store-find'

/**
 * 编辑器元素仓库是否判断插件属性扩展高等类型
 */
export interface EditorPluginElementStoreIsPropertiesExtHkt<
  Plugin extends AnyEditorPlugin,
> {
  editor: {
    /**
     * 元素仓库
     */
    elementStore: {
      /**
       * 根元素 ID
       */
      rootElementId: string | null
      /**
       * 根元素
       */
      rootElement: UidlStoreUidlElement<Plugin> | null
      /**
       * 获取元素 ID
       * @param elementOrId 元素或元素 ID
       */
      getElementId(elementOrId: UidlStoreUidlElement<Plugin> | string): string
      /**
       * 是根元素
       * @param elementOrId 元素或元素 ID
       */
      isRootElement(elementOrId: UidlStoreUidlElement<Plugin> | string): boolean
      /**
       * 是元素类型
       * @param elementOrId 元素或元素 ID
       * @param pkgName 包名
       * @param componentType 组件类型
       * @param pkgVersion 包版本，可选
       */
      isElementType(
        elementOrId: UidlStoreUidlElement<Plugin> | string,
        pkgName: string,
        componentType: string,
        pkgVersion?: string,
      ): boolean
    }
  }
}

/**
 * EditorPluginElementStoreIsPropertiesExtHkt 辅助类型
 */
export interface $EditorPluginElementStoreIsPropertiesExtHkt
  extends EditorDefaultPropertiesExtHkt {
  type: EditorPluginElementStoreIsPropertiesExtHkt<
    EditorDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 编辑器元素仓库是否判断插件
 */
export const editorPluginElementStoreIs: EditorRawPlugin<
  $EditorPluginElementStoreIsPropertiesExtHkt,
  | typeof editorPluginUidlStore
  | typeof editorPluginElementStoreFind
  | typeof editorPluginUidlStoreComponents
> = {
  id: 'element-store-is',
  initEditor(ctx) {
    const { uidlStore, elementStore } = ctx
    definePropertyByGetter(elementStore, 'rootElementId', () => {
      return elementStore.rootElement?.id || null
    })
    definePropertyByGetter(elementStore, 'rootElement', () => {
      return uidlStore.uidl?.view || null
    })
    elementStore.getElementId = getElementId
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    elementStore.isRootElement = (elementOrId) => {
      elementOrId = getElementId(elementOrId)
      return elementOrId === elementStore.rootElementId
    }
    elementStore.isElementType = (
      elementOrId,
      pkgName,
      componentType,
      pkgVersion,
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ) => {
      elementOrId = getElementId(elementOrId)
      const ed = elementStore.findElementDetail(elementOrId)
      if (!ed) return false
      const uidlComponent = uidlStore.getUidlComponent(ed.element.type)
      return isPartialObject(
        uidlComponent,
        deleteUndefinedValues({
          pkgName,
          componentType,
          pkgVersion,
        }),
      )
    }

    function getElementId(
      elementOrId:
        | UidlStoreUidlElement<
            DepPluginUniteEditorPlugin<typeof editorPluginUidlStore>
          >
        | string,
    ): string {
      return isObject(elementOrId) ? elementOrId.id : elementOrId
    }
  },
}
