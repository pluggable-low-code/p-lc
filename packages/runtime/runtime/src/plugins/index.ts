import { runtimePluginComponents } from './runtime-plugin-components'
import { runtimePluginContextType } from './runtime-plugin-context-type'
import { runtimePluginControllerChildren } from './runtime-plugin-controller-children'
import { runtimePluginControllerChildrenLoopOrigin } from './runtime-plugin-controller-children-loop-origin'
import { runtimePluginDependencies } from './runtime-plugin-dependencies'
import { runtimePluginElementChildren } from './runtime-plugin-element-children'
import { runtimePluginEvalExpression } from './runtime-plugin-eval-expression'
import { runtimePluginExpressionArray } from './runtime-plugin-expression-array'
import { runtimePluginExpressionEvaluator } from './runtime-plugin-expression-evaluator'
import { runtimePluginExpressionObject } from './runtime-plugin-expression-object'
import { runtimePluginExpressionStatic } from './runtime-plugin-expression-static'
import { runtimePluginFor } from './runtime-plugin-for'
import { runtimePluginIf } from './runtime-plugin-if'
import { runtimePluginInitContext } from './runtime-plugin-init-context'
import { runtimePluginInitOptionsTransfrom } from './runtime-plugin-init-options-transform'
import { runtimePluginKey } from './runtime-plugin-key'
import { runtimePluginLoadCode } from './runtime-plugin-load-code'
import { runtimePluginLoadDependencies } from './runtime-plugin-load-dependencies'
import { runtimePluginLoadDependenciesInit } from './runtime-plugin-load-dependencies-init'
import { runtimePluginLoop } from './runtime-plugin-loop'
import { runtimePluginParent } from './runtime-plugin-parent'
import { runtimePluginProps } from './runtime-plugin-props'
import { runtimePluginUidl } from './runtime-plugin-uidl'
import { runtimePluginView } from './runtime-plugin-view'

export * from './runtime-plugin-components'
export * from './runtime-plugin-context-type'
export * from './runtime-plugin-controller-children'
export * from './runtime-plugin-controller-children-loop-origin'
export * from './runtime-plugin-dependencies'
export * from './runtime-plugin-element-children'
export * from './runtime-plugin-eval-expression'
export * from './runtime-plugin-expression-evaluator'
export * from './runtime-plugin-expression-static'
export * from './runtime-plugin-for'
export * from './runtime-plugin-if'
export * from './runtime-plugin-init-context'
export * from './runtime-plugin-init-options-transform'
export * from './runtime-plugin-key'
export * from './runtime-plugin-load-code'
export * from './runtime-plugin-load-dependencies'
export * from './runtime-plugin-load-dependencies-init'
export * from './runtime-plugin-loop'
export * from './runtime-plugin-parent'
export * from './runtime-plugin-props'
export * from './runtime-plugin-uidl'
export * from './runtime-plugin-view'

/**
 * 运行时默认插件
 */
export const runtimeDefaultPlugins = [
  runtimePluginContextType,
  runtimePluginParent,
  runtimePluginEvalExpression,
  runtimePluginInitOptionsTransfrom,
  runtimePluginInitContext,
  runtimePluginUidl,
  runtimePluginKey,
  runtimePluginLoop,
  runtimePluginDependencies,
  runtimePluginLoadCode,
  runtimePluginLoadDependencies,
  runtimePluginLoadDependenciesInit,
  runtimePluginExpressionEvaluator,
  runtimePluginExpressionStatic,
  runtimePluginExpressionObject,
  runtimePluginExpressionArray,
  runtimePluginComponents,
  runtimePluginProps,
  runtimePluginIf,
  runtimePluginFor,
  runtimePluginControllerChildrenLoopOrigin,
  runtimePluginElementChildren,
  runtimePluginControllerChildren,
  runtimePluginView,
]
