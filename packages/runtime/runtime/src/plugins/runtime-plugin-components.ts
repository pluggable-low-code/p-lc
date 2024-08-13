import { cacheOneParamFnByObj, type JsonPath } from '@p-lc/shared'
import type { UidlComponent } from '@p-lc/uidl'
import { DEFAULT_PKG_NAME } from '@p-lc/uidl-utils'
import { get } from 'lodash-uni'
import type { RuntimeRawPlugin } from '../types'
import { type runtimePluginDependencies } from './runtime-plugin-dependencies'
import { type runtimePluginParent } from './runtime-plugin-parent'
import { type runtimePluginUidl } from './runtime-plugin-uidl'

/**
 * 运行时组件插件属性扩展
 */
export interface RuntimePluginComponentsPropertiesExt {
  runtime: {
    /**
     * 获取组件
     * @param elementType 元素类型
     */
    getComponent: (elementType: string) => unknown
  }
  element: {
    /**
     * 组件，用于渲染
     */
    component: unknown
  }
}

/**
 * 运行时组件插件
 */
export const runtimePluginComponents: RuntimeRawPlugin<
  RuntimePluginComponentsPropertiesExt,
  | typeof runtimePluginDependencies
  | typeof runtimePluginUidl
  | typeof runtimePluginParent
> = {
  id: 'components',
  initRuntime(ctx) {
    const { dependencies } = ctx
    ctx.getComponent = ((elementType) => {
      const uidlComponent = getUidlComponent(elementType)
      let path: JsonPath
      if (uidlComponent) {
        const {
          pkgName,
          componentType,
          importPath = [componentType],
        } = uidlComponent
        path = [pkgName, ...importPath]
      } else {
        path = [DEFAULT_PKG_NAME, elementType]
      }
      return get(dependencies, path)
    }) as typeof ctx.getComponent

    const getGetUidlComponent = cacheOneParamFnByObj(
      (
        components: NonNullable<typeof ctx.uidl.components>,
      ): typeof getUidlComponent => {
        const map = new Map((components || []).map((c) => [c.elementType, c]))
        return (elementType) => map.get(elementType)
      },
    )
    function getUidlComponent(elementType: string): UidlComponent | undefined {
      const {
        uidl: { components },
      } = ctx
      if (!components) return
      return getGetUidlComponent(components)(elementType)
    }
  },
  initElement(ctx) {
    const {
      root: { getComponent },
      uidlElement: { type },
    } = ctx
    ctx.component = getComponent(type)
    if (process.env.NODE_ENV === 'development' && !ctx.component) {
      console.error('The component is not exists for current element.', ctx)
    }
  },
}
