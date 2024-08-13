import type { UidlElement, UidlExpression } from '@p-lc/uidl'
import { expect, test } from 'vitest'
import { defaultUidlUtilsConfig } from '../config/uidl-utils-config'
import {
  logicGetEntity,
  logicGetEntityInElement,
  logicGetEntityInExpression,
  logicSetElementInElement,
  logicSetEntity,
  logicSetEntityInElement,
  logicSetEntityInExpression,
  logicSetExpressionInElement,
} from '../logic'

test('logicGetEntity', () => {
  const uidl = {
    view: {
      id: '1',
      type: '1',
      children: [
        {
          id: '2',
          type: '2',
          props: {
            children: 'adf',
          },
        },
        {
          id: '3',
          type: '3',
        },
      ],
    },
  }
  expect(
    logicGetEntity(defaultUidlUtilsConfig, uidl, [
      'view',
      'props',
      'children',
      1,
    ]),
  ).toEqual({
    type: 'element',
    element: {
      id: '3',
      type: '3',
    },
    jsonPath: ['view', 'children', 1],
  })
  expect(
    logicGetEntity(defaultUidlUtilsConfig, uidl, [
      'view',
      'props',
      'children',
      0,
      'props',
      'children',
    ]),
  ).toEqual({
    type: 'expression',
    expression: 'adf',
    jsonPath: ['view', 'children', 0, 'props', 'children'],
  })
})

test('logicGetEntityInElement', () => {
  const uidlElement = {
    id: '1',
    type: '1',
    props: {
      a: {
        type: 'object',
        value: {
          b: {
            type: 'static',
            value: {
              c: [1],
            },
          },
        },
      },
    },
  }
  expect(
    logicGetEntityInElement(defaultUidlUtilsConfig, uidlElement, [
      'props',
      'a',
      'b',
      'c',
    ]),
  ).toEqual({
    type: 'expression',
    expression: [1],
    jsonPath: ['props', 'a', 'value', 'b', 'value', 'c'],
    isPart: true,
  })
  expect(
    logicGetEntityInElement(defaultUidlUtilsConfig, uidlElement, [
      'props',
      'a',
      'b',
    ]),
  ).toEqual({
    type: 'expression',
    expression: {
      type: 'static',
      value: {
        c: [1],
      },
    },
    jsonPath: ['props', 'a', 'value', 'b'],
  })
})

test('logicGetEntityInExpression', () => {
  expect(logicGetEntityInExpression(defaultUidlUtilsConfig, null, [])).toEqual({
    type: 'expression',
    expression: null,
    jsonPath: [],
  })
  expect(
    logicGetEntityInExpression(
      defaultUidlUtilsConfig,
      {
        type: 'static',
        value: {
          a: 3,
        },
      },
      ['a'],
    ),
  ).toEqual({
    type: 'expression',
    expression: 3,
    jsonPath: ['value', 'a'],
    isPart: true,
  })
  expect(
    logicGetEntityInExpression(
      defaultUidlUtilsConfig,
      {
        type: 'object',
        value: {
          a: {
            type: 'array',
            value: [1, 2, [4, 5]],
          },
        },
      },
      ['a', 2, 1],
    ),
  ).toEqual({
    type: 'expression',
    expression: 5,
    jsonPath: ['value', 'a', 'value', 2, 1],
    isPart: true,
  })
})

test('logicSetEntity', () => {
  const uidl = {
    view: {
      id: '1',
      type: '1',
      children: [
        {
          id: '2',
          type: '2',
          props: {
            children: 'adf',
          },
        },
        {
          id: '3',
          type: '3',
        },
      ],
    },
  }
  expect(
    logicSetEntity(
      defaultUidlUtilsConfig,
      uidl,
      ['view', 'props', 'children', 1],
      {
        type: 'element',
        element: {
          id: 'dd',
          type: 'dd',
        },
      },
    ),
  ).toEqual({
    view: {
      id: '1',
      type: '1',
      children: [
        {
          id: '2',
          type: '2',
          props: {
            children: 'adf',
          },
        },
        {
          id: 'dd',
          type: 'dd',
        },
      ],
    },
  })
})

test('logicSetEntityInElement', () => {
  expect(
    logicSetEntityInElement(
      defaultUidlUtilsConfig,
      {
        id: '1',
        type: '1',
        props: {
          a: 3,
          b: [1, 2],
        },
      },
      ['props', 'b', 1],
      {
        type: 'expression',
        expression: [1, 2],
      },
    ),
  ).toEqual({
    id: '1',
    type: '1',
    props: {
      a: 3,
      b: [1, [1, 2]],
    },
  })
  expect(
    logicSetEntityInElement(
      defaultUidlUtilsConfig,
      {
        id: '1',
        type: '1',
        props: {
          a: 3,
          b: [1, 2, 3],
        },
      },
      ['props', 'b', 1],
      undefined,
    ),
  ).toEqual({
    id: '1',
    type: '1',
    props: {
      a: 3,
      b: [1, 3],
    },
  })
})

