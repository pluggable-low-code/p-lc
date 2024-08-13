import { Mobo } from '@mobo-ts/mobo'
import { editorExtKeys } from './constants'
import { editorDefaultPlugins } from './plugins'
import type { DefaultEditor } from './types'

/**
 * 创建编辑器
 */
export function createEditor(): DefaultEditor {
  return new Mobo(editorDefaultPlugins, editorExtKeys)
}
