import type { DefaultController } from '@p-lc/runtime'
import type { FC } from 'react'
import { forwardRef } from 'react'
import type { ReactRendererProps } from '../runtime-plugin-react-renderer-hocs'
import { ElementRenderer } from './element-renderer'
import { useRenderers } from './renderer-react-context'

/**
 * 控制器渲染器
 */
export const ControllerRenderer: FC<ReactRendererProps<DefaultController>> =
  forwardRef(({ __ctx__: { children }, ...restProps }, ref) => {
    const { ElementRenderer: FinalElementRenderer = ElementRenderer } =
      useRenderers()
    const ps =
      children.length === 1
        ? {
            ...restProps,
            ref,
          }
        : {}
    return children.map((child) => (
      <FinalElementRenderer key={child.key} {...ps} __ctx__={child} />
    ))
  })
