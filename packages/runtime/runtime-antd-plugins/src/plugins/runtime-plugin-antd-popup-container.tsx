import type {
  ReactRuntimePlugin,
  RuntimeReactRendererHocItem,
} from '@p-lc/react-runtime'
import type { DepPluginUniteRuntimePlugin, RuntimePlugin } from '@p-lc/runtime'
import type { LiteralObject } from '@p-lc/shared'
import { ConfigProvider } from 'antd'
import { forwardRef, memo } from 'react'
import { createGlobalStyle } from 'styled-components'

/**
 * antd 弹窗容器全局样式
 */
export const AntdPopupContainerGlobalStyle = createGlobalStyle`
  .lc-popup-container {
    .ant-modal-root, .ant-popover, .ant-select-dropdown {
      pointer-events: auto;
    }

    .ant-modal-mask, .ant-modal-wrap, .ant-drawer {
      position: absolute;
    }
  }

`

/**
 * antd 弹窗容器高阶组件条目
 */
export const antdPopupContainerHocItem: RuntimeReactRendererHocItem<
  DepPluginUniteRuntimePlugin<typeof runtimePluginAntdPopupContainer>
> = {
  id: 'antd-pc',
  index: 860,
  hoc(C) {
    return memo(
      forwardRef((props, ref) => {
        const { __ctx__: ctx } = props
        const { getPopupContainer } = ctx
        return (
          <ConfigProvider getPopupContainer={getPopupContainer}>
            <C {...props} ref={ref} />
            <AntdPopupContainerGlobalStyle />
          </ConfigProvider>
        )
      }),
    )
  },
}

/**
 * 运行时 antd 弹窗容器插件
 */
export const runtimePluginAntdPopupContainer: RuntimePlugin<
  LiteralObject,
  ReactRuntimePlugin
> = {
  id: 'antd-pc',
  initRuntime(ctx) {
    ctx.rendererHocs.runtime[antdPopupContainerHocItem.id] =
      antdPopupContainerHocItem
  },
}
