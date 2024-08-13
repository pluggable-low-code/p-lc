import type { LiteralObject } from '@mobo-ts/shared'

/**
 * 字符串对象，防止跟字面字符串类型合并
 */
export type StringObject = string & LiteralObject
