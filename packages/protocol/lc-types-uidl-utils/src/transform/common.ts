import type { LcTypesUidl, LcTypesUidlElement } from '@p-lc/lc-types-uidl'
import {
  attrWrapperPropsBaseKeys,
  countKeys,
  EN_US,
  LC_TYPES_UI_COMPONENT_TYPE_ATTR_CATEGORIES,
  LC_TYPES_UI_COMPONENT_TYPE_ATTR_SWITCHER,
  LC_TYPES_UI_COMPONENT_TYPE_BINDING_ATTR,
  PKG_NAME_LC_TYPES_UI,
  V_0_0_1,
  ZH_CN,
} from '@p-lc/shared'
import type { UidlExpressionSlot } from '@p-lc/uidl'
import { EXPRESSION_TYPE_I18N, mergeI18nResource } from '@p-lc/uidl-ext-i18n'
import {
  addUidlComponent,
  createUidlComponent,
  dfsElement,
  ensureUidlComponents,
  EXPRESSION_TYPE_ARRAY,
  EXPRESSION_TYPE_OBJECT,
  EXPRESSION_TYPE_SLOT,
  getStaticExpressionValue,
  isSlotExpression,
  toArrayExpression,
  toObjectExpression,
} from '@p-lc/uidl-utils'
import { mapValues, omit, pick } from 'lodash-uni'
import { lcTypesUidlUtilsConfig } from '../config'

/**
 * 确保属性分类，原地修改
 * @param uidl UIDL
 */
export function ensureAttrCategories(uidl: LcTypesUidl): LcTypesUidlElement {
  let attrCategoriesUidlComponent = uidl.components?.find(
    (cd) =>
      cd.pkgName === PKG_NAME_LC_TYPES_UI &&
      cd.componentType === LC_TYPES_UI_COMPONENT_TYPE_ATTR_CATEGORIES,
  )
  let attrCategoriesUidlElement: LcTypesUidlElement | undefined
  if (attrCategoriesUidlComponent) {
    const { elementType: attrCategoriesElementType } =
      attrCategoriesUidlComponent
    for (const { element } of dfsElement(lcTypesUidlUtilsConfig, uidl)) {
      if (element.type === attrCategoriesElementType) {
        attrCategoriesUidlElement = element
        break
      }
    }
  }
  if (!attrCategoriesUidlElement) {
    if (!attrCategoriesUidlComponent) {
      addUidlComponent(
        uidl,
        (attrCategoriesUidlComponent = createUidlComponent(
          uidl,
          PKG_NAME_LC_TYPES_UI,
          V_0_0_1,
          LC_TYPES_UI_COMPONENT_TYPE_ATTR_CATEGORIES,
        )),
      )
    }
    const { elementType: attrCategoriesElementType } =
      attrCategoriesUidlComponent
    const { view } = uidl
    const i18nKeyBasics = '_ac_basics'
    attrCategoriesUidlElement = {
      id: 'iAttrCategories',
      name: '',
      type: attrCategoriesElementType,
      props: {
        items: {
          type: EXPRESSION_TYPE_ARRAY,
          value: [
            {
              type: EXPRESSION_TYPE_OBJECT,
              value: {
                key: 'basics',
                label: {
                  type: EXPRESSION_TYPE_I18N,
                  key: i18nKeyBasics,
                },
                children: {
                  type: EXPRESSION_TYPE_SLOT,
                  value: view.children,
                },
              },
            },
          ],
        },
      },
    }
    view.children = [attrCategoriesUidlElement]
    // lc-types.json 目前没有做 minify，没有做语言切分，这里也暂时不做
    mergeI18nResource(uidl, {
      [EN_US]: {
        [i18nKeyBasics]: 'Basics',
      },
      [ZH_CN]: {
        [i18nKeyBasics]: '基础',
      },
    })
  }
  return attrCategoriesUidlElement
}

/**
 * 确保某个属性分类，原地修改
 * @param uidl UIDL
 * @param key 分类键值
 * @param i18nTexts 国际化文案，语言 -> 文案
 */
