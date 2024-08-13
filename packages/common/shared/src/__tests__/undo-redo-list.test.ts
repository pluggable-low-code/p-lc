import { expect, test, vi } from 'vitest'
import { UndoRedoList } from '../linked-list'

test('UndoRedoList undo redo', () => {
  const initState = { a: 3, b: 4, c: ['a', 'd'] }
  const onChange = vi.fn(() => 3)
  const undoRedoList = new UndoRedoList({
    initState,
    onChange,
  })
  expect(undoRedoList.currentState).toBe(initState)
  expect(undoRedoList.isUndoable).toBe(false)
  expect(undoRedoList.isRedoable).toBe(false)
  expect(undoRedoList.size).toBe(1)
  expect(onChange.mock.calls).toEqual([])

  undoRedoList.undo()
  expect(undoRedoList.currentState).toBe(initState)
  expect(undoRedoList.isUndoable).toBe(false)
  expect(undoRedoList.isRedoable).toBe(false)
  expect(undoRedoList.size).toBe(1)
  expect(onChange.mock.calls).toEqual([])

  undoRedoList.redo()
  expect(undoRedoList.currentState).toBe(initState)
  expect(undoRedoList.isUndoable).toBe(false)
  expect(undoRedoList.isRedoable).toBe(false)
  expect(undoRedoList.size).toBe(1)
  expect(onChange.mock.calls).toEqual([])

  undoRedoList.produce((o) => {
    o.a = 44
  })
  const state2 = undoRedoList.currentState
  expect(undoRedoList.currentState).toEqual({ a: 44, b: 4, c: ['a', 'd'] })
  expect(undoRedoList.currentState.c).toBe(initState.c)
  expect(undoRedoList.isUndoable).toBe(true)
  expect(undoRedoList.isRedoable).toBe(false)
  expect(undoRedoList.size).toBe(2)
  expect(onChange.mock.calls).toEqual([
    [
      'update',
      { a: 44, b: 4, c: ['a', 'd'] },
      [
        {
          op: 'replace',
          path: ['a'],
          value: 44,
        },
      ],
    ],
  ])

  undoRedoList.undo()
  expect(undoRedoList.currentState).toBe(initState)
  expect(undoRedoList.isUndoable).toBe(false)
  expect(undoRedoList.isRedoable).toBe(true)
  expect(undoRedoList.size).toBe(2)
  expect(onChange.mock.calls.slice(1)).toEqual([
    [
      'undo',
      { a: 3, b: 4, c: ['a', 'd'] },
      [
        {
          op: 'replace',
          path: ['a'],
          value: 3,
        },
      ],
    ],
  ])

  undoRedoList.redo()
  expect(undoRedoList.currentState).toBe(state2)
  expect(undoRedoList.isUndoable).toBe(true)
  expect(undoRedoList.isRedoable).toBe(false)
  expect(undoRedoList.size).toBe(2)
  expect(onChange.mock.calls.slice(2)).toEqual([
    [
      'redo',
      { a: 44, b: 4, c: ['a', 'd'] },
      [
        {
          op: 'replace',
          path: ['a'],
          value: 44,
        },
      ],
    ],
  ])

  undoRedoList.produce((o) => {
    o.a = 1
    undoRedoList.produce((o2) => {
      o2.c.push('ff')
    })
  }, 'a')
  expect(undoRedoList.currentState).toEqual({ a: 1, b: 4, c: ['a', 'd', 'ff'] })
  expect(initState.c).toEqual(['a', 'd'])
  expect(undoRedoList.isUndoable).toBe(true)
  expect(undoRedoList.isRedoable).toBe(false)
  expect(undoRedoList.size).toBe(3)
  expect(onChange.mock.calls.slice(3)).toEqual([
    [
      'update',
      { a: 1, b: 4, c: ['a', 'd', 'ff'] },
      [
        {
          op: 'add',
          path: ['c', 2],
          value: 'ff',
        },
        {
          op: 'replace',
          path: ['a'],
          value: 1,
        },
      ],
    ],
  ])

  undoRedoList.produce((o) => {
    o.a = 11
  }, 'a')
  expect(undoRedoList.currentState).toEqual({
    a: 11,
    b: 4,
    c: ['a', 'd', 'ff'],
  })
  expect(undoRedoList.isUndoable).toBe(true)
  expect(undoRedoList.isRedoable).toBe(false)
  expect(undoRedoList.size).toBe(3)
  expect(onChange.mock.calls.slice(4)).toEqual([
    [
      'in-place-update',
      { a: 11, b: 4, c: ['a', 'd', 'ff'] },
      [
        {
          op: 'replace',
          path: ['a'],
          value: 11,
        },
      ],
    ],
  ])

  undoRedoList.produce((o) => {
    o.a = 12
  })
  expect(undoRedoList.currentState).toEqual({
    a: 12,
    b: 4,
    c: ['a', 'd', 'ff'],
  })
  expect(undoRedoList.isUndoable).toBe(true)
  expect(undoRedoList.isRedoable).toBe(false)
  expect(undoRedoList.size).toBe(4)
  expect(onChange.mock.calls.slice(5)).toEqual([
    [
      'update',
      { a: 12, b: 4, c: ['a', 'd', 'ff'] },
      [
        {
          op: 'replace',
          path: ['a'],
          value: 12,
        },
      ],
    ],
  ])
})

