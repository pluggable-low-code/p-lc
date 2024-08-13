import type { PreviewerRuntimePlugin } from '@p-lc/previewer'
import type { ReactSlotRenderFn } from '@p-lc/react-component-library-shared'
import type {
  ElementReactRendererHocItem,
  ReactRuntimePlugin,
} from '@p-lc/react-runtime'
import { reactSlotExpressionEvaluator } from '@p-lc/react-runtime'
import type { DepPluginUniteRuntimePlugin, RuntimePlugin } from '@p-lc/runtime'
import { CONTEXT_TYPE_ELEMENT } from '@p-lc/runtime'
import type { LiteralObject } from '@p-lc/shared'
import { STR_CHILDREN } from '@p-lc/shared'
import { EXPRESSION_TYPE_SLOT, childrenSlotLogicPath } from '@p-lc/uidl-utils'
import { forwardRef, memo } from 'react'
import { SlotPlaceholder } from './slot-placeholder'

export * from './slot-placeholder'

/**
 * React 插槽占位高阶组件条目
 */
export const slotPlaceholderReactHocItem: ElementReactRendererHocItem<
  DepPluginUniteRuntimePlugin<typeof runtimePluginSlotPlaceholderReact>
> = {
  id: 'slot-ph-react',
  index: 930,
  hoc(C) {
    return memo(
      forwardRef((props, ref) => {
        const { __ctx__: ctx } = props
        const { uidlElement, props: ctxProps } = ctx
        const { children: uidlChildren } = uidlElement
        const finalProps = { ...props }
        if (!(STR_CHILDREN in ctxProps) && !uidlChildren?.length) {
          const slot = ctx.root.getSlot(uidlElement.type, childrenSlotLogicPath)
          if (slot) {
            finalProps.children = (
              <SlotPlaceholder
                elementId={uidlElement.id}
                slotLogicPath={childrenSlotLogicPath}
              />
            )
          }
        }
        return <C {...finalProps} ref={ref} />
      }),
    )
  },
}

/**
 * 运行时 React 插槽占位插件
 */
export const runtimePluginSlotPlaceholderReact: RuntimePlugin<
  LiteralObject,
  ReactRuntimePlugin | PreviewerRuntimePlugin
> = {
  id: 'slot-ph-react',
  initRuntime(ctx) {
    ctx.rendererHocs.element[slotPlaceholderReactHocItem.id] =
      slotPlaceholderReactHocItem
    const reactSlotExpressionEvaluatorPh: typeof reactSlotExpressionEvaluator =
      {
        type: EXPRESSION_TYPE_SLOT,
        eval(...args) {
          const [{ value }, childCtx, { relativeLogicPath }] = args
          if (!value.length && childCtx.type === CONTEXT_TYPE_ELEMENT) {
            const { uidlElement } = childCtx
            const slot = ctx.getSlot(uidlElement.type, relativeLogicPath)
            if (slot) {
              const { dynamicRender } = slot
              const jsx = (
                <SlotPlaceholder
                  elementId={uidlElement.id}
                  slotLogicPath={relativeLogicPath}
                  dynamicRender={dynamicRender}
                />
              )
              return dynamicRender
                ? // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                  ((() => jsx) satisfies ReactSlotRenderFn)
                : jsx
            }
          }
          return reactSlotExpressionEvaluator.eval(...args)
        },
      }
    ctx.addExpressionEvaluator(reactSlotExpressionEvaluatorPh)
  },
}
