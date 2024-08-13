import type { ReactSlotRenderFn } from '@p-lc/react-component-library-shared'
import { DEFAULT_PKG_NAME } from '@p-lc/uidl-utils'
import { observer } from 'mobx-react-lite'
import type { FC, ReactNode } from 'react'
import { memo } from 'react'
import TestRenderer from 'react-test-renderer'
import { expect, test, vi } from 'vitest'
import { type runtimePluginReactRendererHocs } from '../plugins'
import { createReactRuntime } from '../runtime'

test('Renderer simple', () => {
  const View: FC = (props) => <div {...props} />
  const Text: FC = (props) => <span {...props} />
  const r = createReactRuntime().init({
    uidl: {
      view: {
        id: 'v1',
        type: 'View',
        props: {
          id: 'ff',
        },
        children: [
          {
            id: 't1',
            type: 'Text',
            props: {
              children: 'abc',
            },
          },
          {
            id: 't2',
            type: 'Text',
            props: {
              children: '123',
              color: 'red',
            },
          },
        ],
      },
    },
    dependencies: {
      [DEFAULT_PKG_NAME]: {
        View,
        Text,
      },
    },
  })
  expect(TestRenderer.create(r.render()).toJSON()).toEqual(
    TestRenderer.create(
      <div id="ff">
        <span>abc</span>
        <span color="red">123</span>
      </div>,
    ).toJSON(),
  )
})

test('Renderer render', () => {
  const View: FC = memo((props) => {
    renderFn()
    return <div {...props} />
  })
  const hocPlugin: typeof runtimePluginReactRendererHocs = {
    id: 's',
    initRuntime(ctx) {
      ctx.rendererHocs.element['observer'] = {
        id: 'observer',
        index: 150,
        hoc: observer,
      }
    },
  }
  const r1 = createReactRuntime()
    .use(hocPlugin)
    .init({
      uidl: {
        view: {
          id: 'v1',
          type: 'View',
          props: {
            id: 'ff',
          },
        },
      },
      dependencies: {
        [DEFAULT_PKG_NAME]: {
          View,
        },
      },
    })
  const r2 = createReactRuntime()
    .use(hocPlugin)
    .init({
      uidl: {
        view: {
          id: 'v1',
          type: 'View',
          props: {
            id: 'ff',
          },
        },
      },
      dependencies: {
        [DEFAULT_PKG_NAME]: {
          View,
        },
      },
    })
  let renderFn = vi.fn(() => {})

  renderFn = vi.fn(() => {})
  TestRenderer.create(r1.render()).update(r1.render())
  expect(renderFn.mock.calls.length).toBe(1)
  renderFn = vi.fn(() => {})
  TestRenderer.create(r1.render()).update(r2.render())
  expect(renderFn.mock.calls.length).toBe(1)
})

test('slot', () => {
  const List: FC<{
    header?: ReactNode
    renderItem?: ReactSlotRenderFn
    children?: ReactNode
  }> = ({ header, renderItem, children, ...restProps }) => {
    return (
      <div {...restProps}>
        {header}
        <ul>
          <li>{renderItem?.({ item: null, index: 0 })}</li>
          <li>{renderItem?.({ item: null, index: 1 })}</li>
        </ul>
        {children}
      </div>
    )
  }
  const r = createReactRuntime().init({
    uidl: {
      view: {
        id: 'l1',
        type: 'List',
        props: {
          header: {
            type: 'slot',
            value: [
              {
                id: 't3',
                type: 'Text',
                props: {
                  children: '3333',
                },
              },
            ],
          },
          renderItem: {
            type: 'slot',
            value: [
              {
                id: 't4',
                type: 'Text',
                props: {
                  children: '4441',
                },
              },
              {
                id: 't5',
                type: 'Text',
                props: {
                  children: '551123',
                },
              },
            ],
            dynamic: true,
          },
        },
        children: [
          {
            id: 't1',
            type: 'Text',
            props: {
              children: 'abc',
            },
          },
          {
            id: 't2',
            type: 'Text',
            props: {
              children: '123',
              color: 'red',
            },
          },
        ],
      },
    },
    dependencies: {
      [DEFAULT_PKG_NAME]: {
        List,
        Text: 'span',
      },
    },
  })
  expect(TestRenderer.create(r.render()).toJSON()).toEqual(
    TestRenderer.create(
      <div>
        <span>3333</span>
        <ul>
          <li>
            <span>4441</span>
            <span>551123</span>
          </li>
          <li>
            <span>4441</span>
            <span>551123</span>
          </li>
        </ul>
        <span>abc</span>
        <span color="red">123</span>
      </div>,
    ).toJSON(),
  )
})
