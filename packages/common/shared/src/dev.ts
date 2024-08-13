import type { ReadonlyUnknownArray } from '@mobo-ts/shared'

/**
 * 静默运行
 * @param fn 函数
 * @param expectedErr 预期中的 console.error
 */
export function silentRun<Args extends ReadonlyUnknownArray, Return>(
  fn: (...args: Args) => Return,
  expectedErr: string,
): (...args: Args) => Return {
  return (...args) => {
    const oldError = console.error
    console.error = (...errArgs: unknown[]): void => {
      if (`${errArgs[0]}`.indexOf(expectedErr) === -1) {
        oldError(...errArgs)
      }
    }
    try {
      const ret = fn(...args)
      return ret
    } finally {
      console.error = oldError
    }
  }
}
