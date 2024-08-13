import {
  useLatestFn,
  withStylePropsMemo,
  type StyleProps,
} from '@p-lc/react-shared'
import { type FC, type ReactNode } from 'react'
import styled, { css } from 'styled-components'

/**
 * 卡片属性
 */
export interface CardProps extends StyleProps {
  /**
   * 图标
   */
  icon: ReactNode
  /**
   * 标题
   */
  title: string
  /**
   * 内容
   */
  content?: string
  /**
   * 跳转链接
   */
  to?: string
}

/**
 * 卡片
 */
export const Card: FC<CardProps> = withStylePropsMemo(
  ({ icon, title, content, to }) => {
    const handleClick = useLatestFn(() => {
      if (to) open(to)
    })
    return (
      <InternalCardContainer to={to} onClick={handleClick}>
        <div className="title">
          {icon}
          <h2>{title}</h2>
        </div>
        {content && <div className="content">{content}</div>}
      </InternalCardContainer>
    )
  },
)

/**
 * 内部：卡片容器
 */
export const InternalCardContainer = styled.div<{
  /**
   * 跳转链接
   */
  to?: string
}>`
  border: 1px solid rgb(156, 163, 175);
  border-radius: 12px;
  padding: 12px;
  background: rgba(0, 0, 0, 0.3);
  ${
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ({ to }) =>
      to &&
      css`
        cursor: pointer;

        &:hover {
          border-color: #4096ff;
          color: #4096ff;

          .content {
            color: #4096ff;
          }
        }
      `
  }

  .title {
    display: flex;
    align-items: center;

    > h2 {
      margin: 0 0 0 12px;
    }
  }

  .content {
    margin-top: 12px;
    color: rgb(206, 211, 218);
  }
`
