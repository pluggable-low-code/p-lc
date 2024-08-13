import type { LiteralObject } from '@p-lc/shared'
import { DEFAULT_PKG_NAME } from '@p-lc/uidl-utils'
import type { VueSlotRenderFn } from '@p-lc/vue-component-library-shared'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import type { FunctionalComponent } from 'vue'
import { createVueRuntime } from '../runtime'

test('Renderer simple', () => {
  const View: FunctionalComponent = (props, { slots }) => {
    return (
      <div {...props}>
        {{
          ...slots,
        }}
      </div>
    )
  }
  const Text: FunctionalComponent = (props, { slots }) => {
    return (
      <span {...props}>
        {{
          ...slots,
        }}
      </span>
    )
  }
  const r = createVueRuntime().init({
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
  expect(mount(() => r.render()).html()).toBe(
    mount(() => (
      <div id="ff">
        <span>abc</span>
        <span color="red">123</span>
      </div>
    )).html(),
  )
})

test('slot', () => {
  const List: FunctionalComponent<
    LiteralObject,
    LiteralObject,
    {
      header?: VueSlotRenderFn
      renderItem?: VueSlotRenderFn
      default(): unknown
    }
  > = (props, { slots }) => {
    return (
      <div {...props}>
        {slots.header?.()}
        <ul>
          <li>{slots.renderItem?.({ item: null, index: 0 })}</li>
          <li>{slots.renderItem?.({ item: null, index: 1 })}</li>
        </ul>
        {slots.default()}
      </div>
    )
  }
  const r = createVueRuntime().init({
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
  expect(mount(() => r.render()).html()).toBe(
    mount(() => (
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
      </div>
    )).html(),
  )
})
