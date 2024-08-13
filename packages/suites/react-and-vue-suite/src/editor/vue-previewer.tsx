import { useEditor } from '@p-lc/editor'
import { uniqueId } from 'lodash-uni'
import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import { useMemo } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import styled from 'styled-components'
import { RavVueRuntimeRenderer } from '../runtime'

/**
 * RAV Vue 预览器
 */
export const RavVuePreviewer: FC = observer(() => {
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
    <InternalRavVuePreviewerContainer>
      <h1>Vue</h1>
      <div className="runtime-wrapper">
        <ErrorBoundary
          fallback={<div>{t('somethingWentWrong')}</div>}
          resetKeys={[key]}
        >
          <RavVueRuntimeRenderer key={key} uidl={uidl} />
        </ErrorBoundary>
      </div>
    </InternalRavVuePreviewerContainer>
  )
})

/**
 * 内部：RAV Vue 预览器容器
 */
export const InternalRavVuePreviewerContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  > h1 {
    text-align: center;
  }

  .runtime-wrapper {
    height: 0;
    flex: auto;
    overflow: auto;
  }
`
