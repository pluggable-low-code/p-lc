import { StrictMode, type FC } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createHashRouter,
  RouterProvider,
  type LazyRouteFunction,
  type RouteObject,
} from 'react-router-dom'

/**
 * 懒加载页面
 * @param importFn 导入函数
 */
function lazyLoadPage(
  importFn: () => Promise<{ default: FC }>,
): LazyRouteFunction<RouteObject> {
  return async () => ({
    Component: (await importFn()).default,
  })
}

/**
 * 路由
 */
const router = createHashRouter([
  {
    path: '/',
    lazy: lazyLoadPage(() => import('./pages/page-home')),
  },
  {
    path: '/demo/antd-todo',
    lazy: lazyLoadPage(() => import('./pages/demos/page-demo-antd-todo')),
  },
  {
    path: '/demo/rav',
    lazy: lazyLoadPage(() => import('./pages/demos/page-demo-rav')),
  },
  {
    path: '/demo/lc-types',
    lazy: lazyLoadPage(() => import('./pages/demos/page-demo-lc-types')),
  },
  {
    path: '/docs/quick-start',
    lazy: lazyLoadPage(() => import('./pages/docs/page-docs-quick-start')),
  },
  {
    path: '/docs/runtime-plugin',
    lazy: lazyLoadPage(() => import('./pages/docs/page-docs-runtime-plugin')),
  },
  {
    path: '/docs/editor-plugin',
    lazy: lazyLoadPage(() => import('./pages/docs/page-docs-editor-plugin')),
  },
])

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
