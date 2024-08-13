import { expect, test } from 'vitest'
import { exec, execWithTupleMemo } from '../fn'

test('execWithTupleMemo', () => {
  function f(n: number): string {
    let s = ''
    while (n--) {
      s += Math.random()
    }
    return s
  }
  expect(exec(f, 3)).not.toBe(exec(f, 3))
  expect(execWithTupleMemo(f, 3)).not.toBe(execWithTupleMemo(f, 1))
  expect(execWithTupleMemo(f, 3)).toBe(execWithTupleMemo(f, 3))
  expect(execWithTupleMemo(f, 1)).toBe(execWithTupleMemo(f, 1))
})
