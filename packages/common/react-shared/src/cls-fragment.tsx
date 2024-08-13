import type { ReactNode } from 'react'
import { Component } from 'react'

/**
 * 基于类组件实现的 Fragment 属性
 */
export interface ClsFragmentProps {
  children: ReactNode
}

/**
 * 基于类组件实现的 Fragment，可以用来查找 DOM 元素
 */
export class ClsFragment extends Component<ClsFragmentProps> {
  public render(): ReactNode {
    return this.props.children
  }
}
