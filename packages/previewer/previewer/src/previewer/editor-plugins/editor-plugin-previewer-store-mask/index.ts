import type { EditorPlugin } from '@p-lc/editor'
import type { FC } from 'react'

export * from './previewer-mask'

/**
 * 编辑器预览器仓库遮罩插件属性扩展
 */
export interface EditorPluginPreviewStoreMaskPropertiesExt {
  editor: {
    /**
     * 预览器仓库
     */
    previewerStore: {
      /**
       * 遮罩原生元素
       */
      maskEl: HTMLElement | null
      /**
       * 设置遮罩原生元素
       * @param maskEl 遮罩原生元素
       */
      setMaskEl: (maskEl: HTMLElement | null) => void
      /**
       * 遮罩条目，id -> 条目
       */
      maskItems: Record<string, PreviewerMaskItem>
    }
  }
}

/**
 *  预览器遮罩条目
 */
export interface PreviewerMaskItem {
  /**
   * 唯一标识
   */
  id: string
  /**
   * 组件
   */
  Component: FC
}

/**
 * 编辑器预览器仓库遮罩插件
 */
export const editorPluginPreviewerStoreMask: EditorPlugin<EditorPluginPreviewStoreMaskPropertiesExt> =
  {
    id: 'previewer-store-mask',
    initEditor(ctx) {
      const { previewerStore } = ctx
      previewerStore.maskEl = null
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      previewerStore.setMaskEl = (maskEl) => {
        previewerStore.maskEl = maskEl
      }
      previewerStore.maskItems = {}
    },
  }
