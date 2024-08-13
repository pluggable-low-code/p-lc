import { supportRef } from '@p-lc/react-shared'
import type { DefaultElement } from '@p-lc/runtime'
import type { UnknownObject } from '@p-lc/shared'
import { STR_CHILDREN } from '@p-lc/shared'
import { isArray, isUndefined } from 'lodash-uni'
import type { FC } from 'react'
import { forwardRef } from 'react'
import type { ReactRendererProps } from '../runtime-plugin-react-renderer-hocs'
import { ControllerRenderer } from './controller-renderer'
import { useRenderers } from './renderer-react-context'

/**
 * 元素渲染器
 */
export const ElementRenderer: FC<ReactRendererProps<DefaultElement>> =
  forwardRef(
    ({ __ctx__: { component, props, children }, ...restProps }, ref) => {
      const {
        ControllerRenderer: FinalControllerRenderer = ControllerRenderer,
      } = useRenderers()
      let finalChildren
      if (STR_CHILDREN in restProps) {
        finalChildren = restProps.children
      } else {
        let ch =
          STR_CHILDREN in props
            ? props.children
            : children.map((child) => (
                <FinalControllerRenderer key={child.key} __ctx__={child} />
              ))
        if (isArray(ch) && ch.length <= 1) {
          // 减少 children 数组引用变化引起的渲染
          ch = ch[0]
        }
        finalChildren = ch
      }
      const finalProps = {
        ...props,
        ...restProps,
      }
      if (!isUndefined(finalChildren)) {
        finalProps.children = finalChildren
      }
      const C = component as FC<UnknownObject>
      return <C {...finalProps} ref={supportRef(C) ? ref : null} />
    },
  )
