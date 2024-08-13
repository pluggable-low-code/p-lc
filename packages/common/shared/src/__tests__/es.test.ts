import { expect, test, vi } from 'vitest'
import { defineLazyInitProperty } from '../es'

test('defineLazyInitProperty', () => {
  const initFn = vi.fn(() => 3)
  const o = {} as { a: number }
  const h = defineLazyInitProperty(o, 'a', initFn)
  expect(initFn.mock.calls.length).toBe(0)
  expect(h.isInited).toBe(false)
  expect(o.a).toBe(3)
  expect(initFn.mock.calls.length).toBe(1)
  expect(h.isInited).toBe(true)
  expect(o.a).toBe(3)
  expect(initFn.mock.calls.length).toBe(1)
  expect(h.isInited).toBe(true)
})