test('logicSetEntityInExpression', () => {
  let expr: UidlExpression = null
  expect(
    logicSetEntityInExpression(defaultUidlUtilsConfig, expr, [], {
      type: 'expression',
      expression: 3,
    }),
  ).toBe(3)
  expect(
    logicSetEntityInExpression(
      defaultUidlUtilsConfig,
      (expr = [1, 2, 3]),
      [1],
      {
        type: 'expression',
        expression: 5,
      },
    ),
  ).toEqual([1, 5, 3])
  expect(expr).toEqual([1, 5, 3])
  expect(
    logicSetEntityInExpression(
      defaultUidlUtilsConfig,
      (expr = {
        type: 'static',
        value: {
          a: 3,
          b: 4,
        },
      }),
      ['a', 1, 2, 'j'],
      {
        type: 'expression',
        expression: {
          type: 'js',
          code: 'cc',
        },
      },
    ),
  ).toEqual({
    type: 'object',
    value: {
      a: {
        type: 'array',
        value: [
          undefined,
          {
            type: 'array',
            value: [
              undefined,
              undefined,
              {
                type: 'object',
                value: {
                  j: {
                    type: 'js',
                    code: 'cc',
                  },
                },
              },
            ],
          },
        ],
      },
      b: 4,
    },
  })
  expect(expr).toEqual({
    type: 'static',
    value: {
      a: 3,
      b: 4,
    },
  })
})

test('logicSetElementInElement', () => {
  const uidlElement: UidlElement = {
    id: '1',
    type: '1',
  }
  logicSetElementInElement(
    defaultUidlUtilsConfig,
    uidlElement,
    ['props', 'children', 0],
    {
      id: '2',
      type: '2',
    },
  )
  expect(uidlElement).toEqual({
    id: '1',
    type: '1',
    children: [
      {
        id: '2',
        type: '2',
      },
    ],
  })
  logicSetElementInElement(
    defaultUidlUtilsConfig,
    uidlElement,
    ['props', 'children', 1],
    {
      id: '3',
      type: '3',
    },
  )
  expect(uidlElement).toEqual({
    id: '1',
    type: '1',
    children: [
      {
        id: '2',
        type: '2',
      },
      {
        id: '3',
        type: '3',
      },
    ],
  })
  logicSetElementInElement(defaultUidlUtilsConfig, uidlElement, [
    'props',
    'children',
    0,
  ])
  expect(uidlElement).toEqual({
    id: '1',
    type: '1',
    children: [
      {
        id: '3',
        type: '3',
      },
    ],
  })
})

test('logicSetExpressionInElement', () => {
  const uidlElement: UidlElement = {
    id: '1',
    type: '1',
  }
  logicSetExpressionInElement(
    defaultUidlUtilsConfig,
    uidlElement,
    ['props', 'a'],
    3,
  )
  expect(uidlElement).toEqual({
    id: '1',
    type: '1',
    props: {
      a: 3,
    },
  })
  logicSetExpressionInElement(
    defaultUidlUtilsConfig,
    uidlElement,
    ['props', 'b'],
    {
      type: 'slot',
      value: [],
    },
  )
  expect(uidlElement).toEqual({
    id: '1',
    type: '1',
    props: {
      a: 3,
      b: {
        type: 'slot',
        value: [],
      },
    },
  })
  logicSetElementInElement(
    defaultUidlUtilsConfig,
    uidlElement,
    ['props', 'b', 0],
    {
      id: '2',
      type: '2',
    },
  )
  expect(uidlElement).toEqual({
    id: '1',
    type: '1',
    props: {
      a: 3,
      b: {
        type: 'slot',
        value: [
          {
            id: '2',
            type: '2',
          },
        ],
      },
    },
  })
})

test('logicSetExpressionInElement array splice', () => {
  expect(
    logicSetExpressionInElement(
      defaultUidlUtilsConfig,
      {
        id: '1',
        type: '1',
        props: {
          a: [1, 2, 3, 4],
        },
      },
      ['props', 'a', 2],
      undefined,
    ),
  ).toEqual({
    id: '1',
    type: '1',
    props: {
      a: [1, 2, 4],
    },
  })
  expect(
    logicSetExpressionInElement(
      defaultUidlUtilsConfig,
      {
        id: '1',
        type: '1',
        props: {
          arr: {
            type: 'array',
            value: [
              {
                type: 'js',
              },
              1,
              3,
              4,
            ],
          },
        },
      },
      ['props', 'arr', 1],
      undefined,
    ),
  ).toEqual({
    id: '1',
    type: '1',
    props: {
      arr: {
        type: 'array',
        value: [
          {
            type: 'js',
          },
          3,
          4,
        ],
      },
    },
  })
  expect(
    logicSetExpressionInElement(
      defaultUidlUtilsConfig,
      {
        id: '1',
        type: '1',
        props: {
          s: {
            type: 'slot',
            value: [
              {
                id: '2',
                type: '2',
              },
              {
                id: '3',
                type: '3',
              },
              {
                id: '4',
                type: '4',
              },
            ],
          },
        },
      },
      ['props', 's', 0],
      undefined,
    ),
  ).toEqual({
    id: '1',
    type: '1',
    props: {
      s: {
        type: 'slot',
        value: [
          {
            id: '3',
            type: '3',
          },
          {
            id: '4',
            type: '4',
          },
        ],
      },
    },
  })
})

