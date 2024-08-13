import type { JsonPath, POSITION_TYPE_BEFORE } from '@p-lc/shared'
import {
  getObjectValueOrFirstValue,
  POSITION_TYPE_AFTER,
  unsetClean,
} from '@p-lc/shared'
import type { UidlExpressionSlot } from '@p-lc/uidl'
import type { ElementOfUidl } from '@p-lc/uidl-utils'
import {
  childrenSlotLogicPath,
  createElementId,
  EXPRESSION_TYPE_SLOT,
  logicGetElementArrayInElement,
  logicSetElementInElement,
  logicSetExpressionInElement,
} from '@p-lc/uidl-utils'
import { get, isArray, isNumber, last, set } from 'lodash-uni'
import type {
  AnyEditorPlugin,
  EditorDefaultPropertiesExtHkt,
  EditorDefaultPropertiesExtHktPlugin,
  EditorRawPlugin,
} from '../../types'
import { type editorPluginI18nStore } from '../i18n-store-plugins'
import { type editorPluginPdStore } from '../pd-store-plugins'
import type { UidlStoreUidlElement } from '../uidl-store-plugins'
import {
  type editorPluginUidlStore,
  type editorPluginUidlStoreComponents,
  type editorPluginUidlStoreEdit,
} from '../uidl-store-plugins'
import { type editorPluginUidlUtilsConfig } from '../uidl-utils-config-plugins'
import { type editorPluginElementStoreFind } from './editor-plugin-element-store-find'
import type { editorPluginElementStoreIs } from './editor-plugin-element-store-is'
import { type editorPluginElementStoreSelect } from './editor-plugin-element-store-select'

/**
 * 编辑器元素仓库编辑插件属性扩展高等类型
 */
export interface EditorPluginElementStoreEditPropertiesExtHkt<
  Plugin extends AnyEditorPlugin,
> {
  editor: {
    /**
     * 元素仓库
     */
    elementStore: {
      /**
       * 创建元素
       * @param pkgName 包名
       * @param componentType 组件类型
       */
      createElement(
        pkgName: string,
        componentType: string,
      ): UidlStoreUidlElement<Plugin>
      /**
       * 添加元素到尾部
       * @param elementId 元素 ID
       * @param slotLogicPath 插槽逻辑路径
       * @param dynamicRender 动态渲染
       * @param childElement （将被插入的）子元素
       */
      appendElement(
        elementId: string,
        slotLogicPath: JsonPath,
        dynamicRender: boolean,
        childElement: UidlStoreUidlElement<Plugin>,
      ): void
      /**
       * 插入元素
       * @param elementId 元素 ID
       * @param siblingElement （将被插入的）兄弟元素
       * @param order 兄弟元素处在该元素的前面还是后面，默认：`'after'`
       */
      insertElement(
        elementId: string,
        siblingElement: UidlStoreUidlElement<Plugin>,
        order?: typeof POSITION_TYPE_BEFORE | typeof POSITION_TYPE_AFTER,
      ): void
      /**
       * 可以通过目标元素（定位）添加元素
       * @param targetElement 目标元素
       */
      canAddElementByElement(
        targetElement?: UidlStoreUidlElement<Plugin> | null,
      ): boolean
      /**
       * 通过目标元素（定位）添加元素：
       * * 目标元素为容器组件：添加到目标元素子元素末尾
       * * 目标元素为非容器组件：添加到目标元素之后
       * * 目标元素不存在：添加到根元素末尾
       * @param element 元素
       * @param targetElement 目标元素
       */
      addElementByElement(
        element: UidlStoreUidlElement<Plugin>,
        targetElement?: UidlStoreUidlElement<Plugin> | null,
      ): void
      /**
       * 删除元素
       * @param elementId 元素 ID
       * @param clearUidlComponents 清理 UIDL 组件，默认：true
       */
      deleteElement(
        elementId: string,
        clearUidlComponents?: boolean,
      ): UidlStoreUidlElement<Plugin> | null
      /**
       * 编辑元素，根据元素 ID 编辑
       * @param element 元素
       * @param recipeId 配方 ID
       */
      editElement(
        element: UidlStoreUidlElement<Plugin>,
        recipeId?: string | number | null,
      ): void
    }
  }
}

/**
 * EditorPluginElementStoreEditPropertiesExtHkt 辅助类型
 */
