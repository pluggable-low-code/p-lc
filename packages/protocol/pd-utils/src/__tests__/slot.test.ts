import { expect, test } from 'vitest'
import { isSlotMatched } from '../slot'

test('isSlotMatched', () => {
  expect(
    isSlotMatched(
      {
        logicPath: ['props', 'children'],
      },
      [],
    ),
  ).toEqual(false)
  expect(
    isSlotMatched(
      {
        logicPath: ['props', 'children'],
      },
      ['props', 'children'],
    ),
  ).toEqual(true)
  expect(
    isSlotMatched(
      {
        logicPath: ['props', 'children'],
      },
      ['props', 'children', 0],
    ),
  ).toEqual(false)
  expect(
    isSlotMatched(
      {
        logicPath: ['props', 'children'],
      },
      ['props', 'children', 0],
      false,
    ),
  ).toEqual(true)
  expect(
    isSlotMatched(
      {
        type: 'dynamic-path',
        dynamicLogicPath: ['props', 'a', '*', 'b'],
      },
      [],
    ),
  ).toEqual(false)
  expect(
    isSlotMatched(
      {
        type: 'dynamic-path',
        dynamicLogicPath: ['props', 'a', '*', 'b'],
      },
      ['props', 'a', 1],
    ),
  ).toEqual(false)
  expect(
    isSlotMatched(
      {
        type: 'dynamic-path',
        dynamicLogicPath: ['props', 'a', '*', 'b'],
      },
      ['props', 'a', 1, 'b'],
    ),
  ).toEqual(true)
  expect(
    isSlotMatched(
      {
        type: 'dynamic-path',
        dynamicLogicPath: ['props', 'a', '*', 'b'],
      },
      ['props', 'a', 2, 'b'],
    ),
  ).toEqual(true)
  expect(
    isSlotMatched(
      {
        type: 'dynamic-path',
        dynamicLogicPath: ['props', 'a', '*', 'b'],
      },
      ['props', 'a', 'adsf', 'b'],
    ),
  ).toEqual(true)
  expect(
    isSlotMatched(
      {
        type: 'dynamic-path',
        dynamicLogicPath: ['props', 'a', '*', 'b'],
      },
      ['props', 'a', 1, 'b', 'asdf'],
    ),
  ).toEqual(false)
})
