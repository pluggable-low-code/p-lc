import { useEditor } from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import { MonacoJson, withStylePropsObserver } from '@p-lc/react-shared'
import type { EditorUidlElement, UidlExpression } from '@p-lc/uidl'
import { isObject } from 'lodash-uni'
import type { FC } from 'react'
import { useCallback } from 'react'

/**
 * Monaco 选中的 UIDL 元素（编辑器）
 */
export const MonacoSelectedElement: FC<StyleProps> = withStylePropsObserver(
  () => {
    const { elementStore } = useEditor()
    const handleChange = useCallback(
      (json: unknown) => {
        const id = elementStore.selectedElementId
        if (!isObject(json) || !id) return
        elementStore.editElement({
          ...(json as EditorUidlElement<UidlExpression>),
          id,
        })
      },
      [elementStore],
    )
    return (
      <MonacoJson
        value={elementStore.selectedElement}
        onChange={handleChange}
      />
    )
  },
)
