import { LcTypesEditorRenderer } from '@p-lc/lc-types-suite'
import { StrictMode, type FC } from 'react'
import { createRoot } from 'react-dom/client'
import { loadLcTypes, saveLcTypes } from './apis'

const { data: initPd } = await loadLcTypes()

/**
 * 应用
 */
const App: FC = () => {
  return (
    <StrictMode>
      <LcTypesEditorRenderer
        pd={initPd}
        onSavePd={async (pd) => {
          await saveLcTypes(pd)
        }}
      />
    </StrictMode>
  )
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(<App />)
