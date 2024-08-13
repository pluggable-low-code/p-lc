import {
  create,
  defineProperty,
  getOwnPropertyDescriptor,
  getOwnPropertyNames,
} from './es'

/**
 * 混入
 * @param derivedCtor 衍生构造器
 * @param constructors （需要混入的）构造器
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function applyMixins(derivedCtor: any, constructors: any[]): void {
  for (const baseCtor of constructors) {
    for (const name of getOwnPropertyNames(baseCtor.prototype)) {
      defineProperty(
        derivedCtor.prototype,
        name,
        getOwnPropertyDescriptor(baseCtor.prototype, name) || create(null),
      )
    }
  }
}
