import type { LcTypesUidl, LcTypesUidlElement } from '@p-lc/lc-types-uidl'
import {
  EN_US,
  LC_TYPES_UI_COMPONENT_TYPE_ATTR_GROUP,
  LC_TYPES_UI_COMPONENT_TYPE_COLOR_ATTR,
  LC_TYPES_UI_COMPONENT_TYPE_ENUM_ATTR,
  LC_TYPES_UI_COMPONENT_TYPE_NUMBER_ATTR,
  LC_TYPES_UI_COMPONENT_TYPE_QUATERNITY_ATTR,
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
 * 通过实现样式转换 UIDL
 * @param uidl UIDL
 */
export function transformUidlByImplementsStyle(uidl: LcTypesUidl): LcTypesUidl {
  if (!uidl.implements?.style) return uidl
  const slot = ensureAttrCategory(uidl, 'styles', {
    [EN_US]: 'Styles',
    [ZH_CN]: '样式',
  })
  slot.value.push(...generateImplementsStyleElements(uidl))
  return uidl
}

/**
 * 生成实现样式元素，原地修改 UIDL 添加国际化文案
 * @param uidl UIDL
 */
export function generateImplementsStyleElements(
  uidl: LcTypesUidl,
): LcTypesUidlElement[] {
  const [
    etAttrGroup,
    etColorAttr,
    etEnumAttr,
    etQuaternityAttr,
    etNumberAttr,
    etStringAttr,
  ] = ensureUidlComponents(uidl, PKG_NAME_LC_TYPES_UI, V_0_0_1, [
    LC_TYPES_UI_COMPONENT_TYPE_ATTR_GROUP,
    LC_TYPES_UI_COMPONENT_TYPE_COLOR_ATTR,
    LC_TYPES_UI_COMPONENT_TYPE_ENUM_ATTR,
    LC_TYPES_UI_COMPONENT_TYPE_QUATERNITY_ATTR,
    LC_TYPES_UI_COMPONENT_TYPE_NUMBER_ATTR,
    LC_TYPES_UI_COMPONENT_TYPE_STRING_ATTR,
  ])
  const i18nKeyBox = '_strBox'
  const i18nKeyWidth = '_strWidth'
  const i18nKeyHeight = '_strHeight'
  const i18nKeyPadding = '_strPadding'
  const i18nKeyBorderWidth = '_strBorderWidth'
  const i18nKeyBorderStyle = '_strBorderStyle'
  const i18nKeySolid = '_strSolid'
  const i18nKeyDashed = '_strDashed'
  const i18nKeyDotted = '_strDotted'
  const i18nKeyBorderColor = '_strBorderColor'
  const i18nKeyBorderRadius = '_strBorderRadius'
  const i18nKeyMargin = '_strMargin'
  const i18nKeyPosition = '_strPosition'
  const i18nKeyStatic = '_strStatic'
  const i18nKeyRelative = '_strRelative'
  const i18nKeyAbsolute = '_strAbsolute'
  const i18nKeyFixed = '_strFixed'
  const i18nKeySticky = '_strSticky'
  const i18nKeyInset = '_strInset'
  const i18nKeyZIndex = '_strZIndex'
  const i18nKeyLayout = '_strLayout'
  const i18nKeyDisplay = '_strDisplay'
  const i18nKeyDisplayNone = '_displayNone'
  const i18nKeyDisplayBlock = '_displayBlock'
  const i18nKeyDisplayFlex = '_displayFlex'
  const i18nKeyDisplayInline = '_displayInline'
  const i18nKeyDisplayInlineBlock = '_displayInlineBlock'
  const i18nKeyDisplayInlineFlex = '_displayInlineFlex'
  const i18nKeyFlexDirection = '_strFlexDirection'
  const i18nKeyRow = '_strRow'
  const i18nKeyColumn = '_strColumn'
  const i18nKeyRowReverse = '_strRowReverse'
  const i18nKeyColumnReverse = '_strColumnReverse'
  const i18nKeyJustifyContent = '_strJustifyContent'
  const i18nKeyFlexStart = '_strFlexStart'
  const i18nKeyFlexEnd = '_strFlexEnd'
  const i18nKeyCenter = '_strCenter'
  const i18nKeySpaceBetween = '_strSpaceBetween'
  const i18nKeySpaceAround = '_strSpaceAround'
  const i18nKeyAlignItems = '_strAlignItems'
  const i18nKeyAlignItemsBaseline = '_alignItemsBaseline'
  const i18nKeyAlignItemsStretch = '_alignItemsStretch'
  const i18nKeyFlexWrap = '_strFlexWrap'
  const i18nKeyNoWrap = '_strNoWrap'
  const i18nKeyWrap = '_strWrap'
  const i18nKeyWrapReverse = '_strWrapReverse'
  const i18nKeyFlex = '_strFlex'
  const i18nKeyContent = '_strContent'
  const i18nKeyFontSize = '_strFontSize'
  const i18nKeyFontWeight = '_strFontWeight'
  const i18nKeyColor = '_strColor'
  const i18nKeyBackground = '_strBackground'
  // lc-types.json 目前没有做 minify，没有做语言切分，这里也暂时不做
  mergeI18nResource(uidl, {
    [EN_US]: {
      [i18nKeyBox]: 'Box',
      [i18nKeyWidth]: 'Width',
      [i18nKeyHeight]: 'Height',
      [i18nKeyPadding]: 'Padding',
      [i18nKeyBorderWidth]: 'Border width',
      [i18nKeyBorderStyle]: 'Border style',
      [i18nKeySolid]: 'Solid',
      [i18nKeyDashed]: 'Dashed',
      [i18nKeyDotted]: 'Dotted',
      [i18nKeyBorderColor]: 'Border color',
      [i18nKeyBorderRadius]: 'Border radius',
      [i18nKeyMargin]: 'Margin',
      [i18nKeyPosition]: 'Position',
      [i18nKeyStatic]: 'Static',
      [i18nKeyRelative]: 'Relative',
      [i18nKeyAbsolute]: 'Absolute',
      [i18nKeyFixed]: 'Fixed',
      [i18nKeySticky]: 'Sticky',
      [i18nKeyInset]: 'Inset',
      [i18nKeyZIndex]: 'Z index',
      [i18nKeyLayout]: 'Layout',
      [i18nKeyDisplay]: 'Display',
      [i18nKeyDisplayNone]: 'None',
      [i18nKeyDisplayBlock]: 'Block',
      [i18nKeyDisplayFlex]: 'Flex',
      [i18nKeyDisplayInline]: 'Inline',
      [i18nKeyDisplayInlineBlock]: 'Inline block',
      [i18nKeyDisplayInlineFlex]: 'Inline flex',
      [i18nKeyFlexDirection]: 'Flex direction',
      [i18nKeyRow]: 'Row',
      [i18nKeyColumn]: 'Column',
      [i18nKeyRowReverse]: 'Row reverse',
      [i18nKeyColumnReverse]: 'Column reverse',
      [i18nKeyJustifyContent]: 'Justify content',
      [i18nKeyFlexStart]: 'Start',
      [i18nKeyFlexEnd]: 'End',
      [i18nKeyCenter]: 'Center',
      [i18nKeySpaceBetween]: 'Space between',
      [i18nKeySpaceAround]: 'Space around',
      [i18nKeyAlignItems]: 'Align items',
      [i18nKeyAlignItemsBaseline]: 'Baseline',
      [i18nKeyAlignItemsStretch]: 'Stretch',
      [i18nKeyFlexWrap]: 'Flex wrap',
      [i18nKeyNoWrap]: 'No wrap',
      [i18nKeyWrap]: 'Wrap',
      [i18nKeyWrapReverse]: 'Wrap reverse',
      [i18nKeyFlex]: 'Flex',
      [i18nKeyContent]: 'Content',
      [i18nKeyFontSize]: 'Font size',
      [i18nKeyFontWeight]: 'Font weight',
      [i18nKeyColor]: 'Color',
      [i18nKeyBackground]: 'Background',
    },
    [ZH_CN]: {
      [i18nKeyBox]: '盒子',
      [i18nKeyWidth]: '宽',
      [i18nKeyHeight]: '高',
      [i18nKeyPadding]: '内边距',
      [i18nKeyBorderWidth]: '边框宽度',
      [i18nKeyBorderStyle]: '边框样式',
      [i18nKeySolid]: '实线',
      [i18nKeyDashed]: '虚线',
      [i18nKeyDotted]: '点线',
      [i18nKeyBorderColor]: '边框颜色',
      [i18nKeyBorderRadius]: '边框圆角',
      [i18nKeyMargin]: '外边距',
      [i18nKeyPosition]: '定位方式',
      [i18nKeyStatic]: '静态',
      [i18nKeyRelative]: '相对',
      [i18nKeyAbsolute]: '绝对',
      [i18nKeyFixed]: '固定',
      [i18nKeySticky]: '粘性',
      [i18nKeyInset]: '嵌入位置',
      [i18nKeyZIndex]: '层叠等级',
      [i18nKeyLayout]: '布局',
      [i18nKeyDisplay]: '展示类型',
      [i18nKeyDisplayNone]: '隐藏',
      [i18nKeyDisplayBlock]: '块',
      [i18nKeyDisplayFlex]: '弹性',
      [i18nKeyDisplayInline]: '内联',
      [i18nKeyDisplayInlineBlock]: '内联块',
      [i18nKeyDisplayInlineFlex]: '内联弹性',
      [i18nKeyFlexDirection]: '主轴方向',
      [i18nKeyRow]: '行',
      [i18nKeyColumn]: '列',
      [i18nKeyRowReverse]: '反向行',
      [i18nKeyColumnReverse]: '反向列',
      [i18nKeyJustifyContent]: '主轴对齐',
      [i18nKeyFlexStart]: '起点对齐',
      [i18nKeyFlexEnd]: '终点对齐',
      [i18nKeyCenter]: '居中',
      [i18nKeySpaceBetween]: '空白间隔',
      [i18nKeySpaceAround]: '空白环绕',
      [i18nKeyAlignItems]: '辅轴对齐',
      [i18nKeyAlignItemsBaseline]: '文字对齐',
      [i18nKeyAlignItemsStretch]: '高度占满',
      [i18nKeyFlexWrap]: '弹性换行',
      [i18nKeyNoWrap]: '不换行',
      [i18nKeyWrap]: '换行',
      [i18nKeyWrapReverse]: '反向换行',
      [i18nKeyFlex]: '弹性缩放',
      [i18nKeyContent]: '内容',
      [i18nKeyFontSize]: '字体大小',
      [i18nKeyFontWeight]: '字体粗细',
      [i18nKeyColor]: '颜色',
      [i18nKeyBackground]: '背景',
    },
  })
  return [
    {
      id: 'iStyleGroupBox',
      name: '',
      type: etAttrGroup,
      props: {
        label: {
          type: 'i18n',
          key: i18nKeyBox,
        },
      },
      children: wrapElementsByBindableAttrSwitcher(uidl, [
        {
          id: 'iStyleWidth',
          name: '',
          type: etStringAttr,
          props: {
            label: {
              type: 'i18n',
              key: i18nKeyWidth,
            },
          },
          logicPath: ['props', 'style', 'width'],
        },
        {
          id: 'iStyleHeight',
          name: '',
          type: etStringAttr,
          props: {
            label: {
              type: 'i18n',
              key: i18nKeyHeight,
            },
          },
          logicPath: ['props', 'style', 'height'],
        },
        {
          id: 'iStylePadding',
          name: '',
          type: etQuaternityAttr,
          props: {
            label: {
              type: 'i18n',
              key: i18nKeyPadding,
            },
          },
          logicPath: ['props', 'style', 'padding'],
        },
        {
          id: 'iStyleBorderWidth',
          name: '',
          type: etQuaternityAttr,
          props: {
            label: {
              type: 'i18n',
              key: i18nKeyBorderWidth,
            },
            layout: 'vertical',
          },
          logicPath: ['props', 'style', 'borderWidth'],
        },
        {
          id: 'iStyleBorderStyle',
          name: '',
          type: etEnumAttr,
          props: {
            label: {
              type: 'i18n',
              key: i18nKeyBorderStyle,
            },
            layout: 'vertical',
            options: {
              type: 'array',
              value: [
                {
                  type: 'object',
                  value: {
                    label: {
                      type: 'i18n',
                      key: i18nKeySolid,
                    },
                    value: 'solid',
                  },
                },
                {
                  type: 'object',
                  value: {
                    label: {
                      type: 'i18n',
                      key: i18nKeyDashed,
                    },
                    value: 'dashed',
                  },
                },
                {
                  type: 'object',
                  value: {
                    label: {
                      type: 'i18n',
                      key: i18nKeyDotted,
                    },
                    value: 'dotted',
                  },
                },
              ],
            },
          },
          logicPath: ['props', 'style', 'borderStyle'],
        },
        {
          id: 'iStyleBorderColor',
          name: '',
          type: etColorAttr,
          props: {
            label: {
              type: 'i18n',
              key: i18nKeyBorderColor,
            },
            layout: 'vertical',
          },
          logicPath: ['props', 'style', 'borderColor'],
        },
        {
          id: 'iStyleBorderRadius',
          name: '',
          type: etQuaternityAttr,
          props: {
            label: {
              type: 'i18n',
              key: i18nKeyBorderRadius,
            },
            layout: 'vertical',
          },
          logicPath: ['props', 'style', 'borderRadius'],
        },
        {
          id: 'iStyleMargin',
          name: '',
          type: etQuaternityAttr,
          props: {
            label: {
              type: 'i18n',
              key: i18nKeyMargin,
            },
          },
          logicPath: ['props', 'style', 'margin'],
        },
        {
          id: 'iStylePosition',
          name: '',
          type: etEnumAttr,
          props: {
            label: {
              type: 'i18n',
              key: i18nKeyPosition,
            },
            options: {
              type: 'array',
              value: [
                {
                  type: 'object',
                  value: {
                    value: 'static',
                    label: {
                      type: 'i18n',
                      key: i18nKeyStatic,
                    },
                  },
                },
                {
                  type: 'object',
                  value: {
                    value: 'relative',
                    label: {
                      type: 'i18n',
                      key: i18nKeyRelative,
                    },
                  },
                },
                {
                  type: 'object',
                  value: {
                    value: 'absolute',
                    label: {
                      type: 'i18n',
                      key: i18nKeyAbsolute,
                    },
                  },
                },
                {
                  type: 'object',
                  value: {
                    value: 'fixed',
                    label: {
                      type: 'i18n',
                      key: i18nKeyFixed,
                    },
                  },
                },
                {
                  type: 'object',
                  value: {
                    value: 'sticky',
                    label: {
                      type: 'i18n',
                      key: i18nKeySticky,
                    },
                  },
                },
              ],
            },
          },
          logicPath: ['props', 'style', 'position'],
        },
        {
          id: 'iStyleInset',
          name: '',
          type: etQuaternityAttr,
          props: {
            label: {
              type: 'i18n',
              key: i18nKeyInset,
            },
          },
          logicPath: ['props', 'style', 'inset'],
        },
        {
          id: 'iStyleZIndex',
          name: '',
          type: etNumberAttr,
          props: {
            label: {
              type: 'i18n',
              key: i18nKeyZIndex,
            },
          },
          logicPath: ['props', 'style', 'zIndex'],
        },
      ]),
    },
    {
      id: 'iStyleGroupLayout',
      name: '',
      type: etAttrGroup,
      props: {
        label: {
          type: 'i18n',
          key: i18nKeyLayout,
        },
      },
      children: wrapElementsByBindableAttrSwitcher(uidl, [
        {
          id: 'iStyleDisplay',
          name: '',
          type: etEnumAttr,
          props: {
            label: {
              type: 'i18n',
              key: i18nKeyDisplay,
            },
            options: {
              type: 'array',
              value: [
                {
                  type: 'object',
                  value: {
                    label: {
                      type: 'i18n',
                      key: i18nKeyDisplayNone,
                    },
                    value: 'none',
                  },
                },
                {
                  type: 'object',
                  value: {
                    label: {
                      type: 'i18n',
                      key: i18nKeyDisplayBlock,
                    },
                    value: 'block',
                  },
                },
                {
                  type: 'object',
                  value: {
                    label: {
                      type: 'i18n',
                      key: i18nKeyDisplayFlex,
                    },
                    value: 'flex',
                  },
                },
                {
                  type: 'object',
                  value: {
                    label: {
                      type: 'i18n',
                      key: i18nKeyDisplayInline,
                    },
                    value: 'inline',
                  },
                },
                {
                  type: 'object',
                  value: {
                    label: {
                      type: 'i18n',
                      key: i18nKeyDisplayInlineBlock,
                    },
                    value: 'inline-block',
                  },
                },
                {
                  type: 'object',
                  value: {
                    label: {
                      type: 'i18n',
                      key: i18nKeyDisplayInlineFlex,
                    },
                    value: 'inine-flex',
                  },
                },
              ],
            },
          },
          logicPath: ['props', 'style', 'display'],
        },
        {
          id: 'iStyleFlexDirection',
          name: '',
          type: etEnumAttr,
          props: {
            label: {
              type: 'i18n',
              key: i18nKeyFlexDirection,
            },
            options: {
              type: 'array',
              value: [
                {
                  type: 'object',
                  value: {
                    label: {
                      type: 'i18n',
                      key: i18nKeyRow,
                    },
                    value: 'row',
                  },
                },
                {
                  type: 'object',
                  value: {
                    label: {
                      type: 'i18n',
                      key: i18nKeyColumn,
                    },
                    value: 'column',
                  },
                },
                {
                  type: 'object',
                  value: {
                    label: {
                      type: 'i18n',
                      key: i18nKeyRowReverse,
                    },
                    value: 'row-reverse',
                  },
                },
                {
                  type: 'object',
                  value: {
                    label: {
                      type: 'i18n',
                      key: i18nKeyColumnReverse,
                    },
                    value: 'column-reverse',
                  },
                },
              ],
            },
          },
          logicPath: ['props', 'style', 'flexDirection'],
          if: {
            type: 'js',
            code: `(() => {
              const expr = ctx.root.getUnboxNormExpr(['props', 'style', 'display'])
              return !!(expr && (expr.type !== 'static' || expr.value === 'flex'))
            })()`,
          },
        },
        {
          id: 'iStyleJustifyContent',
          name: '',
          type: etEnumAttr,
          props: {
            label: {
              type: 'i18n',
              key: i18nKeyJustifyContent,
            },
            options: {
              type: 'array',
              value: [
                {
                  type: 'object',
                  value: {
                    label: {
                      type: 'i18n',
                      key: i18nKeyFlexStart,
                    },
                    value: 'start',
                  },
                },
                {
                  type: 'object',
                  value: {
                    label: {
                      type: 'i18n',
                      key: i18nKeyFlexEnd,
                    },
                    value: 'end',
                  },
                },
                {
                  type: 'object',
                  value: {
                    label: {
                      type: 'i18n',
                      key: i18nKeyCenter,
                    },
                    value: 'center',
                  },
                },
                {
                  type: 'object',
                  value: {
                    label: {
                      type: 'i18n',
                      key: i18nKeySpaceBetween,
                    },
                    value: 'space-between',
                  },
                },
                {
                  type: 'object',
                  value: {
                    label: {
                      type: 'i18n',
                      key: i18nKeySpaceAround,
                    },
                    value: 'space-around',
                  },
                },
              ],
            },
          },
          logicPath: ['props', 'style', 'justifyContent'],
          if: {
            type: 'js',
            code: `(() => {
              const expr = ctx.root.getUnboxNormExpr(['props', 'style', 'display'])
              return !!(expr && (expr.type !== 'static' || expr.value === 'flex'))
            })()`,
          },
        },
        {
          id: 'iStyleAlignItems',
          name: '',
          type: etEnumAttr,
          props: {
            label: {
              type: 'i18n',
              key: i18nKeyAlignItems,
            },
            options: {
              type: 'array',
              value: [
                {
                  type: 'object',
                  value: {
                    label: {
                      type: 'i18n',
                      key: i18nKeyFlexStart,
                    },
                    value: 'start',
                  },
                },
                {
                  type: 'object',
                  value: {
                    label: {
                      type: 'i18n',
                      key: i18nKeyFlexEnd,
                    },
                    value: 'end',
                  },
                },
                {
                  type: 'object',
                  value: {
                    label: {
                      type: 'i18n',
                      key: i18nKeyCenter,
                    },
                    value: 'center',
                  },
                },
                {
                  type: 'object',
                  value: {
                    label: {
                      type: 'i18n',
                      key: i18nKeyAlignItemsBaseline,
                    },
                    value: 'baseline',
                  },
                },
                {
                  type: 'object',
                  value: {
                    label: {
                      type: 'i18n',
                      key: i18nKeyAlignItemsStretch,
                    },
                    value: 'stretch',
                  },
                },
              ],
            },
          },
          logicPath: ['props', 'style', 'alignItems'],
          if: {
            type: 'js',
            code: `(() => {
              const expr = ctx.root.getUnboxNormExpr(['props', 'style', 'display'])
              return !!(expr && (expr.type !== 'static' || expr.value === 'flex'))
            })()`,
          },
        },
        {
          id: 'iStyleFlexWrap',
          name: '',
          type: etEnumAttr,
          props: {
            label: {
              type: 'i18n',
              key: i18nKeyFlexWrap,
            },
            options: {
              type: 'array',
              value: [
                {
                  type: 'object',
                  value: {
                    label: {
                      type: 'i18n',
                      key: i18nKeyNoWrap,
                    },
                    value: 'nowrap',
                  },
                },
                {
                  type: 'object',
                  value: {
                    label: {
                      type: 'i18n',
                      key: i18nKeyWrap,
                    },
                    value: 'wrap',
                  },
                },
                {
                  type: 'object',
                  value: {
                    label: {
                      type: 'i18n',
                      key: i18nKeyWrapReverse,
                    },
                    value: 'wrap-reverse',
                  },
                },
              ],
            },
          },
          logicPath: ['props', 'style', 'flexWrap'],
          if: {
            type: 'js',
            code: `(() => {
              const expr = ctx.root.getUnboxNormExpr(['props', 'style', 'display'])
              return !!(expr && (expr.type !== 'static' || expr.value === 'flex'))
            })()`,
          },
        },
        {
          id: 'iStyleFlex',
          name: '',
          type: etStringAttr,
          props: {
            label: {
              type: 'i18n',
              key: i18nKeyFlex,
            },
          },
          logicPath: ['props', 'style', 'flex'],
          if: {
            type: 'js',
            code: `(() => {
              const expr = ctx.root.getUnboxNormExpr(['props', 'style', 'display'])
              return !!(expr && (expr.type !== 'static' || expr.value === 'flex'))
            })()`,
          },
        },
      ]),
    },
    {
      id: 'iStyleGroupContent',
      name: '',
      type: etAttrGroup,
      props: {
        label: {
          type: 'i18n',
          key: i18nKeyContent,
        },
      },
      children: wrapElementsByBindableAttrSwitcher(uidl, [
        {
          id: 'iStyleFontSize',
          name: '',
          type: etNumberAttr,
          props: {
            label: {
              type: 'i18n',
              key: i18nKeyFontSize,
            },
            layout: 'vertical',
          },
          logicPath: ['props', 'style', 'fontSize'],
        },
        {
          id: 'iStyleFontWeight',
          name: '',
          type: etNumberAttr,
          props: {
            label: {
              type: 'i18n',
              key: i18nKeyFontWeight,
            },
            layout: 'vertical',
          },
          logicPath: ['props', 'style', 'fontWeight'],
        },
        {
          id: 'iStyleColor',
          name: '',
          type: etColorAttr,
          props: {
            label: {
              type: 'i18n',
              key: i18nKeyColor,
            },
          },
          logicPath: ['props', 'style', 'color'],
        },
        {
          id: 'iStyleBackground',
          name: '',
          type: etColorAttr,
          props: {
            label: {
              type: 'i18n',
              key: i18nKeyBackground,
            },
          },
          logicPath: ['props', 'style', 'background'],
        },
      ]),
    },
  ]
}
