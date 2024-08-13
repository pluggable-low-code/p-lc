import { expect, test } from 'vitest'
import { tuple } from '../tuple'

test('tuple', () => {
  expect([1, 2]).not.toBe([1, 2])
  expect(tuple(1, 2)).toBe(tuple(1, 2))
  expect(tuple([1, 2] as const)).not.toBe(tuple(1, 2))
  const x = [1, 2]
  expect(tuple(x)).toBe(tuple(x))
  expect(tuple(x, 1, x)).toBe(tuple(x, 1, x))
})
