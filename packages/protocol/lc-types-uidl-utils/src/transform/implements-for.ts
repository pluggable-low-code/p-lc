import type { LcTypesUidl, LcTypesUidlElement } from '@p-lc/lc-types-uidl'
import {
  EN_US,
  LC_TYPES_UI_COMPONENT_TYPE_ATTR_GROUP,
  LC_TYPES_UI_COMPONENT_TYPE_JSON_ATTR,
  LC_TYPES_UI_COMPONENT_TYPE_STRING_ATTR,
  PKG_NAME_LC_TYPES_UI,
  V_0_0_1,
  ZH_CN,
} from '@p-lc/shared'
import { mergeI18nResource } from '@p-lc/uidl-ext-i18n'
import { ensureUidlComponents } from '@p-lc/uidl-utils'
import {
  ensureAttrCategory,
  wrapElementsByBindableAttrSwitcher,
} from './common'

/**
 * 通过实现列表渲染转换 UIDL
 * @param uidl UIDL
 */
export function transformUidlByImplementsFor(uidl: LcTypesUidl): LcTypesUidl {
  if (!uidl.implements?.for) return uidl
  const slot = ensureAttrCategory(uidl, 'advanced', {
    [EN_US]: 'Advanced',
    [ZH_CN]: '高级',
  })
  slot.value.push(...generateImplementsForElements(uidl))
  return uidl
}

/**
 * 生成实现列表渲染元素，原地修改 UIDL 添加国际化文案
 * @param uidl UIDL
 */
export function generateImplementsForElements(
  uidl: LcTypesUidl,
): LcTypesUidlElement[] {
  const [etAttrGroup, etJsonAttr, etStringAttr] = ensureUidlComponents(
    uidl,
    PKG_NAME_LC_TYPES_UI,
    V_0_0_1,
    [
      LC_TYPES_UI_COMPONENT_TYPE_ATTR_GROUP,
      LC_TYPES_UI_COMPONENT_TYPE_JSON_ATTR,
      LC_TYPES_UI_COMPONENT_TYPE_STRING_ATTR,
    ],
  )
  const i18nKeyFor = '_for'
  const i18nKeyForItems = '_forItems'
  const i18nKeyForKey = '_forKey'
  // lc-types.json 目前没有做 minify，没有做语言切分，这里也暂时不做
  mergeI18nResource(uidl, {
    [EN_US]: {
      [i18nKeyFor]: 'For',
      [i18nKeyForItems]: 'Items',
      [i18nKeyForKey]: 'Key',
    },
    [ZH_CN]: {
      [i18nKeyFor]: '列表渲染',
      [i18nKeyForItems]: '条目',
      [i18nKeyForKey]: '键值',
    },
  })
  return [
    {
      id: 'iForGroup',
      name: '',
      type: etAttrGroup,
      props: {
        label: {
          type: 'i18n',
          key: i18nKeyFor,
        },
      },
      logicPath: ['for'],
      children: wrapElementsByBindableAttrSwitcher(uidl, [
        {
          id: 'iForItems',
          name: '',
          type: etJsonAttr,
          props: {
            label: {
              type: 'i18n',
              key: i18nKeyForItems,
            },
          },
          logicPath: ['items'],
        },
        {
          id: 'iForKey',
          name: '',
          type: etStringAttr,
          props: {
            label: {
              type: 'i18n',
              key: i18nKeyForKey,
            },
          },
          logicPath: ['key'],
        },
      ]),
    },
  ]
}
