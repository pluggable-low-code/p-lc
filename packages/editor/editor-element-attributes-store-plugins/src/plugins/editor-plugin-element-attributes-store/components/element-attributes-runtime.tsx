import { useEditor } from '@p-lc/editor'
import { BindingDialogContextProvider } from '@p-lc/lc-types-ui'
import type { StyleProps } from '@p-lc/react-shared'
import { withStylePropsObserver } from '@p-lc/react-shared'
import { CLASS_NAME_LC_POPUP } from '@p-lc/shared'
import type { FC } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import styled from 'styled-components'
import type { ElementAttributesEditor } from '../../../types'
import { I18N_KEY_SOMETHING_WENT_WRONG_IN_CD } from '../i18n'

/**
 * 元素属性（Attribute）运行时属性
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ElementAttributesRuntimeProps extends StyleProps {}

/**
 * 元素属性运行时
 */
export const ElementAttributesRuntime: FC<ElementAttributesRuntimeProps> =
  withStylePropsObserver(() => {
    const {
      elementAttributesStore: {
        setElPopupContainer,
        lcTypesRuntime,
        BindingDialog,
      },
      i18nStore: { t },
      elementStore: { selectedElementId },
    } = useEditor<ElementAttributesEditor>()
    return (
      <InternalElementAttributesRuntimeContainer className="lc-el-attrs-runtime">
        <div className="lc-runtime">
          <ErrorBoundary
            key={selectedElementId}
            fallback={<div>{t(I18N_KEY_SOMETHING_WENT_WRONG_IN_CD)}</div>}
          >
            <BindingDialogContextProvider value={BindingDialog}>
              {lcTypesRuntime.render()}
            </BindingDialogContextProvider>
          </ErrorBoundary>
        </div>
        <div className="lc-runtime-mask">
          <div className="lc-popup-container" ref={setElPopupContainer} />
        </div>
      </InternalElementAttributesRuntimeContainer>
    )
  })

/**
 * 内部：元素属性运行时容器
 */
export const InternalElementAttributesRuntimeContainer = styled.div`
  > .lc-runtime {
    position: relative;
    height: 100%;
    overflow: auto;
  }

  > .lc-runtime-mask {
    position: absolute;
    inset: 0px;
    pointer-events: none;

    > .lc-popup-container {
      position: absolute;
      inset: 0;
      z-index: 10;

      .${CLASS_NAME_LC_POPUP} {
        pointer-events: auto;
      }
    }
  }
`
