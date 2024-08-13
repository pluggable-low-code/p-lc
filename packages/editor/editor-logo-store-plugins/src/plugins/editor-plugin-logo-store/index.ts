import type { EditorPlugin } from '@p-lc/editor'
import type { Text } from '@p-lc/shared'
import type { FC, ReactElement } from 'react'
import { LogoIcon, LogoTitle } from './components'

export * from './components'

/**
 * 编辑器标识仓库插件属性扩展
 */
export interface EditorPluginLogoStorePropertiesExt {
  editor: {
    /**
     * 标识仓库
     */
    logoStore: {
      /**
       * 组件
       */
      components: LogoComponents
      /**
       * 图标（URL）
       */
      icon?: string | ReactElement
      /**
       * 图标链接
       */
      iconLink?: string
      /**
       * 标题
       */
      title?: Text
      /**
       * 标题链接
       */
      titleLink?: string
    }
  }
}

/**
 * 标识组件
 */
export interface LogoComponents {
  /**
   * 图标
   */
  Icon: FC | null
  /**
   * 标题
   */
  Title: FC | null
}

/**
 * 编辑器标识仓库插件
 */
export const editorPluginLogoStore: EditorPlugin<EditorPluginLogoStorePropertiesExt> =
  {
    id: 'logo-store',
    initEditor(ctx) {
      const logoStore = (ctx.logoStore = {} as typeof ctx.logoStore)
      logoStore.components = {
        Icon: LogoIcon,
        Title: LogoTitle,
      }
    },
  }
