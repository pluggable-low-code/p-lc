import { defineProperty } from '@p-lc/shared'
import { DEFAULT_PKG_NAME } from '@p-lc/uidl-utils'
import { expect, test } from 'vitest'
import { createRuntime } from '../runtime'
import type { RuntimePlugin } from '../types'

test('view', () => {
  const r = createRuntime()
  expect(r.view).toBe(undefined)
  r.init({
    uidl: {
      view: {
        id: 'v1',
        type: 'View',
      },
    },
  })
  expect(r.view).toBeTruthy()
  expect(r.view.isDisposed).toBe(false)
  r.dispose()
  expect(r.view.isDisposed).toBe(true)
})

test('children', () => {
  const r = createRuntime().init({
    uidl: {
      view: {
        id: 'v1',
        type: 'View',
        children: [
          {
            id: 't1',
            type: 'Text',
            props: {
              children: 3,
            },
          },
        ],
      },
    },
  })
  expect(r.view.children.length).toBe(1)
  expect(r.view.children[0].children.length).toBe(1)
  expect(r.view.children[0].children[0].children.length).toBe(1)
  expect(r.view.children[0].children[0].children[0].children.length).toBe(0)
  expect(r.view.children[0].children[0].children[0].props.children).toBe(3)
})

test('props all expressions', () => {
  const r = createRuntime().init({
    uidl: {
      view: {
        id: 'v1',
        type: 'View',
        props: {
          a: 3,
          b: {
            type: 'static',
            value: 4,
          },
          c: {
            type: 'static',
            value: { dd: 'sdf' },
          },
          d: {
            type: 'object',
            value: {
              x: 1,
              y: {
                type: 'array',
                value: [
                  2,
                  {
                    type: 'static',
                    value: {},
                  },
                  3,
                ],
              },
            },
          },
        },
      },
    },
  })
  expect(r.view.children[0].props).toEqual({
    a: 3,
    b: 4,
    c: { dd: 'sdf' },
    d: { x: 1, y: [2, {}, 3] },
  })
})

test('custom expressions', () => {
  const p1: RuntimePlugin<{
    runtime: {
      a: number
    }
  }> = {
    id: '1',
    initRuntime(ctx) {
      ctx.addExpressionEvaluator({
        type: 'jj',
        eval(expr) {
          return expr.a + 1
        },
      })
      ctx.addExpressionEvaluator({
        type: 'jj2',
        eval(expr) {
          throw 'jj222'
          return expr.a + 1
        },
      })
      defineProperty(ctx, 'a', {
        get() {
          return ctx.evalExpression({ type: 'jj2' })
        },
      })
    },
  }
  const r = createRuntime()
    .use(p1)
    .init({
      uidl: {
        view: {
          id: 'v1',
          type: 'View',
          props: {
            a: {
              type: 'jj',
              a: 4,
            },
          },
          children: [
            {
              id: 't1',
              type: 'Text',
              props: {
                a: {
                  type: 'dd',
                },
              },
            },
            {
              id: 't2',
              type: 'Text',
              props: {
                a: {
                  type: 'jj2',
                },
              },
            },
          ],
        },
      },
    })
  expect(r.view.children[0].props.a).toBe(5)
  expect(r.view.children[0].children[0].children[0].props.a).toBe(undefined)
  expect(r.view.children[0].children[1].children[0].props.a).toBe(undefined)
  expect(() => r.a).toThrow('jj222')
})

test('component', () => {
  const ui = {
    View: {},
    Text: {},
  }
  const r = createRuntime().init({
    uidl: {
      view: {
        id: 'v1',
        type: 'View',
        children: [
          {
            id: 't1',
            type: 'Text',
          },
        ],
      },
    },
    dependencies: {
      [DEFAULT_PKG_NAME]: ui,
    },
  })
  expect(r.view.children[0].component).toBe(ui.View)
  expect(r.view.children[0].children[0].children[0].component).toBe(ui.Text)
})
