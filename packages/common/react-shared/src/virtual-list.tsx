import List, { type ListProps, type ListRef } from 'rc-virtual-list'
import { type ReactElement, type Ref } from 'react'
import { useSize } from 'react-use'
import styled from 'styled-components'
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
    const [sized] = useSize(
      ({ height }) => (
        <InternalVirtualListContainer ref={ref}>
          <List {...restProps} height={height} ref={refList} />
        </InternalVirtualListContainer>
      ),
      { height: 1 },
    )
    return sized
  },
) as <T = unknown>(props: VirtualListProps<T>) => ReactElement

/**
 * 内部：虚拟列表容器
 */
export const InternalVirtualListContainer = styled.div`
  height: 100%;
`
