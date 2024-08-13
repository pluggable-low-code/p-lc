/**
 * 可数组化
 */
export type Arrayable<T> = T | T[]

/**
 * 反可数组化
 */
export type Unarrayable<T> = T extends Arrayable<infer V> ? V : unknown
