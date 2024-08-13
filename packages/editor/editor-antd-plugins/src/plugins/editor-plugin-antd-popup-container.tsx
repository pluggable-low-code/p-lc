import type { EditorPlugin } from '@p-lc/editor'
import { editorPluginRootHost } from '@p-lc/editor'
import { POSITION_TYPE_BEFORE } from '@p-lc/shared'
import { ConfigProvider } from 'antd'

/**
 * 编辑器 antd 弹窗容器插件
 */
export const editorPluginAntdPopupContainer: EditorPlugin = {
  id: 'antd-popup-container',
  position: {
    type: POSITION_TYPE_BEFORE,
    target: editorPluginRootHost,
  },
  initEditor(ctx) {
    const { render: oldRender } = ctx
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ctx.render = () => {
      return (
        <ConfigProvider getPopupContainer={getPopupContainer}>
          {oldRender()}
        </ConfigProvider>
      )
    }

    function getPopupContainer(): HTMLElement {
      return ctx.elRoot || document.body
    }
  },
}
