import type { EditorPlugin } from '@p-lc/editor'
import {
  CLASS_NAME_LC_POPUP,
  hasCssClass,
  isHtmlElement,
  isVisibleHtmlElement,
} from '@p-lc/shared'
import type { PreviewerMaskItem } from '../../../previewer'
import { type editorPluginPreviewerStoreMask } from '../../../previewer'
import { PopupContainer } from './popup-container'

export * from './popup-container'

/**
 * 编辑器预览器仓库遮罩弹窗容器插件属性扩展
 */
export interface EditorPluginPreviewStoreMaskPopupContainerPropertiesExt {
  editor: {
    /**
     * 预览器仓库
     */
    previewerStore: {
      /**
       * 弹窗容器原生元素
       */
      elPopupContainer: HTMLElement | null
      /**
       * 设置弹窗容器原生元素
       * @param el （弹窗容器）原生元素
       */
      setElPopupContainer(el: HTMLElement | null): void
      /**
       * 有可见的弹窗
       */
      hasVisiblePopup(): boolean
    }
  }
}

/**
 * 预览器遮罩条目：弹窗容器
 */
export const maskItemPopupContainer: PreviewerMaskItem = {
  id: 'pc',
  Component: PopupContainer,
}

/**
 * 编辑器预览器仓库遮罩弹窗容器插件
 */
export const editorPluginPreviewerStoreMaskPopupContainer: EditorPlugin<
  EditorPluginPreviewStoreMaskPopupContainerPropertiesExt,
  typeof editorPluginPreviewerStoreMask
> = {
  id: 'previewer-store-pc',
  initEditor(ctx) {
    const { previewerStore } = ctx
    previewerStore.elPopupContainer = null
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    previewerStore.setElPopupContainer = (el) => {
      previewerStore.elPopupContainer = el
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    previewerStore.hasVisiblePopup = () => {
      const { elPopupContainer } = previewerStore
      if (elPopupContainer) {
        for (const el of elPopupContainer.children) {
          if (
            isHtmlElement(el) &&
            hasCssClass(el, CLASS_NAME_LC_POPUP) &&
            isVisibleHtmlElement(el)
          ) {
            return true
          }
        }
      }
      return false
    }
    previewerStore.maskItems[maskItemPopupContainer.id] = maskItemPopupContainer
  },
}
