import type { SoftAs } from '@mobo-ts/shared'
import type { IfNever } from 'type-fest'

/**
 * 硬 as，但又没那么硬，还是尽量保留原始的类型
 */
export type HardAs<T, P> = IfNever<SoftAs<T, P>, P, SoftAs<T, P>>
