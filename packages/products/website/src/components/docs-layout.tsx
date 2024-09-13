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
        <div className="content">{children}</div>
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
