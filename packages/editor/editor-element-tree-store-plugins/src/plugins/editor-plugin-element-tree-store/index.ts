import type {
  AnyEditorPlugin,
  EditorDefaultPropertiesExtHkt,
  EditorDefaultPropertiesExtHktPlugin,
  EditorPlugin,
  UidlStoreUidl,
  UidlStoreUidlElement,
} from '@p-lc/editor'
import type { Slot } from '@p-lc/pd'
import {
  SLOT_TYPE_DYNAMIC_PATH,
  SLOT_TYPE_STATIC_PATH,
  createUnknownTempSlot,
  findIdentifierForDynamicPathSlot,
  isChildrenSlot,
  isSlotMatched,
  logicPathToTempName,
} from '@p-lc/pd-utils'
import type { JsonPath } from '@p-lc/shared'
import { EN_US, ZH_CN, jsonStringify } from '@p-lc/shared'
import type { EditorUidl, UidlExpressionSlot } from '@p-lc/uidl'
import type {
  ElementOfUidl,
  ExpressionOfUidl,
  TraverseExpressionDetail,
} from '@p-lc/uidl-utils'
import {
  bfsChildExpressionsInElement,
  childrenSlotLogicPath,
  isSlotExpression,
  normalizeExpression,
} from '@p-lc/uidl-utils'
import { action, observable } from 'mobx'
import { ElementTreeNode, ElementTreeSlot } from './components'
import type { EditorPluginElementTreeStoreI18nKeyOptions } from './i18n'
import {
  editorPluginElementTreeStoreI18n,
  editorPluginElementTreeStoreI18nEnUs,
  editorPluginElementTreeStoreI18nZhCn,
} from './i18n'

export * from './components'
export * from './i18n'

/**
 * 编辑器元素树仓库插件属性扩展高等类型
 */
export interface EditorPluginElementTreeStorePropertiesExtHkt<
  Plugin extends AnyEditorPlugin,
> {
  editor: {
    /**
     * 国际化仓库
     */
    i18nStore: {
      /**
       * 翻译键值选项
       */
      tKeyOptions: EditorPluginElementTreeStoreI18nKeyOptions
    }
    /**
     * 元素树仓库
     */
    elementTreeStore: {
      /**
       * 原生元素，组件树 DOM 根元素
       */
      el: HTMLElement | null
      /**
       * 设置原生元素
       * @param el 原生元素
       */
      setEl(el: HTMLElement | null): void
      /**
       * 组件
       */
      components: ElementTreeComponents
      /**
       * 已折叠（状态）映射表，键值 -> 已折叠
       *
       * observable.set 所有键值查询都会被监听，observable(create(null)) 会自带 toString
       */
      foldedMap: Map<string, boolean>
      /**
       * 已折叠
       * @param key 键值：元素 ID、插槽键值
       */
      isFolded(key: string): boolean
      /**
       * 折叠
       * @param key 键值：元素 ID、插槽键值
       */
      fold(key: string): void
      /**
       * 展开
       * @param key 键值：元素 ID、插槽键值
       */
      unfold(key: string): void
      /**
       * 切换折叠、展开状态
       * @param key 键值：元素 ID、插槽键值
       */
      toggleFold(key: string): void
      /**
       * 获取充血插槽
       * @param element 元素
       */
      getRichSlots(
        element: UidlStoreUidlElement<Plugin>,
      ): RichSlot<UidlStoreUidl<Plugin>>[]
    }
  }
}

/**
 * 元素树组件
 */
export interface ElementTreeComponents {
  /**
   * 树节点
   */
  ElementTreeNode: typeof ElementTreeNode
  /**
   * 树插槽
   */
  ElementTreeSlot: typeof ElementTreeSlot
}

/**
 * 充血插槽
 */
export interface RichSlot<U extends EditorUidl = EditorUidl> {
  /**
   * 元素
   */
  element: ElementOfUidl<U>
  /**
   * 逻辑路径
   */
  logicPath: JsonPath
  /**
   * 子元素
   */
  childElements: ElementOfUidl<U>[]
  /**
   * 插槽
   */
  slot: Slot
  /**
   * 键值
   */
  key: string
  /**
   * 名称
   */
  name: string
}

/**
 * EditorPluginElementTreeStorePropertiesExtHkt 辅助类型
 */
