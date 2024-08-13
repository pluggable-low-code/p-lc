import type { PreviewerRuntimePlugin } from '@p-lc/previewer'
import type {
  ElementReactRendererHocItem,
  ReactRuntimePlugin,
} from '@p-lc/react-runtime'
import {
  ClsFragment,
  findDOMNodeSilently,
  rcUtilFindDOMNodeSilently,
  useComposeRef,
} from '@p-lc/react-shared'
import type { DepPluginUniteRuntimePlugin, RuntimePlugin } from '@p-lc/runtime'
import type { LiteralObject } from '@p-lc/shared'
import { getClosestHtmlElement } from '@p-lc/shared'
import type { ReactInstance } from 'react'
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { InternalErrorBoundaryResetContextProvider } from './runtime-plugin-element-error-boundary-react'

/**
 * React 元素 DOM 高阶组件条目
 */
export const elementDomReactHocItem: ElementReactRendererHocItem<
  DepPluginUniteRuntimePlugin<typeof runtimePluginElementDomReact>
> = {
  id: 'element-dom-react',
  index: 950,
  hoc(C) {
    return memo(
      forwardRef((props, ref) => {
        const { __ctx__: ctx } = props
        const refClsFragment = useRef<ClsFragment>(null)
        const refElement = useRef<HTMLElement | null>()
        const [errResetId, setErrResetId] = useState(0)
        const handleErrReset = useCallback(() => {
          setErrResetId((v) => v + 1)
        }, [])
        useEffect(() => {
          if (refElement.current) return
          const {
            root: { linkHostElement, unlinkHostElement },
            uidlElement: { id: elementId },
          } = ctx
          const el = getClosestHtmlElement(
            findDOMNodeSilently(refClsFragment.current),
          )
          if (el) {
            linkHostElement(elementId, el)
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            return () => unlinkHostElement(elementId, el)
          }
        }, [ctx, errResetId])
        const finalRef = useComposeRef(ref, (cur?: ReactInstance) => {
          const {
            root: { linkHostElement, unlinkHostElement },
            uidlElement: { id: elementId },
          } = ctx
          const el = getClosestHtmlElement(rcUtilFindDOMNodeSilently(cur))
          if (refElement.current === el) return
          if (refElement.current) {
            unlinkHostElement(elementId, refElement.current, !el)
          }
          if (el) {
            linkHostElement(elementId, el)
          }
          refElement.current = el
        })
        return (
          <InternalErrorBoundaryResetContextProvider value={handleErrReset}>
            <ClsFragment ref={refClsFragment}>
              <C {...props} ref={finalRef} />
            </ClsFragment>
          </InternalErrorBoundaryResetContextProvider>
        )
      }),
    )
  },
}

/**
 * 运行时 React 元素 DOM 插件
 */
export const runtimePluginElementDomReact: RuntimePlugin<
  LiteralObject,
  ReactRuntimePlugin | PreviewerRuntimePlugin
> = {
  id: 'element-dom-react',
  initRuntime(ctx) {
    ctx.rendererHocs.element[elementDomReactHocItem.id] = elementDomReactHocItem
  },
}
