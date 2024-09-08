import { useLatestFn } from '@p-lc/react-shared'
import { Menu, type MenuProps } from 'antd'
import { memo, useMemo, type FC, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Nav } from './nav'

/**
 * 文档布局属性
 */
export interface DocsLayoutProps {
  children: ReactNode
}

/**
 * 菜单条目
 */
const menuItems: Required<MenuProps>['items'] = [
  {
    key: 'get-started',
    label: 'Get started',
    children: [{ key: '/docs/quick-start', label: 'Quick start' }],
  },
  {
    key: 'plugin',
    label: 'Plugin',
    children: [
      { key: '/docs/runtime-plugin', label: 'Runtime plugin' },
      { key: '/docs/editor-plugin', label: 'Editor plugin' },
      {
        key: '/docs/built-in-runtime-plugin',
        label: 'Built-in runtime plugins (In progress)',
        disabled: true,
      },
      {
        key: '/docs/built-in-editor-plugin',
        label: 'Built-in editor plugins (In progress)',
        disabled: true,
      },
    ],
  },
  {
    key: 'suits',
    label: 'Suits (In progress)',
    disabled: true,
  },
]

/**
 * 菜单默认打开的键值
 */
const menuDefaultOpenKeys = ['get-started', 'plugin']

/**
 * 文档布局
 */
export const DocsLayout: FC<DocsLayoutProps> = memo(({ children }) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const selectedKeys = useMemo(() => [pathname], [pathname])
  const handleMenuClick = useLatestFn(
    ({ key }: { key: string; keyPath: string[] }) => {
      navigate(key)
    },
  )
  return (
    <InternalDocsLayoutContainer>
      <Nav titleOpen className="nav" />
      <div className="wrapper">
        <div className="sider">
          <Menu
            onClick={handleMenuClick}
            defaultOpenKeys={menuDefaultOpenKeys}
            selectedKeys={selectedKeys}
            mode="inline"
            items={menuItems}
          />
        </div>
        <div className="content">
          <InternalMarkdownWrapper>{children}</InternalMarkdownWrapper>
        </div>
      </div>
    </InternalDocsLayoutContainer>
  )
})

/**
 * 内部：文档布局容器
 */
export const InternalDocsLayoutContainer = styled.div`
  height: 100%;

  .nav {
    background: #fff;
  }

  .wrapper {
    height: 100%;
    display: flex;
    padding-top: 64px;
  }

  .sider {
    flex: none;
    width: 350px;
    overflow: auto;
  }

  .content {
    flex: auto;
    padding: 0 32px;
    overflow: auto;
  }
`

// TODO: 高亮文档里的代码

/**
 * 内部：Markdown 包装
 */
export const InternalMarkdownWrapper = styled.div`
  font-size: 18px;

  .block,
  .frame,
  blockquote,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  label,
  ol,
  p,
  pre,
  table,
  ul {
    margin-block: calc(1em + 1ex);
  }

  h1,
  h2 {
    font-size: 2.5em;
    line-height: calc(1em + 0.4ex);
    margin-block: calc(0.4em + 0.4ex);
  }

  h3 {
    font-size: 2em;
    line-height: calc(1em + 0.66667ex);
    margin-block: calc(0.66667em + 0.66667ex);
  }

  h4 {
    font-size: 1.25em;
    line-height: calc(1em + 0.8ex);
    margin-block: calc(0.8em + 0.8ex);
  }

  h5,
  h6 {
    font-size: 1em;
    line-height: calc(1em + 1ex);
    margin-block: calc(1em + 1ex);
  }

  h2 {
    font-size: 2em;
  }

  h3 {
    font-size: 1.6em;
  }

  a[name],
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    display: block;
    scroll-margin-block-start: 6rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong,
  th {
    font-weight: 700;
    letter-spacing: 0.0125em;
  }

  pre {
    word-wrap: normal;
    font-size: inherit;
    overflow: auto;
  }

  blockquote pre,
  li pre {
    margin-inline: 0;
  }

  code {
    background-color: #f6f8fa;
    border-radius: 3px;
    padding-block: 0.4125ex;
    padding-inline: 0.825ex;
  }

  pre code {
    display: block;
    overflow-x: auto;
    padding: calc(1em + 1ex) !important;
    white-space: pre;
    word-break: normal;
    word-wrap: normal;
    --squircle-radius: 10px;
    border-radius: 10px;
  }

  code,
  kbd,
  pre {
    font-feature-settings: normal;
    font-size: smaller;
    line-height: calc(1em + 1.25ex);
  }

  pre code {
    background-color: #fafafa !important;
  }

  code {
    background-color: #f6f8fa;
    border-radius: 3px;
    padding-block: 0.4125ex;
    padding-inline: 0.825ex;
  }

  img,
  svg {
    background-color: transparent;
    max-width: 100%;
  }

  img[align='right'] {
    padding-inline-start: calc(1em + 1ex);
  }

  img[align='left'] {
    padding-inline-end: calc(1em + 1ex);
  }
`
