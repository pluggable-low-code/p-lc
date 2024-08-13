import { expect, test } from 'vitest'
import { applyMixins } from '../class'

test('applyMixins', () => {
  class A {
    public a = 1

    public fa(): number {
      return 2
    }
  }

  class B {
    public b = 11

    public fb(): number {
      return 12
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
  class C {
    public c = 21

    public fc(): number {
      return this.c + 1
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
  interface C extends A, B {}
  applyMixins(C, [A, B])

  const o = new C()
  expect(o.a).toBe(undefined)
  expect(o.b).toBe(undefined)
  expect(o.c).toBe(21)
  expect(o.fa()).toBe(2)
  expect(o.fb()).toBe(12)
  expect(o.fc()).toBe(22)
})