test('logicSetExpressionInElement auto minify', () => {
  expect(
    logicSetExpressionInElement(
      defaultUidlUtilsConfig,
      {
        id: '1',
        type: '1',
        props: {
          a: {
            type: 'object',
            value: {
              x: 1,
              y: 2,
            },
          },
        },
      },
      ['props', 'a'],
      {
        type: 'static',
        value: 3,
      },
    ),
  ).toEqual({
    id: '1',
    type: '1',
    props: {
      a: 3,
    },
  })
  expect(
    logicSetExpressionInElement(
      defaultUidlUtilsConfig,
      {
        id: '1',
        type: '1',
        props: {
          a: {
            type: 'object',
            value: {
              x: 1,
              y: 2,
            },
          },
        },
      },
      ['props', 'a', 'x'],
      {
        type: 'static',
        value: 3,
      },
    ),
  ).toEqual({
    id: '1',
    type: '1',
    props: {
      a: {
        type: 'static',
        value: {
          x: 3,
          y: 2,
        },
      },
    },
  })
  expect(
    logicSetExpressionInElement(
      defaultUidlUtilsConfig,
      {
        id: '1',
        type: '1',
        props: {
          a: {
            type: 'array',
            value: [3, 4, 4],
          },
        },
      },
      ['props', 'a', 1],
      5,
    ),
  ).toEqual({
    id: '1',
    type: '1',
    props: {
      a: [3, 5, 4],
    },
  })
  expect(
    logicSetExpressionInElement(
      defaultUidlUtilsConfig,
      {
        id: '1',
        type: '1',
        props: {
          a: {
            type: 'array',
            value: [3, 4, { type: 'js' }],
          },
        },
      },
      ['props', 'a', 1],
      5,
    ),
  ).toEqual({
    id: '1',
    type: '1',
    props: {
      a: {
        type: 'array',
        value: [3, 5, { type: 'js' }],
      },
    },
  })
  expect(
    logicSetExpressionInElement(
      defaultUidlUtilsConfig,
      {
        id: '1',
        type: '1',
        props: {
          a: {
            type: 'array',
            value: [
              3,
              4,
              {
                type: 'object',
                value: {
                  x: {
                    type: 'object',
                    value: {
                      y: { type: 'js' },
                    },
                  },
                },
              },
            ],
          },
        },
      },
      ['props', 'a', 2, 'x', 'y'],
      [1, 2],
    ),
  ).toEqual({
    id: '1',
    type: '1',
    props: {
      a: [
        3,
        4,
        {
          x: {
            y: [1, 2],
          },
        },
      ],
    },
  })
})

test('logicSetExpressionInElement object + array', () => {
  expect(
    logicSetExpressionInElement(
      defaultUidlUtilsConfig,
      {
        id: 'T1NMdQ86eWbFD3KILvmUJ',
        name: 'Switcher',
        type: 'AttrSwitcher_4',
        children: [],
        props: {
          items: {
            type: 'array',
            value: [
              {
                type: 'object',
                value: {
                  render: {
                    type: 'slot',
                    value: [
                      {
                        id: '7DJ7NiohJskmSiqLIvoEP',
                        name: 'String 2',
                        type: 'StringAttr_1',
                      },
                    ],
                    dynamic: true,
                  },
                  key: 'string',
                  label: 'sssstr',
                },
              },
              {
                type: 'object',
                value: {},
              },
            ],
          },
        },
      },
      ['props', 'items', 1, 'key'],
      {
        type: 'static',
        value: '1',
      },
    ),
  ).toEqual({
    id: 'T1NMdQ86eWbFD3KILvmUJ',
    name: 'Switcher',
    type: 'AttrSwitcher_4',
    children: [],
    props: {
      items: {
        type: 'array',
        value: [
          {
            type: 'object',
            value: {
              render: {
                type: 'slot',
                value: [
                  {
                    id: '7DJ7NiohJskmSiqLIvoEP',
                    name: 'String 2',
                    type: 'StringAttr_1',
                  },
                ],
                dynamic: true,
              },
              key: 'string',
              label: 'sssstr',
            },
          },
          {
            type: 'static',
            value: {
              key: '1',
            },
          },
        ],
      },
    },
  })
})
