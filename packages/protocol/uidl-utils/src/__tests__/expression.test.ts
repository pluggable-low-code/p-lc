import { expect, test } from 'vitest'
import {
  isNormalizedExpression,
  normalizeExpression,
  unnormalizeExpression,
} from '../expression'

test('isNormalizedExpression', () => {
  expect(isNormalizedExpression(null)).toEqual(false)
  expect(isNormalizedExpression(3)).toEqual(false)
  expect(isNormalizedExpression('null')).toEqual(false)
  expect(isNormalizedExpression(false)).toEqual(false)
  expect(isNormalizedExpression([null])).toEqual(false)
  expect(
    isNormalizedExpression({
      type: 'dd',
      v: 3,
    }),
  ).toEqual(true)
})

test('normalizeExpression', () => {
  expect(normalizeExpression(null)).toEqual({
    type: 'static',
    value: null,
  })
  expect(normalizeExpression(3)).toEqual({
    type: 'static',
    value: 3,
  })
  expect(normalizeExpression('null')).toEqual({
    type: 'static',
    value: 'null',
  })
  expect(normalizeExpression(false)).toEqual({
    type: 'static',
    value: false,
  })
  expect(normalizeExpression([null])).toEqual({
    type: 'static',
    value: [null],
  })
  expect(
    normalizeExpression({
      type: 'dd',
      v: 3,
    }),
  ).toEqual({
    type: 'dd',
    v: 3,
  })
})

test('unnormalizeExpression', () => {
  expect(
    unnormalizeExpression({
      type: 'static',
      value: 3,
    }),
  ).toEqual(3)
  expect(
    unnormalizeExpression({
      type: 'static',
      value: 'null',
    }),
  ).toEqual('null')
  expect(
    unnormalizeExpression({
      type: 'static',
      value: false,
    }),
  ).toEqual(false)
  expect(
    unnormalizeExpression({
      type: 'static',
      value: [null],
    }),
  ).toEqual([null])
  expect(
    unnormalizeExpression({
      type: 'static',
      value: { a: 3 },
    }),
  ).toEqual({
    type: 'static',
    value: { a: 3 },
  })
  expect(
    unnormalizeExpression({
      type: 'static',
      value: { type: 'static', a: 3 },
    }),
  ).toEqual({
    type: 'static',
    value: { type: 'static', a: 3 },
  })
  expect(
    unnormalizeExpression({
      type: 'dd',
      v: 3,
    }),
  ).toEqual({
    type: 'dd',
    v: 3,
  })
})
