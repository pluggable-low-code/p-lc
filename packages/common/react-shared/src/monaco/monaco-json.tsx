import type { EditorProps } from '@monaco-editor/react'
import MonacoEditor from '@monaco-editor/react'
import type { ValueOnChangeProps } from '@p-lc/shared'
import { jsonParse, jsonStringifyTwoSpaces } from '@p-lc/shared'
import { isEqual } from 'lodash-uni'
import type { FC } from 'react'
import { memo, useCallback, useEffect, useRef, useState } from 'react'

/**
 * Monaco JSON（编辑器）
 */
export interface MonacoJsonProps
  extends Omit<EditorProps, 'value' | 'onChange'>,
    ValueOnChangeProps {
  /**
   * 错误事件
   * @param err 错误
   */
  onError?(err: Error | null): void
}

/**
 * 选项
 */
const options: EditorProps['options'] = {
  tabSize: 2,
}

/**
 * Monaco JSON（编辑器），删空之后为 undefined
 */
export const MonacoJson: FC<MonacoJsonProps> = memo(
  ({ value, onChange, onError, ...restProps }) => {
    const refJson = useRef(value)
    const [jsonStr, setJsonStr] = useState(() => jsonStringifyTwoSpaces(value))
    const handleChange = useCallback(
      (str = '') => {
        setJsonStr(str)
        try {
          const j = str ? jsonParse(str) : undefined
          refJson.current = j
          onError?.(null)
          onChange?.(j)
        } catch (err) {
          onError?.(err as Error)
        }
      },
      [onChange, onError],
    )
    useEffect(() => {
      if (!isEqual(value, refJson.current)) {
        refJson.current = value
        setJsonStr(jsonStringifyTwoSpaces(value))
      }
    }, [value])
    return (
      <MonacoEditor
        language="json"
        options={options}
        value={jsonStr}
        onChange={handleChange}
        {...restProps}
      />
    )
  },
)
