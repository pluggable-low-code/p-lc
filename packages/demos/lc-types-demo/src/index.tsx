import { LcTypesEditorRenderer } from '@p-lc/lc-types-suite'
import lcTypesJson from '@p-lc/lc-types-ui/lc-types.json'
import type { Pd } from '@p-lc/pd'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LcTypesEditorRenderer
      pd={lcTypesJson as unknown as Pd}
      onSavePd={(...args) => {
        console.log('save', ...args)
      }}
    />
  </StrictMode>,
)
