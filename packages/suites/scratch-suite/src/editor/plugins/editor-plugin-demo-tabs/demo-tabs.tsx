import { useEditor } from '@p-lc/editor'
import type { FC } from 'react'
import { memo } from 'react'
import type { ScratchEditor } from '../../types'

/**
 * Demo 标签页
 */
export const DemoTabs: FC = memo(() => {
  const {
    demoStore: { demos },
    i18nStore: { t },
  } = useEditor<ScratchEditor>()

  return demos.map((demo) => (
    <button
      key={demo.id}
      onClick={() => {
        const sp = new URLSearchParams()
        sp.set('demoId', demo.id)
        location.search = sp.toString()
      }}
    >
      {t(`demoName${demo.id}`)}
    </button>
  ))
})
