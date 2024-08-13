import type { Promisable } from 'type-fest'

export type { Promisable } from 'type-fest'

/**
 * Promise 的值
 */
export type PromiseValue<T> = T extends Promisable<infer V> ? V : T
