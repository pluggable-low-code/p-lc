import { clsxLite, countKeys } from '@p-lc/shared'
import { observer } from 'mobx-react-lite'
import type { CSSProperties, FC, ForwardRefRenderFunction } from 'react'
import { cloneElement, forwardRef, isValidElement, memo, useMemo } from 'react'

/**
 * 样式属性
 */
export interface StyleProps {
  /**
   * CSS 类
   */
  className?: string
  /**
   * 内联样式
   */
  style?: CSSProperties
}

/**
 * 带上样式属性
 * @param fc 函数组件
 */
export function withStyleProps<P extends StyleProps, T = unknown>(
  fc:
    | FC<Omit<P, keyof StyleProps>>
    | ForwardRefRenderFunction<T, Omit<P, keyof StyleProps>>,
): ForwardRefRenderFunction<T, P> {
  return (props, ref) => {
    const { className: propsClassName, style: propsStyle, ...restProps } = props
    const el = fc(restProps, ref)
    const isElement = isValidElement(el)
    const { className: elClassName, style: elStyle } = (
      isElement ? el.props : {}
    ) as StyleProps
    const className = clsxLite(elClassName, propsClassName)
    const style = useMemo(
      () => ({
        ...elStyle,
        ...propsStyle,
      }),
      [elStyle, propsStyle],
    )
    const styleKeysLen = useMemo(() => countKeys(style), [style])
    if (isElement && (className || styleKeysLen)) {
      const newProps: StyleProps = {}
      if (className) {
        newProps.className = className
      }
      if (styleKeysLen) {
        newProps.style = style
      }
      return cloneElement(el, newProps)
    }
    return el
  }
}

/**
 * 带上样式属性并 memo
 * @param fc 函数组件
 */
export function withStylePropsMemo<P extends StyleProps>(
  fc: FC<Omit<P, keyof StyleProps>>,
): FC<P> {
  return memo(withStyleProps(fc)) as unknown as FC<P>
}

/**
 * 带上样式属性并 memo + forwardRef
 * @param fc 函数组件
 */
export function withStylePropsMf<P extends StyleProps, T = unknown>(
  fc: ForwardRefRenderFunction<T, Omit<P, keyof StyleProps>>,
): FC<P> {
  return memo(forwardRef(withStyleProps(fc))) as unknown as FC<P>
}

/**
 * 带上样式属性并 observer
 * @param fc 函数组件
 */
export function withStylePropsObserver<P extends StyleProps>(
  fc: FC<Omit<P, keyof StyleProps>>,
): FC<P> {
  return observer(withStyleProps(fc))
}

/**
 * 带上样式属性并 observer + forwardRef
 * @param fc 函数组件
 */
export function withStylePropsOf<P extends StyleProps, T = unknown>(
  fc: ForwardRefRenderFunction<T, Omit<P, keyof StyleProps>>,
): FC<P> {
  return observer(forwardRef(withStyleProps(fc))) as unknown as FC<P>
}
