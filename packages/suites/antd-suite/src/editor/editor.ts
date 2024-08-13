import { createEditor } from '@p-lc/editor'
import { createRenderer, createRendererOwnerInit } from '@p-lc/react-shared'
import { assign } from 'lodash-uni'
import { antdEditorInitOptions } from './init-options'
import { antdEditorPlugins } from './plugins'
import type { AntdEditor } from './types'

/**
 * 创建 antd 编辑器
 */
export function createAntdEditor(): AntdEditor {
  const ret = createEditor().use(...antdEditorPlugins)
  if (process.env.NODE_ENV === 'development') {
    assign(window, {
      debugEditor: ret,
    })
  }
  return ret
}

/**
 * （创建并）初始化 antd 编辑器
 */
export const initAntdEditor = createRendererOwnerInit(
  createAntdEditor,
  antdEditorInitOptions,
)

/**
 * antd 编辑器渲染器
 */
export const AntdEditorRenderer = createRenderer(initAntdEditor)
