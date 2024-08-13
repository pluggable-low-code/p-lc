import type { EditorPlugin } from '@p-lc/editor'
import type { Text } from '@p-lc/shared'
import { assign } from 'lodash-uni'
import type { ReactElement } from 'react'
import type { LogoComponents } from './editor-plugin-logo-store'
import { type editorPluginLogoStore } from './editor-plugin-logo-store'

/**
 * 编辑器标识仓库初始化插件属性扩展
 */
export interface EditorPluginLogoStoreInitPropertiesExt {
  editorInitOptions: {
    logo?: {
      /**
       * 组件
       */
      components?: Partial<LogoComponents>
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
 * 编辑器标识仓库初始化插件
 */
export const editorPluginLogoStoreInit: EditorPlugin<
  EditorPluginLogoStoreInitPropertiesExt,
  typeof editorPluginLogoStore
> = {
  id: 'logo-store-init',
  initEditor(ctx) {
    const {
      logoStore,
      initOptions: { logo: { components, ...restLogo } = {} },
    } = ctx
    assign(logoStore.components, components)
    assign(logoStore, restLogo)
  },
}
