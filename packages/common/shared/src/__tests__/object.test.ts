import { expect, test } from 'vitest'
import { isObjectButNotArray } from '../object'

test('isObjectButNotArray', () => {
  expect(isObjectButNotArray(null)).toBe(false)
  expect(isObjectButNotArray([])).toBe(false)
  expect(isObjectButNotArray({})).toBe(true)
  expect(isObjectButNotArray(1)).toBe(false)
  expect(isObjectButNotArray(0)).toBe(false)
  expect(isObjectButNotArray('asdf')).toBe(false)
  expect(isObjectButNotArray(new (class {})())).toBe(true)
})
