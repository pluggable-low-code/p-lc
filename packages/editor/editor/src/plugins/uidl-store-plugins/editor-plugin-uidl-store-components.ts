import { createWeakMemoizeArrayToMap, jsonStringify } from '@p-lc/shared'
import type { UidlComponent } from '@p-lc/uidl'
import {
  addUidlComponent,
  createUidlComponent,
  DEFAULT_IMPORT_EXPORT_PATH,
  DEFAULT_PKG_NAME,
  DEFAULT_PKG_VERSION,
  dfsElement,
} from '@p-lc/uidl-utils'
import { isNull } from 'lodash-uni'
import type {
  AnyEditorPlugin,
  EditorDefaultPropertiesExtHkt,
  EditorDefaultPropertiesExtHktPlugin,
  EditorRawPlugin,
} from '../../types'
import type { PdStore } from '../pd-store-plugins'
import { type editorPluginUidlUtilsConfig } from '../uidl-utils-config-plugins'
import { type editorPluginUidlStore } from './editor-plugin-uidl-store'
import { type editorPluginUidlStoreEdit } from './editor-plugin-uidl-store-edit'

/**
 * 编辑器 UIDL 仓库组件插件属性扩展高等类型
 */
export interface EditorPluginUidlStoreComponentsPropertiesExtHkt<
  Plugin extends AnyEditorPlugin,
> {
  editor: {
    /**
     * PD 仓库，防止循环引用
     */
    pdStore: PdStore<Plugin>
    /**
     * UIDL 仓库
     */
    uidlStore: {
      /**
       * 创建 UIDL 组件，修改 UIDL
       * @param pkgName 包名
       * @param componentType 组件类型
       */
      createUidlComponent(pkgName: string, componentType: string): UidlComponent
      /**
       * 清理 UIDL 组件
       */
      clearUidlComponents(): void
      /**
       * 获取 UIDL 组件
       * @param elementType 元素类型
       */
      getUidlComponent(elementType: string): UidlComponent
      /**
       * 获取元素类型
       * @param pkgName 包名
       * @param componentType 组件类型
       */
      getElementType(pkgName: string, componentType: string): string | null
      /**
       * 获取元素类型，不存在就抛出异常
       * @param pkgName 包名
       * @param componentType 组件类型
       */
      getElementTypeOrThrow(pkgName: string, componentType: string): string
      /**
       * 确保元素类型
       * @param pkgName 包名
       * @param componentType 组件类型
       */
      ensureElementType(pkgName: string, componentType: string): string
    }
  }
}

/**
 * EditorPluginUidlStoreComponentsPropertiesExtHkt 辅助类型
 */
export interface $EditorPluginUidlStoreComponentsPropertiesExtHkt
  extends EditorDefaultPropertiesExtHkt {
  type: EditorPluginUidlStoreComponentsPropertiesExtHkt<
    EditorDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 编辑器 UIDL 仓库组件插件
 */
export const editorPluginUidlStoreComponents: EditorRawPlugin<
  $EditorPluginUidlStoreComponentsPropertiesExtHkt,
  | typeof editorPluginUidlStore
  | typeof editorPluginUidlStoreEdit
  | typeof editorPluginUidlUtilsConfig
> = {
  id: 'uidl-store-components',
  initEditor(ctx) {
    const { uidlStore, uidlUtilsConfig } = ctx
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    uidlStore.createUidlComponent = (pkgName, componentType) => {
      const { pdStore } = ctx
      const pd = pdStore.getPd(pkgName)
      const cd = pdStore.getCd(pkgName, componentType)
      const component = createUidlComponent(
        uidlStore.getUidlOrThrow(),
        pkgName,
        pd.pkgVersion,
        componentType,
        cd.code.importPath || DEFAULT_IMPORT_EXPORT_PATH,
      )
      uidlStore.edit((uidl) => {
        addUidlComponent(uidl, component)
      })
      return component
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    uidlStore.clearUidlComponents = () => {
      uidlStore.edit((uidl) => {
        const { components } = uidl
        if (!components) return
        const currentElementTypeSet = new Set(
          components.map((component) => component.elementType),
        )
        const usingElementTypeSet = new Set<string>()
        for (const ed of dfsElement(uidlUtilsConfig, uidl)) {
          usingElementTypeSet.add(ed.element.type)
        }
        if (currentElementTypeSet.size === usingElementTypeSet.size) {
          return
        }
        uidl.components = components.filter((component) =>
          usingElementTypeSet.has(component.elementType),
        )
      })
    }
    const componentsToElementTypeMap = createWeakMemoizeArrayToMap(
      (component: UidlComponent) => component.elementType,
    )
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    uidlStore.getUidlComponent = (elementType) => {
      const { components } = uidlStore.getUidlOrThrow()
      return (
        (components &&
          componentsToElementTypeMap(components).get(elementType)) || {
          elementType,
          pkgName: DEFAULT_PKG_NAME,
          pkgVersion: DEFAULT_PKG_VERSION,
          componentType: elementType,
        }
      )
    }
    const componentsToPkgNameComponentTypeMap = createWeakMemoizeArrayToMap(
      (component: UidlComponent) =>
        jsonStringify([component.pkgName, component.componentType]),
    )
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    uidlStore.getElementType = (pkgName, componentType) => {
      if (pkgName === DEFAULT_PKG_NAME) {
        return componentType
      }
      const { components } = uidlStore.getUidlOrThrow()
      const component =
        components &&
        componentsToPkgNameComponentTypeMap(components).get(
          jsonStringify([pkgName, componentType]),
        )
      return component?.elementType ?? null
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    uidlStore.getElementTypeOrThrow = (pkgName, componentType) => {
      const ret = uidlStore.getElementType(pkgName, componentType)
      if (isNull(ret)) {
        throw new Error(
          `The elementType not exists for pkgName=${pkgName} and componentType=${componentType}.`,
        )
      }
      return ret
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    uidlStore.ensureElementType = (pkgName, componentType) => {
      const ret = uidlStore.getElementType(pkgName, componentType)
      if (isNull(ret)) {
        return uidlStore.createUidlComponent(pkgName, componentType).elementType
      }
      return ret
    }
  },
}