test('UndoRedoList inplace update', () => {
  const initState = { a: 3 }
  const undoRedoList = new UndoRedoList({
    initState,
  })
  expect(undoRedoList.size).toBe(1)
  undoRedoList.produce((o) => {
    o.a = 4
  }, 'a')
  undoRedoList.produce((o) => {
    o.a = 5
  }, 'a')
  undoRedoList.produce((o) => {
    o.a = 6
  }, 'a')
  expect(undoRedoList.size).toBe(2)
  undoRedoList.produce((o) => {
    o.a = 7
  }, 'b')
  expect(undoRedoList.size).toBe(3)
  undoRedoList.undo()
  expect(undoRedoList.size).toBe(3)
  expect(undoRedoList.isUndoable).toBe(true)
  expect(undoRedoList.isRedoable).toBe(true)
  expect(undoRedoList.currentState.a).toBe(6)
  undoRedoList.undo()
  expect(undoRedoList.size).toBe(3)
  expect(undoRedoList.isUndoable).toBe(false)
  expect(undoRedoList.isRedoable).toBe(true)
  expect(undoRedoList.currentState.a).toBe(3)
  undoRedoList.produce((o) => {
    o.a = 8
  }, 'b')
  expect(undoRedoList.size).toBe(2)
  expect(undoRedoList.isUndoable).toBe(true)
  expect(undoRedoList.isRedoable).toBe(false)
  expect(undoRedoList.currentState.a).toBe(8)
  undoRedoList.produce((o) => {
    o.a = 9
  }, 'b')
  expect(undoRedoList.size).toBe(2)
  expect(undoRedoList.isUndoable).toBe(true)
  expect(undoRedoList.isRedoable).toBe(false)
  expect(undoRedoList.currentState.a).toBe(9)
})

test('UndoRedoList patchs', () => {
  const initState = { a: 3, b: 4, c: ['a', 'd'] } as {
    a: number
    b?: unknown
    c?: unknown
  }
  const onChange = vi.fn(() => 3)
  const undoRedoList = new UndoRedoList({
    initState,
    onChange,
  })
  undoRedoList.produce((o) => {
    o.a++
    delete o.b
  }, 'a')
  undoRedoList.produce((o) => {
    o.a++
    delete o.c
  }, 'a')
  undoRedoList.undo()
  expect(onChange.mock.calls).toEqual([
    [
      'update',
      {
        a: 4,
        c: ['a', 'd'],
      },
      [
        {
          op: 'replace',
          path: ['a'],
          value: 4,
        },
        {
          op: 'remove',
          path: ['b'],
        },
      ],
    ],
    [
      'in-place-update',
      {
        a: 5,
      },
      [
        {
          op: 'replace',
          path: ['a'],
          value: 5,
        },
        {
          op: 'remove',
          path: ['c'],
        },
      ],
    ],
    [
      'undo',
      {
        a: 3,
        b: 4,
        c: ['a', 'd'],
      },
      [
        {
          op: 'add',
          path: ['c'],
          value: ['a', 'd'],
        },
        {
          op: 'replace',
          path: ['a'],
          value: 3,
        },
        {
          op: 'add',
          path: ['b'],
          value: 4,
        },
      ],
    ],
  ])
})