export interface $EditorPluginElementTreeStorePropertiesExtHkt
  extends EditorDefaultPropertiesExtHkt {
  type: EditorPluginElementTreeStorePropertiesExtHkt<
    EditorDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 编辑器元素树仓库插件
 */
export const editorPluginElementTreeStore: EditorPlugin<$EditorPluginElementTreeStorePropertiesExtHkt> =
  {
    id: 'element-tree-store',
    initEditor(ctx) {
      const { uidlUtilsConfig, i18nStore, uidlStore } = ctx
      //#region i18n 摇树
      // 打包器预处理，只能处理 if-else，不能处理 switch-case
      if (!process.env.LC_LANGUAGE) {
        i18nStore.addResource(editorPluginElementTreeStoreI18n)
      } else if (process.env.LC_LANGUAGE === EN_US) {
        i18nStore.addResource({
          [EN_US]: editorPluginElementTreeStoreI18nEnUs,
        })
      } else if (process.env.LC_LANGUAGE === ZH_CN) {
        i18nStore.addResource({
          [ZH_CN]: editorPluginElementTreeStoreI18nZhCn,
        })
      }
      //#endregion
      const elementTreeStore = (ctx.elementTreeStore =
        {} as typeof ctx.elementTreeStore)
      elementTreeStore.el = null
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      elementTreeStore.setEl = (el) => {
        elementTreeStore.el = el
      }
      elementTreeStore.components = {
        ElementTreeNode,
        ElementTreeSlot,
      }
      const foldedMap = (elementTreeStore.foldedMap = observable.map())
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      elementTreeStore.isFolded = (key) => {
        return foldedMap.has(key)
      }
      elementTreeStore.fold = action((key) => {
        foldedMap.set(key, true)
      })
      elementTreeStore.unfold = action((key) => {
        foldedMap.delete(key)
      })
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      elementTreeStore.toggleFold = (key) => {
        if (elementTreeStore.isFolded(key)) {
          elementTreeStore.unfold(key)
        } else {
          elementTreeStore.fold(key)
        }
      }
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      elementTreeStore.getRichSlots = (element) => {
        const { pkgName } = uidlStore.getUidlComponent(element.type)
        const rawSlots = ctx.pdStore.getSlotsByEt(element.type)
        const richSlots: RichSlot<EditorUidl>[] = []
        const childrenSlot = ctx.pdStore.getChildrenSlotWithUnknown(element)
        if (childrenSlot) {
          richSlots.push({
            element,
            logicPath: childrenSlotLogicPath,
            childElements: element.children || [],
            slot: childrenSlot,
            key: jsonStringify([element.id, childrenSlotLogicPath]),
            name: '',
          })
        }
        const otherSlots = rawSlots.filter((slot) => !isChildrenSlot(slot))
        const slotToEds = new Map<Slot, TraverseExpressionDetail<EditorUidl>[]>(
          otherSlots.map((slot) => [slot, []]),
        )
        for (const ed of bfsChildExpressionsInElement(
          uidlUtilsConfig,
          element,
        )) {
          const ne = normalizeExpression(ed.expression)
          if (!isSlotExpression(ne)) continue
          let slot = otherSlots.find((s) => isSlotMatched(s, ed.fullLogicPath))
          if (!slot) {
            otherSlots.push((slot = createUnknownTempSlot(ed.fullJsonPath)))
            slotToEds.set(slot, [])
          }
          slotToEds.get(slot)?.push(ed)
        }
        for (const slot of otherSlots) {
          const eds = slotToEds.get(slot)
          if (!eds) continue
          switch (slot.type) {
            case undefined:
            case SLOT_TYPE_STATIC_PATH: {
              const ed = eds[0] as (typeof eds)[0] | undefined
              const logicPath = slot.logicPath
              richSlots.push({
                element,
                logicPath,
                childElements:
                  (
                    ed?.expression as
                      | UidlExpressionSlot<
                          ExpressionOfUidl<EditorUidl>,
                          ElementOfUidl<EditorUidl>
                        >
                      | undefined
                  )?.value || [],
                slot,
                key: jsonStringify([element.id, logicPath]),
                name: slot.name
                  ? i18nStore.tText(slot.name, { pkgName })
                  : logicPathToTempName(logicPath),
              })
              break
            }
            case SLOT_TYPE_DYNAMIC_PATH: {
              for (const ed of eds) {
                const logicPath = ed.fullLogicPath
                const identifier = findIdentifierForDynamicPathSlot(
                  slot,
                  logicPath,
                )
                let name: string
                if (slot.name) {
                  name = i18nStore.tText(slot.name, { pkgName })
                  if (identifier) {
                    name += ` ${identifier}`
                  }
                } else {
                  name = logicPathToTempName(logicPath)
                }
                richSlots.push({
                  element,
                  logicPath,
                  childElements: (
                    ed.expression as UidlExpressionSlot<
                      ExpressionOfUidl<EditorUidl>,
                      ElementOfUidl<EditorUidl>
                    >
                  ).value,
                  slot,
                  key: jsonStringify([element.id, logicPath]),
                  name,
                })
              }
              break
            }
          }
        }
        return richSlots
      }
    },
  }
