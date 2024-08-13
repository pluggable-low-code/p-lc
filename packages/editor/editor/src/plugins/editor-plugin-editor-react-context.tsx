import { createContext, useContext } from 'react'
import type { AnyEditor, DefaultEditor } from '../types'
import { type editorPluginRender } from './editor-plugin-render'

/**
 * 编辑器 React 上下文
 */
export const EditorReactContext = createContext<AnyEditor | null>(null)

/**
 * 编辑器 React 上下文提供者
 */
export const EditorReactContextProvider = EditorReactContext.Provider

/**
 * 编辑器 React 上下文消费者
 */
export const EditorReactContextConsumer = EditorReactContext.Consumer

/**
 * 使用编辑器
 */
export function useEditor<E = DefaultEditor>(): E {
  return useContext(EditorReactContext)
}

/**
 * 编辑器 React 上下文插件
 */
export const editorPluginEditorReactContext: typeof editorPluginRender = {
  id: 'editor-react-context',
  initEditor(ctx) {
    const { render: oldRender } = ctx
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ctx.render = () => {
      return (
        <EditorReactContextProvider value={ctx}>
          {oldRender()}
        </EditorReactContextProvider>
      )
    }
  },
}
