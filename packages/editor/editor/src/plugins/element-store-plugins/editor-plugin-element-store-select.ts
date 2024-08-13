import type { Cd, Pd } from '@p-lc/pd'
import { definePropertyByGetter } from '@p-lc/shared'
import { isNull } from 'lodash-uni'
import { computed, makeObservable } from 'mobx'
import type {
  AnyEditorPlugin,
  EditorDefaultPropertiesExtHkt,
  EditorDefaultPropertiesExtHktPlugin,
  EditorRawPlugin,
} from '../../types'
import { type editorPluginLayoutStore } from '../layout-store-plugins'
import { type editorPluginPdStore } from '../pd-store-plugins'
import type { UidlStoreUidlElement } from '../uidl-store-plugins'
import {
  type editorPluginUidlStore,
  type editorPluginUidlStoreComponents,
} from '../uidl-store-plugins'
import { type editorPluginUidlUtilsConfig } from '../uidl-utils-config-plugins'
import { type editorPluginElementStoreFind } from './editor-plugin-element-store-find'

/**
 * 编辑器元素仓库选择插件属性扩展高等类型
 */
export interface EditorPluginElementStoreSelectPropertiesExtHkt<
  Plugin extends AnyEditorPlugin,
> {
  editor: {
    /**
     * 元素仓库
     */
    elementStore: {
      /**
       * 选中的元素 ID
       */
      selectedElementId: string | null
      /**
       * 选中的元素
       */
      selectedElement: UidlStoreUidlElement<Plugin> | null
      /**
       * 选中的元素对应的包声明
       */
      selectedPd: Pd | null
      /**
       * 选中的元素对应的组件声明
       */
      selectedCd: Cd | null
      /**
       * 选择元素
       * @param elementId 元素 ID
       */
      selectElement(elementId: string | null): void
    }
    /**
     * 布局仓库
     */
    layoutStore: {
      /**
       * UIDL 状态
       */
      uidlState: {
        /**
         * 选中的元素 ID
         */
        selectedElementId?: string | null
      }
    }
  }
}

/**
 * EditorPluginElementStoreSelectPropertiesExtHkt 辅助类型
 */
export interface $EditorPluginElementStoreSelectPropertiesExtHkt
  extends EditorDefaultPropertiesExtHkt {
  type: EditorPluginElementStoreSelectPropertiesExtHkt<
    EditorDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 编辑器元素仓库选择插件
 */
export const editorPluginElementStoreSelect: EditorRawPlugin<
  $EditorPluginElementStoreSelectPropertiesExtHkt,
  | typeof editorPluginUidlUtilsConfig
  | typeof editorPluginLayoutStore
  | typeof editorPluginElementStoreFind
  | typeof editorPluginUidlStore
  | typeof editorPluginPdStore
  | typeof editorPluginUidlStoreComponents
> = {
  id: 'element-store-select',
  initEditor(ctx) {
    const { layoutStore, elementStore, pdStore, uidlStore } = ctx
    definePropertyByGetter(elementStore, 'selectedElementId', () => {
      return layoutStore.uidlState.selectedElementId || null
    })
    definePropertyByGetter(elementStore, 'selectedElement', () => {
      const { selectedElementId } = elementStore
      if (isNull(selectedElementId)) return null
      return elementStore.findElementDetail(selectedElementId)?.element || null
    })
    definePropertyByGetter(elementStore, 'selectedPd', () => {
      const { selectedElement } = elementStore
      if (!selectedElement) return null
      const { pkgName } = uidlStore.getUidlComponent(selectedElement.type)
      return pdStore.getPd(pkgName)
    })
    definePropertyByGetter(elementStore, 'selectedCd', () => {
      const { selectedElement } = elementStore
      if (!selectedElement) return null
      return pdStore.getCdByEt(selectedElement.type)
    })
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    elementStore.selectElement = (elementId) => {
      layoutStore.setUidlState({
        selectedElementId: elementId,
      })
    }
    makeObservable(elementStore, {
      selectedElementId: computed,
      selectedElement: computed,
      selectedCd: computed,
    })
  },
}