export interface $EditorPluginElementStoreEditPropertiesExtHkt
  extends EditorDefaultPropertiesExtHkt {
  type: EditorPluginElementStoreEditPropertiesExtHkt<
    EditorDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 编辑器元素仓库编辑插件
 */
export const editorPluginElementStoreEdit: EditorRawPlugin<
  $EditorPluginElementStoreEditPropertiesExtHkt,
  | typeof editorPluginUidlStore
  | typeof editorPluginUidlStoreEdit
  | typeof editorPluginUidlStoreComponents
  | typeof editorPluginElementStoreIs
  | typeof editorPluginElementStoreFind
  | typeof editorPluginElementStoreSelect
  | typeof editorPluginUidlUtilsConfig
  | typeof editorPluginPdStore
  | typeof editorPluginI18nStore
> = {
  id: 'element-store-edit',
  initEditor(ctx) {
    const { elementStore, uidlStore, uidlUtilsConfig, pdStore, i18nStore } = ctx
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    elementStore.createElement = (pkgName, componentType) => {
      const elementType = uidlStore.ensureElementType(pkgName, componentType)
      const componentName = pdStore.getComponentName(pkgName, componentType)
      const id = createElementId()
      const name = elementStore.generateElementName(componentName)
      const cd = pdStore.getCd(pkgName, componentType)
      return {
        id,
        name,
        type: elementType,
        ...getObjectValueOrFirstValue(
          cd.initializer?.partialElement,
          i18nStore.language,
        ),
      }
    }
    elementStore.appendElement = (
      elementId,
      slotLogicPath,
      dynamicRender,
      childElement,
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ) => {
      const ed = elementStore.findElementDetail(elementId)
      if (!ed) return
      uidlStore.edit((uidl) => {
        type Element = ElementOfUidl<typeof uidl>
        const editingElement = get(uidl, ed.fullJsonPath) as Element
        const arr = logicGetElementArrayInElement(
          uidlUtilsConfig,
          editingElement,
          slotLogicPath,
        )
        const len = arr?.length || 0
        if (!len) {
          const expr: UidlExpressionSlot = {
            type: EXPRESSION_TYPE_SLOT,
            value: [childElement],
          }
          if (dynamicRender) {
            expr.dynamic = dynamicRender
          }
          logicSetExpressionInElement(
            uidlUtilsConfig,
            editingElement,
            slotLogicPath,
            expr,
          )
        } else {
          logicSetElementInElement(
            uidlUtilsConfig,
            editingElement,
            [...slotLogicPath, len],
            childElement,
          )
        }
      })
    }
    elementStore.insertElement = (
      elementId,
      childElement,
      order = POSITION_TYPE_AFTER,
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ) => {
      const ed = elementStore.findElementDetail(elementId)
      if (!ed || elementStore.isRootElement(elementId)) return
      uidlStore.edit((uidl) => {
        const arr = get(uidl, ed.fullJsonPath.slice(0, -1))
        let index = last(ed.fullJsonPath)
        if (!isArray(arr) || !isNumber(index)) return
        if (order === POSITION_TYPE_AFTER) index++
        arr.splice(index, 0, childElement)
      })
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    elementStore.canAddElementByElement = (targetElement) => {
      const { rootElement } = elementStore
      targetElement = targetElement || rootElement
      if (!targetElement) return false
      const targetElementIsContainer = pdStore.isContainerComponentByEt(
        targetElement.type,
      )
      if (targetElement === rootElement && !targetElementIsContainer) {
        return false
      }
      return true
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    elementStore.addElementByElement = (element, targetElement) => {
      const { rootElement } = elementStore
      targetElement = targetElement || rootElement
      if (!targetElement) return
      const targetElementIsContainer = pdStore.isContainerComponentByEt(
        targetElement.type,
      )
      uidlStore.edit(() => {
        const targetElementId = targetElement.id
        if (targetElementIsContainer) {
          elementStore.appendElement(
            targetElementId,
            childrenSlotLogicPath,
            false,
            element,
          )
        } else {
          elementStore.insertElement(targetElementId, element)
        }
      })
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    elementStore.deleteElement = (elementId, clearUidlComponents = true) => {
      if (elementStore.isRootElement(elementId)) {
        return null
      }
      const ed = elementStore.findElementDetail(elementId)
      if (!ed) return null
      uidlStore.edit((uidl) => {
        unsetClean(uidl, ed.fullJsonPath)
        if (clearUidlComponents) {
          uidlStore.clearUidlComponents()
        }
      })
      return ed.element
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    elementStore.editElement = (element, recipeId) => {
      const ed = elementStore.findElementDetail(element.id)
      if (!ed) return
      uidlStore.edit((uidl) => {
        set(uidl, ed.fullJsonPath, element)
      }, recipeId)
    }
  },
}
