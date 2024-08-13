import type { ReactInstance, Ref } from 'react'
import { Component, useRef } from 'react'
import { ForwardRef, isMemo } from 'react-is'
import { findDOMNodeSilently } from './dom'

// 从 rc-util 复制过来的，rc-util 兼容 cjs/esm 和 sideEffects 配置的不太好

interface Cache<Value, Condition> {
  condition?: Condition
  value?: Value
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useRcUtilMemo<Value, Condition = any[]>(
  getValue: () => Value,
  condition: Condition,
  shouldUpdate: (prev: Condition, next: Condition) => boolean,
): Value {
  const cacheRef = useRef<Cache<Value, Condition>>({})

  if (
    !('value' in cacheRef.current) ||
    shouldUpdate(cacheRef.current.condition as Condition, condition)
  ) {
    cacheRef.current.value = getValue()
    cacheRef.current.condition = condition
  }

  return cacheRef.current.value as Value
}

export const fillRef = <T>(ref: React.Ref<T>, node: T): void => {
  if (typeof ref === 'function') {
    ref(node)
  } else if (typeof ref === 'object' && ref && 'current' in ref) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(ref as any).current = node
  }
}

/**
 * Merge refs into one ref function to support ref passing.
 */
export const composeRef = <T>(...refs: Ref<T>[]): Ref<T> => {
  const refList = refs.filter(Boolean)
  if (refList.length <= 1) {
    return refList[0]
  }
  return (node: T) => {
    refs.forEach((ref) => {
      fillRef(ref, node)
    })
  }
}

export const useComposeRef = <T>(...refs: Ref<T>[]): Ref<T> => {
  return useRcUtilMemo(
    () => composeRef(...refs),
    refs,
    (prev, next) =>
      prev.length !== next.length || prev.every((ref, i) => ref !== next[i]),
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supportRef = (nodeOrComponent: any): boolean => {
  const type = isMemo(nodeOrComponent)
    ? nodeOrComponent.type.type
    : nodeOrComponent.type

  // Function component node
  if (
    typeof type === 'function' &&
    !type.prototype?.render &&
    type.$$typeof !== ForwardRef
  ) {
    return false
  }

  // Class component
  if (
    typeof nodeOrComponent === 'function' &&
    !nodeOrComponent.prototype?.render &&
    nodeOrComponent.$$typeof !== ForwardRef
  ) {
    return false
  }
  return true
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isDOM(node: any): node is HTMLElement | SVGElement {
  // https://developer.mozilla.org/en-US/docs/Web/API/Element
  // Since XULElement is also subclass of Element, we only need HTMLElement and SVGElement
  return node instanceof HTMLElement || node instanceof SVGElement
}

/**
 * Retrieves a DOM node via a ref, and does not invoke `findDOMNode`.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getDOM(node: any): HTMLElement | SVGElement | null {
  if (node && typeof node === 'object' && isDOM(node.nativeElement)) {
    return node.nativeElement
  }

  if (isDOM(node)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return node as any
  }

  return null
}

/**
 * Return if a node is a DOM node. Else will return by `findDOMNode`
 */
export function rcUtilFindDOMNodeSilently<T = Element | Text | null>(
  node?: ReactInstance | HTMLElement | SVGElement | { nativeElement: T } | null,
): T {
  const domNode = getDOM(node)
  if (domNode) {
    return domNode as T
  }

  if (node instanceof Component) {
    return findDOMNodeSilently(node) as unknown as T
  }

  return null as T
}
