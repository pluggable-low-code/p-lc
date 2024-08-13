import { LcTypesEditorRenderer } from '@p-lc/lc-types-suite'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { loadLcTypes, saveLcTypes } from './apis'

const { data: initPd } = await loadLcTypes()

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LcTypesEditorRenderer
      pd={initPd}
      onSavePd={(pd) => {
        saveLcTypes(pd)
      }}
    />
  </StrictMode>,
)
