import { createEditor } from '@p-lc/editor'
import { createRenderer, createRendererOwnerInit } from '@p-lc/react-shared'
import { assign } from 'lodash-uni'
import { ravEditorInitOptions } from './init-options'
import { ravEditorPlugins } from './plugins'
import type { RavEditor } from './types'

/**
 * 创建 RAV 编辑器
 */
export function createRavEditor(): RavEditor {
  const ret = createEditor().use(...ravEditorPlugins)
  if (process.env.NODE_ENV === 'development') {
    assign(window, {
      debugEditor: ret,
    })
  }
  return ret
}

/**
 * （创建并）初始化 RAV 编辑器
 */
export const initRavEditor = createRendererOwnerInit(
  createRavEditor,
  ravEditorInitOptions,
)

/**
 * RAV 编辑器渲染器
 */
export const RavEditorRenderer = createRenderer(initRavEditor)
