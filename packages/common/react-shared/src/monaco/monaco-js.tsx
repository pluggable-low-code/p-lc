import type { EditorProps } from '@monaco-editor/react'
import MonacoEditor from '@monaco-editor/react'
import { memo } from 'react'

/**
 * 选项
 */
const options: EditorProps['options'] = {
  tabSize: 2,
}

/**
 * Monaco JavaScript（编辑器）
 */
export const MonacoJs: typeof MonacoEditor = memo((props) => {
  return <MonacoEditor language="javascript" options={options} {...props} />
})
