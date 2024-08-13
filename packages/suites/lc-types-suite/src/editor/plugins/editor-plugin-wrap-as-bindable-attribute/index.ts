import {
  isContextMenuElement,
  type DepPluginUniteEditorPlugin,
  type EditorPlugin,
} from '@p-lc/editor'
import type {
  UniToolbarEditorPlugin,
  UniToolbarItem,
} from '@p-lc/editor-toolbar-plugins'
import { wrapByBindableAttrSwitcher } from '@p-lc/lc-types-uidl-utils'
import {
  EN_US,
  LC_TYPES_UI_COMPONENT_TYPE_ATTR_CATEGORIES,
  LC_TYPES_UI_COMPONENT_TYPE_ATTR_SWITCHER,
  PKG_NAME_LC_TYPES_UI,
  ZH_CN,
} from '@p-lc/shared'
import { createElementId, dfsElementInElement } from '@p-lc/uidl-utils'
import { get, set } from 'lodash-uni'
import type { editorPluginLcTypesStore } from '../editor-plugin-lc-types-store'
import type { editorPluginLcTypesUidl } from '../editor-plugin-lc-types-uidl'
import {
  editorPluginWrapAsBindableAttributeI18n,
  editorPluginWrapAsBindableAttributeI18nEnUs,
  editorPluginWrapAsBindableAttributeI18nZhCn,
  I18N_KEY_WRAP_AS_BINDABLE_ATTRIBUTE,
  type EditorPluginWrapAsBindableAttributeI18nKeyOptions,
} from './i18n'

export * from './i18n'

/**
 * 编辑器包装为可绑定属性插件属性扩展
 */
export interface EditorPluginWrapAsBindableAttributePropertiesExt {
  editor: {
    /**
     * 国际化仓库
     */
    i18nStore: {
      /**
       * 翻译键值选项
       */
      tKeyOptions: EditorPluginWrapAsBindableAttributeI18nKeyOptions
    }
    /**
     * 通用工具栏仓库
     */
    uniToolbarStore: {
      /**
       * 可以包装为可绑定属性
       * @param elementId 元素 ID
       */
      canWrapAsBindableAttribute(elementId: string): boolean
      /**
       * 包装为可绑定属性
       * @param elementId 元素 ID
       */
      wrapAsBindableAttribute(elementId: string): void
    }
  }
}

/**
 * 通用工具栏条目：包装为可绑定属性
 */
export const uniToolbarItemWrapAsBindableAttribute: UniToolbarItem<
  DepPluginUniteEditorPlugin<typeof editorPluginWrapAsBindableAttribute>
> = {
  id: 'wrap-as-bindable-attribute',
  contextMenuItem: {
    index: 850,
    label: {
      key: I18N_KEY_WRAP_AS_BINDABLE_ATTRIBUTE,
    },
    match(entity, { uniToolbarStore }) {
      const { elementId } = entity
      return (
        isContextMenuElement(entity) &&
        uniToolbarStore.canWrapAsBindableAttribute(elementId)
      )
    },
    action(entity, { uniToolbarStore }) {
      const { elementId } = entity
      uniToolbarStore.wrapAsBindableAttribute(elementId)
    },
  },
}

/**
 * 编辑器包装为可绑定属性插件
 */
export const editorPluginWrapAsBindableAttribute: EditorPlugin<
  EditorPluginWrapAsBindableAttributePropertiesExt,
  | UniToolbarEditorPlugin
  | typeof editorPluginLcTypesStore
  | typeof editorPluginLcTypesUidl
> = {
  id: 'wrap-as-bindable-attribute',
  initEditor(ctx) {
    const {
      uniToolbarStore,
      i18nStore,
      uidlStore,
      elementStore,
      pdStore,
      lcTypesStore,
      uidlUtilsConfig,
    } = ctx
    //#region i18n 摇树
    // 打包器预处理，只能处理 if-else，不能处理 switch-case
    if (!process.env.LC_LANGUAGE) {
      i18nStore.addResource(editorPluginWrapAsBindableAttributeI18n)
    } else if (process.env.LC_LANGUAGE === EN_US) {
      i18nStore.addResource({
        [EN_US]: editorPluginWrapAsBindableAttributeI18nEnUs,
      })
    } else if (process.env.LC_LANGUAGE === ZH_CN) {
      i18nStore.addResource({
        [ZH_CN]: editorPluginWrapAsBindableAttributeI18nZhCn,
      })
    }
    //#endregion
    uniToolbarStore.addItem(uniToolbarItemWrapAsBindableAttribute)
    uniToolbarStore.canWrapAsBindableAttribute = canWrapAsBindableAttribute
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    uniToolbarStore.wrapAsBindableAttribute = (elementId) => {
      if (!canWrapAsBindableAttribute(elementId)) return
      const pkgVersion = lcTypesStore.getLcTypesUiVersion()
      const { findElementDetail, generateElementName } = elementStore
      const ed = findElementDetail(elementId)
      if (!pkgVersion || !ed) return
      const { fullJsonPath } = ed
      uidlStore.edit((uidl) => {
        let element = get(uidl, fullJsonPath) as typeof ed.element
        element = wrapByBindableAttrSwitcher(uidl, element, pkgVersion)
        for (const d of dfsElementInElement(uidlUtilsConfig, element)) {
          if (d.elementIdPath.includes(elementId)) {
            continue
          }
          const { element: ele } = d
          ele.id = createElementId()
          const componentName = pdStore.getComponentNameByEt(ele.type)
          ele.name = generateElementName(componentName)
        }
        set(uidl, ed.fullJsonPath, element)
      })
    }

    function canWrapAsBindableAttribute(elementId: string): boolean {
      const { isElementType, isRootElement, findElementDetail } = elementStore
      if (isRootElement(elementId)) return false
      const ed = findElementDetail(elementId)
      if (!ed) return false
      const { parentElementId } = ed
      if (
        !parentElementId ||
        isElementType(
          parentElementId,
          PKG_NAME_LC_TYPES_UI,
          LC_TYPES_UI_COMPONENT_TYPE_ATTR_SWITCHER,
        )
      ) {
        return false
      }
      if (
        isElementType(
          elementId,
          PKG_NAME_LC_TYPES_UI,
          LC_TYPES_UI_COMPONENT_TYPE_ATTR_SWITCHER,
        ) ||
        isElementType(
          elementId,
          PKG_NAME_LC_TYPES_UI,
          LC_TYPES_UI_COMPONENT_TYPE_ATTR_CATEGORIES,
        )
      ) {
        return false
      }
      return true
    }
  },
}
