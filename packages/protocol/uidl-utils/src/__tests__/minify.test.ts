import type { EditorUidl, UidlExpression } from '@p-lc/uidl'
import { expect, test } from 'vitest'
import { defaultEditorUidlUtilsConfig } from '../config'
import { defaultUidlUtilsConfig } from '../config/uidl-utils-config'
import { minify, minifyExpression, minifyExpressionShallow } from '../minify'

test('minifyExpression', () => {
  expect(
    minifyExpression(defaultUidlUtilsConfig, {
      type: 'object',
      value: {
        a: 3,
        b: {
          type: 'static',
          value: 4,
        },
        c: {
          type: 'static',
          value: {},
        },
        d: {
          type: 'array',
          value: [
            1,
            {
              type: 'static',
              value: [1, 2],
            },
          ],
        },
        e: {
          type: 'object',
          value: {
            e1: [2],
            e2: {
              type: 'slot',
              value: [
                {
                  id: '1',
                  type: '1',
                  props: {
                    a: {
                      type: 'static',
                      value: 44,
                    },
                  },
                },
              ],
            },
          },
        },
      },
    }),
  ).toEqual({
    type: 'object',
    value: {
      a: 3,
      b: 4,
      c: {
        type: 'static',
        value: {},
      },
      d: [1, [1, 2]],
      e: {
        type: 'object',
        value: {
          e1: [2],
          e2: {
            type: 'slot',
            value: [
              {
                id: '1',
                type: '1',
                props: {
                  a: 44,
                },
              },
            ],
          },
        },
      },
    },
  })
  let expr: UidlExpression
  expect(
    minifyExpression(
      defaultUidlUtilsConfig,
      (expr = {
        type: 'object',
        value: {
          a: 3,
        },
      }),
    ),
  ).toEqual({
    type: 'static',
    value: {
      a: 3,
    },
  })
  expect(expr).toEqual({
    type: 'object',
    value: {
      a: 3,
    },
  })
  expect(
    minifyExpression(
      defaultUidlUtilsConfig,
      (expr = {
        type: 'object',
        value: {
          a: {
            type: 'static',
            value: 3,
          },
          b: {
            type: 'js',
            code: 'cc',
          },
        },
      }),
    ),
  ).toEqual({
    type: 'object',
    value: {
      a: 3,
      b: {
        type: 'js',
        code: 'cc',
      },
    },
  })
  expect(expr).toEqual({
    type: 'object',
    value: {
      a: 3,
      b: {
        type: 'js',
        code: 'cc',
      },
    },
  })
})

test('minifyExpressionShallow', () => {
  expect(
    minifyExpressionShallow(defaultUidlUtilsConfig, {
      type: 'object',
      value: {
        a: 3,
        b: {
          type: 'static',
          value: 4,
        },
        c: {
          type: 'static',
          value: {},
        },
        d: {
          type: 'array',
          value: [
            1,
            {
              type: 'static',
              value: [1, 2],
            },
          ],
        },
        e: {
          type: 'object',
          value: {
            e1: [2],
            e2: {
              type: 'slot',
              value: [
                {
                  id: '1',
                  type: '1',
                  props: {
                    a: {
                      type: 'static',
                      value: 44,
                    },
                  },
                },
              ],
            },
          },
        },
      },
    }),
  ).toEqual({
    type: 'object',
    value: {
      a: 3,
      b: 4,
      c: {
        type: 'static',
        value: {},
      },
      d: [1, [1, 2]],
      e: {
        type: 'object',
        value: {
          e1: [2],
          e2: {
            type: 'slot',
            value: [
              {
                id: '1',
                type: '1',
                props: {
                  a: {
                    type: 'static',
                    value: 44,
                  },
                },
              },
            ],
          },
        },
      },
    },
  })
})

test('minify editor uidl', () => {
  const uidl: EditorUidl = {
    editorName: 'ff',
    view: {
      id: '1',
      type: '1',
      name: '1',
    },
  }
  minify(defaultEditorUidlUtilsConfig, uidl)
  expect(uidl).toEqual({
    view: {
      id: '1',
      type: '1',
    },
  })
})
