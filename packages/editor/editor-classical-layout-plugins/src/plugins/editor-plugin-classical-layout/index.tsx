import type { EditorPlugin } from '@p-lc/editor'
import { editorPluginLayoutStore } from '@p-lc/editor'
import { ClassicalLayout } from './components'
import { classicalLayoutCssVars } from './css-vars'
import type { ClassicalLayoutConfig, ClassicalLayoutState } from './types'

export * from './components'
export * from './css-vars'
export * from './types'

/**
 * 编辑器经典布局插件属性扩展
 */
export interface EditorPluginClassicalLayoutPropertiesExt {
  editor: {
    /**
     * 布局仓库
     */
    layoutStore: {
      /**
       * 配置
       */
      config: ClassicalLayoutConfig
      /**
       * 状态
       */
      state: ClassicalLayoutState
      /**
       * 设置左部宽度
       * @param width 宽度
       */
      setLeftWidth: (width: number | string) => void
      /**
       * 设置右部宽度
       * @param width 宽度
       */
      setRightWidth: (width: number | string) => void
      /**
       * 设置左部激活的条目 ID
       * @param leftActiveItemId 左部激活的条目 ID
       */
      setLeftActiveItemId: (leftActiveItemId?: string) => void
    }
  }
  editorInitOptions: {
    /**
     * 布局（配置）
     */
    layout?: ClassicalLayoutConfig
  }
}

/**
 * 编辑器经典布局插件
 */
export const editorPluginClassicalLayout: EditorPlugin<EditorPluginClassicalLayoutPropertiesExt> =
  {
    id: 'classical-layout',
    // 在 editorPluginLayoutStoreInit 之前，确保不会覆盖保存的状态
    position: {
      target: editorPluginLayoutStore,
    },
    initEditor(ctx) {
      const { styleStore } = ctx
      styleStore.setCssVars(classicalLayoutCssVars)
      const layoutStore = ctx.layoutStore
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      layoutStore.render = () => {
        const Component = layoutStore.config.Component || ClassicalLayout
        return <Component />
      }
      layoutStore.setState(
        {
          leftWidth: layoutStore.config.left?.width || 384,
          rightWidth: layoutStore.config.right?.width || 384,
        },
        false,
      )
      layoutStore.setLeftWidth = ((width) => {
        layoutStore.setState({
          leftWidth: width,
        })
      }) as typeof layoutStore.setLeftWidth
      layoutStore.setRightWidth = ((width) => {
        layoutStore.setState({
          rightWidth: width,
        })
      }) as typeof layoutStore.setRightWidth
      layoutStore.setLeftActiveItemId = ((leftActiveItemId) => {
        layoutStore.setState({
          leftActiveItemId,
        })
      }) as typeof layoutStore.setLeftActiveItemId
    },
  }
