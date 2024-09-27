import List, { type ListProps, type ListRef } from 'rc-virtual-list'
import { useState, type ReactElement, type Ref } from 'react'
import styled from 'styled-components'
import { useComposeRef } from './rc-util'
import { withStylePropsMf } from './style'

/**
 * 虚拟列表属性
 */
export interface VirtualListProps<T = unknown> extends ListProps<T> {
  /**
   * 列表 ref
   */
  refList?: Ref<ListRef>
}

/**
 * 虚拟列表
 */
export const VirtualList = withStylePropsMf<VirtualListProps, HTMLDivElement>(
  ({ refList, ...restProps }, ref) => {
    const [listHeight, setListHeight] = useState(1)
    const finalRef = useComposeRef(ref, (el) => {
      if (el) setListHeight(el.offsetHeight)
    })
    return (
      <InternalVirtualListContainer ref={finalRef}>
        <List {...restProps} height={listHeight} ref={refList} />
      </InternalVirtualListContainer>
    )
  },
) as <T = unknown>(props: VirtualListProps<T>) => ReactElement

/**
 * 内部：虚拟列表容器
 */
export const InternalVirtualListContainer = styled.div`
  height: 100%;
`
