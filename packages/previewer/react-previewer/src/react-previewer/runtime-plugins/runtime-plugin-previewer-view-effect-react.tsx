import type { PreviewerRuntimePlugin } from '@p-lc/previewer'
import type {
  ReactRuntimePlugin,
  RuntimeReactRendererHoc,
  RuntimeReactRendererHocItem,
} from '@p-lc/react-runtime'
import type { DepPluginUniteRuntimePlugin, RuntimePlugin } from '@p-lc/runtime'
import type { LiteralObject } from '@p-lc/shared'
import { observer } from 'mobx-react-lite'
import { forwardRef, useEffect } from 'react'

/**
 * 预览器 React 视图副作用高阶组件条目
 */
export const previewerViewEffectReactHocItem: RuntimeReactRendererHocItem<
  DepPluginUniteRuntimePlugin<typeof runtimePluginPreviewerViewEffectReact>
> = {
  id: 'previewer-ve-react',
  index: 960,
  hoc(C) {
    return observer(
      forwardRef((props, ref) => {
        const { __ctx__: ctx } = props
        const { view, editorCall } = ctx
        useEffect(() => {
          void view
          editorCall.onViewEffect()
        }, [editorCall, view])
        return <C {...props} ref={ref} />
      }) satisfies ReturnType<
        RuntimeReactRendererHoc<
          DepPluginUniteRuntimePlugin<
            typeof runtimePluginPreviewerViewEffectReact
          >
        >
      >,
    )
  },
}

/**
 * 运行时预览器 React 视图副作用插件
 */
export const runtimePluginPreviewerViewEffectReact: RuntimePlugin<
  LiteralObject,
  ReactRuntimePlugin | PreviewerRuntimePlugin
> = {
  id: 'previewer-ve-react',
  initRuntime(ctx) {
    ctx.rendererHocs.runtime[previewerViewEffectReactHocItem.id] =
      previewerViewEffectReactHocItem
  },
}
