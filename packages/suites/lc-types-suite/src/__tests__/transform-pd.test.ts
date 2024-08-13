import { lcTypesUidlUtilsConfig } from '@p-lc/lc-types-uidl-utils'
import type { Pd } from '@p-lc/pd'
import { expect, test } from 'vitest'
import { transformPdBeforeSave } from '../editor/utils'

test('transformPdBeforeSave', () => {
  const pd: Pd = {
    pkgName: '@p-lc/lc-types-ui',
    pkgVersion: '0.0.1',
    name: 'asdf',
    components: [
      {
        type: 'AttrList',
        name: {
          key: 'attrListName',
        },
        groupName: {
          key: 'groupContainer',
        },
        components: [
          {
            elementType: 'AttrRoot_0',
            pkgName: '@p-lc/lc-types-ui',
            pkgVersion: '0.0.1',
            componentType: 'AttrRoot',
          },
          {
            elementType: 'AttrList_2',
            pkgName: '@p-lc/lc-types-ui',
            pkgVersion: '0.0.1',
            componentType: 'AttrList',
          },
          {
            elementType: 'StringAttr_3',
            pkgName: '@p-lc/lc-types-ui',
            pkgVersion: '0.0.1',
            componentType: 'StringAttr',
          },
          {
            elementType: 'JsonAttr_4',
            pkgName: '@p-lc/lc-types-ui',
            pkgVersion: '0.0.1',
            componentType: 'JsonAttr',
          },
          {
            elementType: 'SlotAttr_5',
            pkgName: '@p-lc/lc-types-ui',
            pkgVersion: '0.0.1',
            componentType: 'SlotAttr',
          },
          {
            elementType: 'AttrList_6',
            pkgName: '@p-lc/lc-types-ui',
            pkgVersion: '0.0.1',
            componentType: 'AttrList',
          },
        ],
        view: {
          id: 'root',
          name: 'Low-code types',
          type: 'AttrRoot_0',
          children: [
            {
              id: 'OwI62CE0xxrxFJfaFpYCJ',
              name: 'String',
              type: 'StringAttr_3',
              props: {
                label: 'L',
              },
              logicPath: ['props', 'label'],
            },
            {
              id: 'U1ZHq9lW_JmbKU3D0usnV',
              name: 'List',
              type: 'AttrList_2',
              props: {
                label: 'asdff',
                render: {
                  type: 'slot',
                  value: [],
                  dynamic: true,
                },
              },
              logicPath: ['props', 'testaa'],
            },
            {
              id: 'Z1YIecqYdZihAJf8juSSU',
              name: 'JSON',
              type: 'JsonAttr_4',
              props: {
                label: 'lpath',
              },
              logicPath: ['logicPath'],
            },
            {
              id: '1x_QdcnGZcZjJv3c3QmSZ111',
              name: 'Slot',
              type: 'SlotAttr_5',
              props: {},
              logicPath: ['props', 'render'],
            },
            {
              id: '1x_QdcnGZcZjJv3c3QmSZ22222',
              name: 'Slot',
              type: 'SlotAttr_5',
              props: {
                label: 'nnn2',
                dynamic: true,
              },
              logicPath: ['props', 'render2'],
            },
            {
              id: 'asdfsxx',
              name: 'List',
              type: 'AttrList_6',
              props: {
                render: {
                  type: 'slot',
                  value: [
                    {
                      id: '1x_QdcnGZcZjJv3c3QmSZ333',
                      name: 'Slot',
                      type: 'SlotAttr_5',
                      props: {
                        label: {
                          type: 'i18n',
                          key: 'nnn133',
                        },
                      },
                      logicPath: ['render3'],
                    },
                    {
                      id: '1x_QdcnGZcZjJv3c3QmSZ444',
                      name: 'Slot',
                      type: 'SlotAttr_5',
                      props: {
                        label: 'nnn444',
                        dynamic: true,
                      },
                      logicPath: ['render4'],
                    },
                  ],
                },
              },
              logicPath: ['props', 'li'],
            },
          ],
        },
        code: {
          exportPath: ['AttrList'],
        },
      },
    ],
  }
  expect(
    transformPdBeforeSave(pd, {
      uidlUtilsConfig: lcTypesUidlUtilsConfig,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any),
  ).toEqual({
    pkgName: '@p-lc/lc-types-ui',
    pkgVersion: '0.0.1',
    name: 'asdf',
    components: [
      {
        type: 'AttrList',
        name: {
          key: 'attrListName',
        },
        groupName: {
          key: 'groupContainer',
        },
        components: [
          {
            elementType: 'AttrRoot_0',
            pkgName: '@p-lc/lc-types-ui',
            pkgVersion: '0.0.1',
            componentType: 'AttrRoot',
          },
          {
            elementType: 'AttrList_2',
            pkgName: '@p-lc/lc-types-ui',
            pkgVersion: '0.0.1',
            componentType: 'AttrList',
          },
          {
            elementType: 'StringAttr_3',
            pkgName: '@p-lc/lc-types-ui',
            pkgVersion: '0.0.1',
            componentType: 'StringAttr',
          },
          {
            elementType: 'JsonAttr_4',
            pkgName: '@p-lc/lc-types-ui',
            pkgVersion: '0.0.1',
            componentType: 'JsonAttr',
          },
          {
            elementType: 'SlotAttr_5',
            pkgName: '@p-lc/lc-types-ui',
            pkgVersion: '0.0.1',
            componentType: 'SlotAttr',
          },
          {
            elementType: 'AttrList_6',
            pkgName: '@p-lc/lc-types-ui',
            pkgVersion: '0.0.1',
            componentType: 'AttrList',
          },
        ],
        view: {
          id: 'root',
          name: 'Low-code types',
          type: 'AttrRoot_0',
          children: [
            {
              id: 'OwI62CE0xxrxFJfaFpYCJ',
              name: 'String',
              type: 'StringAttr_3',
              props: {
                label: 'L',
              },
              logicPath: ['props', 'label'],
            },
            {
              id: 'U1ZHq9lW_JmbKU3D0usnV',
              name: 'List',
              type: 'AttrList_2',
              props: {
                label: 'asdff',
                render: {
                  type: 'slot',
                  value: [],
                  dynamic: true,
                },
              },
              logicPath: ['props', 'testaa'],
            },
            {
              id: 'Z1YIecqYdZihAJf8juSSU',
              name: 'JSON',
              type: 'JsonAttr_4',
              props: {
                label: 'lpath',
              },
              logicPath: ['logicPath'],
            },
            {
              id: '1x_QdcnGZcZjJv3c3QmSZ111',
              name: 'Slot',
              type: 'SlotAttr_5',
              props: {},
              logicPath: ['props', 'render'],
            },
            {
              id: '1x_QdcnGZcZjJv3c3QmSZ22222',
              name: 'Slot',
              type: 'SlotAttr_5',
              props: {
                label: 'nnn2',
                dynamic: true,
              },
              logicPath: ['props', 'render2'],
            },
            {
              id: 'asdfsxx',
              name: 'List',
              type: 'AttrList_6',
              props: {
                render: {
                  type: 'slot',
                  value: [
                    {
                      id: '1x_QdcnGZcZjJv3c3QmSZ333',
                      name: 'Slot',
                      type: 'SlotAttr_5',
                      props: {
                        label: {
                          type: 'i18n',
                          key: 'nnn133',
                        },
                      },
                      logicPath: ['render3'],
                    },
                    {
                      id: '1x_QdcnGZcZjJv3c3QmSZ444',
                      name: 'Slot',
                      type: 'SlotAttr_5',
                      props: {
                        label: 'nnn444',
                        dynamic: true,
                      },
                      logicPath: ['render4'],
                    },
                  ],
                },
              },
              logicPath: ['props', 'li'],
            },
          ],
        },
        slots: [
          {
            logicPath: ['props', 'render'],
          },
          {
            name: 'nnn2',
            logicPath: ['props', 'render2'],
            dynamicRender: true,
          },
          {
            type: 'dynamic-path',
            name: {
              key: 'nnn133',
            },
            dynamicLogicPath: ['props', 'li', '*', 'render3'],
          },
          {
            type: 'dynamic-path',
            name: 'nnn444',
            dynamicLogicPath: ['props', 'li', '*', 'render4'],
            dynamicRender: true,
          },
        ],
        code: {
          exportPath: ['AttrList'],
        },
      },
    ],
  })
})
