import type { DefaultRuntime } from '@p-lc/runtime'
import type { FC } from 'react'
import { forwardRef } from 'react'
import type { ReactRendererProps } from '../runtime-plugin-react-renderer-hocs'
import { ControllerRenderer } from './controller-renderer'
import { useRenderers } from './renderer-react-context'

/**
 * 运行时渲染器
 */
export const RuntimeRenderer: FC<ReactRendererProps<DefaultRuntime>> =
  forwardRef(({ __ctx__: { view }, ...restProps }, ref) => {
    const { ControllerRenderer: FinalControllerRenderer = ControllerRenderer } =
      useRenderers()
    return (
      <FinalControllerRenderer
        key={view.key}
        {...restProps}
        ref={ref}
        __ctx__={view}
      />
    )
  })
