import type { LcTypesUidl, LcTypesUidlElement } from '@p-lc/lc-types-uidl'
import {
  EN_US,
  LC_TYPES_UI_COMPONENT_TYPE_BOOLEAN_ATTR,
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
 * 通过实现条件渲染转换 UIDL
 * @param uidl UIDL
 */
export function transformUidlByImplementsIf(uidl: LcTypesUidl): LcTypesUidl {
  if (!uidl.implements?.if) return uidl
  const slot = ensureAttrCategory(uidl, 'advanced', {
    [EN_US]: 'Advanced',
    [ZH_CN]: '高级',
  })
  slot.value.push(...generateImplementsIfElements(uidl))
  return uidl
}

/**
 * 生成实现条件渲染元素，原地修改 UIDL 添加国际化文案
 * @param uidl UIDL
 */
export function generateImplementsIfElements(
  uidl: LcTypesUidl,
): LcTypesUidlElement[] {
  const [etBooleanAttr] = ensureUidlComponents(
    uidl,
    PKG_NAME_LC_TYPES_UI,
    V_0_0_1,
    [LC_TYPES_UI_COMPONENT_TYPE_BOOLEAN_ATTR],
  )
  const i18nKeyIf = '_If'
  // lc-types.json 目前没有做 minify，没有做语言切分，这里也暂时不做
  mergeI18nResource(uidl, {
    [EN_US]: {
      [i18nKeyIf]: 'If',
    },
    [ZH_CN]: {
      [i18nKeyIf]: '条件渲染',
    },
  })
  return wrapElementsByBindableAttrSwitcher(uidl, [
    {
      id: 'iIf',
      name: '',
      type: etBooleanAttr,
      props: {
        label: {
          type: 'i18n',
          key: i18nKeyIf,
        },
      },
      logicPath: ['if'],
    },
  ])
}