export function ensureAttrCategory(
  uidl: LcTypesUidl,
  key: string,
  i18nTexts: Record<string, string>,
): UidlExpressionSlot {
  const attrCategoriesUidlElement = ensureAttrCategories(uidl)
  let { props } = attrCategoriesUidlElement
  if (!props) {
    props = attrCategoriesUidlElement.props = {}
  }
  let itemsExpr = toArrayExpression(props.items)
  if (!itemsExpr) {
    itemsExpr = props.items = {
      type: EXPRESSION_TYPE_ARRAY,
      value: [],
    }
  }
  const itemsExprValue = itemsExpr.value
  let styleExprIndex = itemsExprValue.findIndex((expr) => {
    const objExpr = toObjectExpression(expr)
    return getStaticExpressionValue(objExpr?.value.key) === key
  })
  if (styleExprIndex === -1) {
    const i18nKey = `_ac_${key}`
    itemsExprValue[(styleExprIndex = itemsExprValue.length)] = {
      type: EXPRESSION_TYPE_OBJECT,
      value: {
        key,
        label: {
          type: EXPRESSION_TYPE_I18N,
          key: i18nKey,
        },
        children: {
          type: EXPRESSION_TYPE_SLOT,
          value: [],
        },
      },
    }
    // lc-types.json 目前没有做 minify，没有做语言切分，这里也暂时不做
    mergeI18nResource(
      uidl,
      mapValues(i18nTexts, (text) => ({ [i18nKey]: text })),
    )
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const styleExpr = (itemsExprValue[styleExprIndex] = toObjectExpression(
    itemsExprValue[styleExprIndex],
  )!)
  const styleExprValue = styleExpr.value
  let childrenExpr = styleExprValue.children
  if (!isSlotExpression(childrenExpr)) {
    childrenExpr = styleExprValue.children = {
      type: EXPRESSION_TYPE_SLOT,
      value: [],
    }
  }
  return childrenExpr as UidlExpressionSlot
}

/**
 * 通过可绑定的属性切换包装，原地修改 UIDL 添加国际化文案
 * @param uidl UIDL
 * @param uidlElement UIDL 元素
 * @param pkgVersion 包版本
 */
export function wrapByBindableAttrSwitcher(
  uidl: LcTypesUidl,
  uidlElement: LcTypesUidlElement,
  pkgVersion = V_0_0_1,
): LcTypesUidlElement {
  const { id, props: uidlElementProps, logicPath } = uidlElement
  const baseProps = pick(uidlElementProps, attrWrapperPropsBaseKeys)
  const otherProps = omit(uidlElementProps, attrWrapperPropsBaseKeys)
  const [etAttrSwitcher, etBindingAttr] = ensureUidlComponents(
    uidl,
    PKG_NAME_LC_TYPES_UI,
    pkgVersion,
    [
      LC_TYPES_UI_COMPONENT_TYPE_ATTR_SWITCHER,
      LC_TYPES_UI_COMPONENT_TYPE_BINDING_ATTR,
    ],
  )
  const i18nKeySwitcherStatic = 'switcherStatic'
  const i18nKeyBindingAttrName = 'bindingAttrName'
  // lc-types.json 目前没有做 minify，没有做语言切分，这里也暂时不做
  mergeI18nResource(uidl, {
    [EN_US]: {
      [i18nKeySwitcherStatic]: 'Static',
      [i18nKeyBindingAttrName]: 'Binding',
    },
    [ZH_CN]: {
      [i18nKeySwitcherStatic]: '静态',
      [i18nKeyBindingAttrName]: '绑定',
    },
  })
  return {
    id: `${id}Switcher`,
    name: '',
    type: etAttrSwitcher,
    props: {
      items: {
        type: 'array',
        value: [
          {
            type: 'object',
            value: {
              key: 'static',
              label: {
                type: 'i18n',
                key: i18nKeySwitcherStatic,
              },
              render: {
                type: 'slot',
                value: [
                  {
                    ...omit(uidlElement, 'logicPath', 'props'),
                    ...(countKeys(otherProps) ? { props: otherProps } : {}),
                  },
                ],
                dynamic: true,
              },
            },
          },
          {
            type: 'object',
            value: {
              key: 'BindingAttr',
              label: {
                type: 'i18n',
                key: i18nKeyBindingAttrName,
              },
              render: {
                type: 'slot',
                value: [
                  {
                    id: `${id}Binding`,
                    name: '',
                    type: etBindingAttr,
                  },
                ],
                dynamic: true,
              },
            },
          },
        ],
      },
      ...baseProps,
    },
    ...(logicPath ? { logicPath } : {}),
  }
}

/**
 * 通过可绑定的属性切换包装多个元素，原地修改 UIDL 添加国际化文案
 * @param uidl UIDL
 * @param uidlElements UIDL 元素
 * @param pkgVersion 包版本
 */
export function wrapElementsByBindableAttrSwitcher(
  uidl: LcTypesUidl,
  uidlElements: LcTypesUidlElement[],
  pkgVersion = V_0_0_1,
): LcTypesUidlElement[] {
  return uidlElements.map((uidlElement) =>
    wrapByBindableAttrSwitcher(uidl, uidlElement, pkgVersion),
  )
}
