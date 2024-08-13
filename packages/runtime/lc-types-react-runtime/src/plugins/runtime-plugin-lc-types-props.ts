import type { LcTypesValueOnChange } from '@p-lc/lc-types-uidl-utils'
import type { RuntimePlugin } from '@p-lc/runtime'
import {
  mobxEvalProps,
  type runtimePluginMobxControlledData,
  runtimePluginMobxProps,
} from '@p-lc/runtime-mobx-plugins'
import type { LiteralObject } from '@p-lc/shared'
import {
  STR_PROPS,
  defineComputedProperty,
  defineLazyInitProperty,
} from '@p-lc/shared'
import { logicSetExpressionInElement } from '@p-lc/uidl-utils'
import { produce } from 'immer'
import type { runtimePluginLcTypesExpose } from './runtime-plugin-lc-types-expose'
import { type runtimePluginLcTypesUidl } from './runtime-plugin-lc-types-uidl'
import { type runtimePluginLcTypesUidlUtilsConfig } from './runtime-plugin-lc-types-uidl-utils-config'
import { type runtimePluginLogicPath } from './runtime-plugin-logic-path'
import { type runtimePluginWrapExpression } from './runtime-plugin-wrap-expression'

/**
 * 运行时低代码类型属性插件
 */
export const runtimePluginLcTypesProps: RuntimePlugin<
  LiteralObject,
  | typeof runtimePluginMobxControlledData
  | typeof runtimePluginLogicPath
  | typeof runtimePluginWrapExpression
  | typeof runtimePluginLcTypesUidl
  | typeof runtimePluginLcTypesUidlUtilsConfig
  | typeof runtimePluginLcTypesExpose
> = {
  id: 'lc-types-props',
  replace: [runtimePluginMobxProps],
  initElement(ctx) {
    defineLazyInitProperty(ctx, STR_PROPS, () => {
      const { root } = ctx
      const { uidlUtilsConfig } = root
      const props = mobxEvalProps(ctx)
      const {
        logicPath,
        wrapExpression,
        unwrapExpression,
        uidlElement: { props: uidlProps = {} },
      } = ctx
      if (logicPath?.length) {
        if (!('value' in uidlProps)) {
          defineComputedProperty(
            props,
            'value',
            () => {
              let expr = root.getExpression(logicPath)
              if (unwrapExpression) {
                expr = unwrapExpression(expr, logicPath)
              }
              return expr
            },
            { enumerable: true },
          )
        }
        if (!('onChange' in uidlProps)) {
          defineLazyInitProperty(
            props,
            'onChange',
            () =>
              // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
              ((expr, ...args) => {
                const { data } = root
                if (data.uidlElement) {
                  if (wrapExpression) {
                    expr = wrapExpression(expr, logicPath)
                  }
                  root.setData(
                    produce(data, ({ uidlElement: ue }) => {
                      logicSetExpressionInElement(
                        uidlUtilsConfig,
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        ue!,
                        logicPath,
                        expr,
                      )
                    }),
                    ...args,
                  )
                }
              }) satisfies LcTypesValueOnChange['onChange'],
          )
        }
      }
      return props
    })
  },
}
