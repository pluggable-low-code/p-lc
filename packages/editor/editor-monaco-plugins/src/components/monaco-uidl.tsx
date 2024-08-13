import { useEditor } from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import { MonacoJson, withStylePropsObserver } from '@p-lc/react-shared'
import type { EditorUidl } from '@p-lc/uidl'
import type { FC } from 'react'
import { useCallback } from 'react'

/**
 * Monaco UIDL（编辑器）
 */
export const MonacoUidl: FC<StyleProps> = withStylePropsObserver(() => {
  const {
    uidlStore: { uidl, edit },
  } = useEditor()
  const handleChange = useCallback(
    (json: unknown) => {
      edit(() => json as EditorUidl)
    },
    [edit],
  )
  return <MonacoJson value={uidl} onChange={handleChange} />
})
