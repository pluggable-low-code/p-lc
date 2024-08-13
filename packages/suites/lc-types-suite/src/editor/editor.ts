import { createEditor } from '@p-lc/editor'
import { createRenderer, createRendererOwnerInit } from '@p-lc/react-shared'
import { assign } from 'lodash-uni'
import { lcTypesEditorInitOptions } from './init-options'
import { lcTypesEditorPlugins } from './plugins'
import type { LcTypesEditor } from './types'

/**
 * 创建低代码类型编辑器
 */
export function createLcTypesEditor(): LcTypesEditor {
  const ret = createEditor().use(...lcTypesEditorPlugins)
  if (process.env.NODE_ENV === 'development') {
    assign(window, {
      debugEditor: ret,
    })
  }
  return ret
}

/**
 * （创建并）初始化低代码类型编辑器
 */
export const initLcTypesEditor = createRendererOwnerInit(
  createLcTypesEditor,
  lcTypesEditorInitOptions,
)

/**
 * 低代码类型编辑器渲染器
 */
export const LcTypesEditorRenderer = createRenderer(initLcTypesEditor)
