import type { LcTypesUidlElement } from '@p-lc/lc-types-uidl'
import type { DynamicPathSlot, Pd, Slot, StaticPathSlot, Text } from '@p-lc/pd'
import { SLOT_TYPE_DYNAMIC_PATH } from '@p-lc/pd-utils'
import type { JsonPath } from '@p-lc/shared'
import { PKG_NAME_LC_TYPES_UI } from '@p-lc/shared'
import { isI18nExpression } from '@p-lc/uidl-ext-i18n'
import { dfsElement } from '@p-lc/uidl-utils'
import { produce } from 'immer'
import { isString } from 'lodash-uni'
import type { LcTypesEditor } from '../types'

/**
 * 保存前转换一下 PD，计算插槽信息等
 * @param pd PD
 */
export function transformPdBeforeSave(pd: Pd, ctx: LcTypesEditor): Pd {
  const { uidlUtilsConfig } = ctx
  return produce(pd, (draft) => {
    for (const cd of draft.components) {
      let slotAttrElementType: string | undefined
      let attrListElementType: string | undefined
      for (const { elementType, pkgName, componentType } of cd.components ||
        []) {
        if (pkgName === PKG_NAME_LC_TYPES_UI) {
          if (componentType === 'SlotAttr') {
            slotAttrElementType = elementType
          } else if (componentType === 'AttrList') {
            attrListElementType = elementType
          }
        }
      }
      const idLogicPathMap = new Map<string, JsonPath>()
      const idIsListMap = new Map<string, boolean>()
      const getMergedLogicPath = (
        elementIdPath: string[],
      ): [boolean, JsonPath] => {
        let isDynamicPath = false
        const mergedLogicPath: JsonPath = []
        for (const id of elementIdPath) {
          const logicPath = idLogicPathMap.get(id)
          if (logicPath) {
            mergedLogicPath.push(...logicPath)
          }
          if (idIsListMap.get(id)) {
            mergedLogicPath.push('*')
            isDynamicPath = true
          }
        }
        return [isDynamicPath, mergedLogicPath]
      }
      const slots: Slot[] = []
      if (slotAttrElementType) {
        for (const ed of dfsElement(uidlUtilsConfig, cd)) {
          const { element, elementIdPath } = ed
          const {
            id,
            type,
            props,
            logicPath = [],
          } = element as LcTypesUidlElement
          idLogicPathMap.set(id, logicPath)
          idIsListMap.set(id, type === attrListElementType)
          const [isDynamicPath, mergedLogicPath] =
            getMergedLogicPath(elementIdPath)
          if (type === slotAttrElementType) {
            const propLabel = props?.label
            const propDynamic = props?.dynamic
            let name: Text | undefined
            if (isString(propLabel)) {
              name = propLabel
            }
            if (isI18nExpression(propLabel)) {
              name = {
                key: propLabel.key,
              }
            }
            const dynamicRender = !!propDynamic
            let slot: Slot
            if (isDynamicPath) {
              const s: DynamicPathSlot = {
                type: SLOT_TYPE_DYNAMIC_PATH,
                dynamicLogicPath: mergedLogicPath,
              }
              slot = s
            } else {
              const s: StaticPathSlot = {
                logicPath: mergedLogicPath,
              }
              slot = s
            }
            if (name) {
              slot.name = name
            }
            if (dynamicRender) {
              slot.dynamicRender = dynamicRender
            }
            slots.push(slot)
          }
        }
      }
      if (slots.length) {
        cd.slots = slots
      } else {
        delete cd.slots
      }
    }
  })
}
