import { createEditor } from '@p-lc/editor'
import { createRenderer, createRendererOwnerInit } from '@p-lc/react-shared'
import { assign } from 'lodash-uni'
import { scratchEditorInitOptions } from './init-options'
import { scratchEditorPlugins } from './plugins'
import type { ScratchEditor } from './types'

/**
 * 创建起步编辑器
 */
export function createScratchEditor(): ScratchEditor {
  const ret = createEditor().use(...scratchEditorPlugins)
  if (process.env.NODE_ENV === 'development') {
    assign(window, {
      debugEditor: ret,
    })
  }
  return ret
}

/**
 * （创建并）初始化起步编辑器
 */
export const initScratchEditor = createRendererOwnerInit(
  createScratchEditor,
  scratchEditorInitOptions,
)

/**
 * 起步编辑器渲染器
 */
export const ScratchEditorRenderer = createRenderer(initScratchEditor)
