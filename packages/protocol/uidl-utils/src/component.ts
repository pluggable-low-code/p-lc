import { createBigInt, jsonStringify, type JsonPath } from '@p-lc/shared'
import type { Uidl, UidlComponent } from '@p-lc/uidl'
import { isEqual, last } from 'lodash-uni'
import { ELEMENT_TYPE_SEPARATOR } from './constants'

/**
 * 创建 UIDL 组件，不修改 UIDL
 * @param uidl UIDL
 * @param pkgName 包名
 * @param pkgVersion 包版本
 * @param componentType 组件类型
 * @param importPath 导入路径，指最终 `ctx.dependencies[pkgName]` 里的路径，默认为: `[componentType]`
 */
export function createUidlComponent<U extends Uidl>(
  uidl: U,
  pkgName: string,
  pkgVersion: string,
  componentType: string,
  importPath?: JsonPath,
): UidlComponent {
  const lastElementType = last(uidl.components)?.elementType
  const lastN = last(lastElementType?.split(ELEMENT_TYPE_SEPARATOR))
  const n = createBigInt(lastN || -1, -1n) + 1n
  const elementType = [componentType, n].join(ELEMENT_TYPE_SEPARATOR)
  const component: UidlComponent = {
    elementType,
    pkgName,
    pkgVersion,
    componentType,
  }
  if (importPath && !isEqual(importPath, [componentType])) {
    component.importPath = importPath
  }
  return component
}

/**
 * 添加 UIDL 组件，原地修改
 * @param uidl UIDL
 * @param component 组件
 * @returns 新的 UIDL
 */
export function addUidlComponent<U extends Uidl>(
  uidl: U,
  component: UidlComponent,
): void {
  let { components } = uidl
  if (!components) {
    components = uidl.components = []
  }
  components.push(component)
}

/**
 * 确保 UIDL 组件存在，原地修改
 * @param uidl UIDL
 * @param pkgName 包名
 * @param pkgVersion 包版本
 * @param componentTypes 组件类型
 * @param importPaths 导入路径，指最终 `ctx.dependencies[pkgName]` 里的路径，默认为: `[componentType]`
 * @returns 元素类型
 */
export function ensureUidlComponents<U extends Uidl>(
  uidl: U,
  pkgName: string,
  pkgVersion: string,
  componentTypes: string[],
  importPaths?: JsonPath[],
): string[] {
  const { components = [] } = uidl
  const currentPkgNameComponentTypeMap = new Map(
    components.map((cd) => [
      jsonStringify([cd.pkgName, cd.componentType]),
      cd.elementType,
    ]),
  )
  return componentTypes.map((componentType, i) => {
    const key = jsonStringify([pkgName, componentType])
    const elementType = currentPkgNameComponentTypeMap.get(key)
    if (elementType) return elementType
    const component = createUidlComponent(
      uidl,
      pkgName,
      pkgVersion,
      componentType,
      importPaths?.[i],
    )
    addUidlComponent(uidl, component)
    return component.elementType
  })
}
