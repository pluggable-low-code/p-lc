import type { EditorPlugin } from '@p-lc/editor'
import type { Disposer, Rectangle } from '@p-lc/shared'
import {
  createNegativePoint,
  createRectangleByHtmlElement,
  createRectangleByTranslate,
  createRectangleByZoom,
} from '@p-lc/shared'
import { makeObservable, observable, reaction, runInAction } from 'mobx'
import type { FC } from 'react'
import type { PreviewerMaskItem } from '../editor-plugin-previewer-store-mask'
import { type editorPluginPreviewerStoreMask } from '../editor-plugin-previewer-store-mask'
import { type editorPluginPreviewerStorePosition } from '../editor-plugin-previewer-store-position'
import { type editorPluginPreviewerStoreResize } from '../editor-plugin-previewer-store-resize'
import {
  EDITOR_EVENT_KEY_RUNTIME_VIEW_EFFECT,
  type editorPluginPreviewerStoreViewEffect,
} from '../editor-plugin-previewer-store-view-effect'
import { PreviewerMaskSeb } from './previewer-mask-seb'

export * from './previewer-mask-seb'

/**
 * 编辑器预览器仓库遮罩选择插件属性扩展
 */
export interface EditorPluginPreviewStoreMaskSelectPropertiesExt {
  editor: {
    /**
     * 元素属性仓库，由其他插件实现
     */
    seitStore?: {
      /**
       * 组件
       */
      Component?: FC
    }
    /**
     * 预览器仓库
     */
    previewerStore: {
      /**
       * 选中的元素边界
       */
      selectedElementBounding: Rectangle | null
      /**
       * 选中的元素边界宽度
       */
      sebWidth: number
      /**
       * 同步选中的元素边界
       */
      syncSeb(): void
    }
  }
}

/**
 * 预览器遮罩条目：选中的元素边界
 */
export const maskItemSeb: PreviewerMaskItem = {
  id: 'seb',
  Component: PreviewerMaskSeb,
}

/**
 * 编辑器预览器仓库遮罩选择插件
 */
export const editorPluginPreviewerStoreMaskSelect: EditorPlugin<
  EditorPluginPreviewStoreMaskSelectPropertiesExt,
  | typeof editorPluginPreviewerStoreMask
  | typeof editorPluginPreviewerStoreViewEffect
  | typeof editorPluginPreviewerStorePosition
  | typeof editorPluginPreviewerStoreResize
> = {
  id: 'previewer-store-ms',
  initEditor(ctx) {
    const { previewerStore, emitter, elementStore } = ctx
    previewerStore.selectedElementBounding = null
    previewerStore.sebWidth = 1
    previewerStore.syncSeb = syncSelectedElementBounding
    makeObservable(previewerStore, {
      selectedElementBounding: observable.ref,
    })
    previewerStore.maskItems[maskItemSeb.id] = maskItemSeb
    emitter.on(
      EDITOR_EVENT_KEY_RUNTIME_VIEW_EFFECT,
      syncSelectedElementBounding,
    )
    const selectedElementIdReactionDisposer = reaction(
      () => elementStore.selectedElementId,
      syncSelectedElementBounding,
    )
    let onElementResizeIdAndDisposer: [string, Disposer] | null = null
    return () => {
      selectedElementIdReactionDisposer()
      onElementResizeIdAndDisposer?.[1]()
    }

    function syncSelectedElementBounding(): void {
      const { selectedElementId } = elementStore
      const { maskEl } = previewerStore
      observeElement(selectedElementId)
      if (!selectedElementId || !maskEl) return
      const elPos =
        previewerStore.positionCall.elementPositionFromId(selectedElementId)
      runInAction(() => {
        previewerStore.selectedElementBounding =
          elPos &&
          createRectangleByTranslate(
            createRectangleByZoom(elPos.bounding, previewerStore.sebWidth),
            createNegativePoint(createRectangleByHtmlElement(maskEl).s),
          )
      })
    }

    function observeElement(selectedElementId: string | null): void {
      if (
        (onElementResizeIdAndDisposer &&
          onElementResizeIdAndDisposer[0] === selectedElementId) ||
        onElementResizeIdAndDisposer === selectedElementId
      ) {
        return
      }
      onElementResizeIdAndDisposer?.[1]()
      if (selectedElementId) {
        onElementResizeIdAndDisposer = [
          selectedElementId,
          previewerStore.onElementResize(
            selectedElementId,
            syncSelectedElementBounding,
          ),
        ]
      } else {
        onElementResizeIdAndDisposer = null
      }
    }
  },
}
