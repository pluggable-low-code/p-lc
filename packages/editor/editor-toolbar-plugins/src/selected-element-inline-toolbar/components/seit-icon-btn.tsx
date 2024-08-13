import { Tooltip } from 'antd'
import type { ComponentProps, FC, ReactNode } from 'react'
import { memo } from 'react'
import styled from 'styled-components'

/**
 * 选中元素内联工具栏图标按钮属性
 */
export interface SeitIconBtnProps
  extends ComponentProps<typeof InternalSeitIconBtn> {
  /**
   * 提示
   */
  tip: ReactNode
}

/**
 * 选中元素内联工具栏图标按钮
 */
export const SeitIconBtn: FC<SeitIconBtnProps> = memo(
  ({ tip, ...restProps }) => {
    return (
      <Tooltip title={tip}>
        <InternalSeitIconBtn {...restProps} />
      </Tooltip>
    )
  },
)

/**
 * 内部：选中元素内联工具栏图标按钮
 */
export const InternalSeitIconBtn = styled.div`
  font-size: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
`
