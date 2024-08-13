import { withStylePropsMemo, type StyleProps } from '@p-lc/react-shared'
import { Flower, Github } from 'iconoir-react'
import type { FC } from 'react'
import styled from 'styled-components'
import { URL_P_LC_GITHUB } from '../constants'
import { OpenLinkBtn } from './open-link'

/**
 * 导航属性
 */
export interface NavProps extends StyleProps {
  /**
   * 标题打开
   */
  titleOpen?: boolean
  /**
   * 展示文档，默认为 true
   */
  docs?: boolean
}

/**
 * 导航
 */
export const Nav: FC<NavProps> = withStylePropsMemo(({ titleOpen, docs }) => {
  const TitleContent = (
    <>
      <Flower />
      <h1>p-lc</h1>
    </>
  )
  return (
    <InternalNav>
      {titleOpen ? (
        <OpenLinkBtn to="/" className="left">
          {TitleContent}
        </OpenLinkBtn>
      ) : (
        <div className="left">{TitleContent}</div>
      )}
      <div className="right">
        {docs && (
          <OpenLinkBtn className="item" to="/docs/quick-start">
            Docs
          </OpenLinkBtn>
        )}
        <OpenLinkBtn className="item" to={URL_P_LC_GITHUB}>
          <Github />
        </OpenLinkBtn>
      </div>
    </InternalNav>
  )
})

/**
 * 内部：导航
 */
export const InternalNav = styled.nav`
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 9;
  background: #000;
  height: 64px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left {
    display: flex;
    align-items: center;

    > h1 {
      margin-left: 12px;
    }
  }

  .right {
    display: flex;
    align-items: center;

    .item {
      margin-left: 12px;
    }
  }
`
