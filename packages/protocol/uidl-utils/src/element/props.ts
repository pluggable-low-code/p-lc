import { STR_CHILDREN } from '@p-lc/shared'
import type { Uidl } from '@p-lc/uidl'
import { isUndefined } from 'lodash-uni'
import { EXPRESSION_TYPE_SLOT } from '../constants'
import { isSlotExpression } from '../expression'
import type { ElementOfUidl } from '../types'

/**
 * 合并子元素到属性里
 * @param children 子元素
 * @param props 属性
 * @returns 新的属性对象
 */
export function mergeChildrenToProps<U extends Uidl = Uidl>(
  children: ElementOfUidl<U>['children'],
  props: ElementOfUidl<U>['props'],
): NonNullable<ElementOfUidl<U>['props']> {
  const newProps = {
    ...props,
  } as NonNullable<ElementOfUidl<U>['props']>
  if (children && isUndefined(newProps[STR_CHILDREN])) {
    newProps[STR_CHILDREN] = {
      type: EXPRESSION_TYPE_SLOT,
      value: children,
    }
  }
  return newProps
}

/**
 * 将子元素从属性中分离
 * @param props 属性
 * @returns 新的子元素、属性对象
 */
export function splitChildrenFromProps<U extends Uidl = Uidl>(
  props: ElementOfUidl<U>['props'],
): [ElementOfUidl<U>['children'], ElementOfUidl<U>['props']] {
  let children: ElementOfUidl<U>['children'] | undefined
  let newProps: ElementOfUidl<U>['props'] | undefined
  if (props) {
    const { children: propsChildren, ...restProps } = props
    if (isSlotExpression(propsChildren)) {
      const v = propsChildren.value
      children = v
      newProps = restProps
    }
  }
  if (!newProps) newProps = { ...props }
  return [children, newProps]
}
