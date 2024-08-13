import { useEditor } from '@p-lc/editor'
import { uniqueId } from 'lodash-uni'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useMemo } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import styled from 'styled-components'
import { ScratchReactRuntimeRenderer } from '../runtime'

/**
 * 起步预览器
 */
export const ScratchPreviewer: FC = observer(() => {
  const {
    uidlStore: { uidl },
    i18nStore: { t },
  } = useEditor()
  const key = useMemo(() => {
    void uidl
    return uniqueId()
  }, [uidl])
  if (!uidl) {
    return null
  }
  return (
    <InternalScratchPreviewerContainer>
      <ErrorBoundary
        fallback={<div>{t('somethingWentWrong')}</div>}
        resetKeys={[key]}
      >
        <ScratchReactRuntimeRenderer key={key} uidl={uidl} />
      </ErrorBoundary>
    </InternalScratchPreviewerContainer>
  )
})

/**
 * 内部：起步预览器容器
 */
export const InternalScratchPreviewerContainer = styled.div`
  height: 100%;
  overflow: auto;
`
