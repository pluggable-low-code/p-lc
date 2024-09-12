import type { EditorPlugin } from '@p-lc/editor'
import type { Disposer, Rectangle } from '@p-lc/shared'
import {
  createNegativePoint,
  createRectangleByHtmlElement,
  createRectangleByTranslate,
  createRectangleByZoom,
} from '@p-lc/shared'
import { isNull } from 'lodash-uni'
import { makeObservable, observable, reaction, runInAction } from 'mobx'
import type { editorPluginPreviewerStoreHover } from '../editor-plugin-previewer-store-hover'
import type { PreviewerMaskItem } from '../editor-plugin-previewer-store-mask'
import { type editorPluginPreviewerStoreMask } from '../editor-plugin-previewer-store-mask'
import { type editorPluginPreviewerStorePosition } from '../editor-plugin-previewer-store-position'
import { type editorPluginPreviewerStoreResize } from '../editor-plugin-previewer-store-resize'
import { PreviewerMaskHeb } from './previewer-mask-heb'

export * from './previewer-mask-heb'

/**
 * 编辑器预览器仓库遮罩悬浮插件属性扩展
 */
export interface EditorPluginPreviewStoreMaskHoverPropertiesExt {
  editor: {
    /**
     * 预览器仓库
     */
    previewerStore: {
      /**
       * 悬浮的元素边界
       */
      hoveredElementBounding: Rectangle | null
      /**
       * 悬浮的元素边界宽度
       */
      hebWidth: number
      /**
       * 同步悬浮的元素边界
       */
      syncHeb(): void
    }
  }
}

/**
 * 预览器遮罩条目：悬浮的元素边界
 */
export const maskItemHeb: PreviewerMaskItem = {
  id: 'heb',
  Component: PreviewerMaskHeb,
}

/**
 * 编辑器预览器仓库遮罩悬浮插件
 */
export const editorPluginPreviewerStoreMaskHover: EditorPlugin<
  EditorPluginPreviewStoreMaskHoverPropertiesExt,
  | typeof editorPluginPreviewerStoreMask
  | typeof editorPluginPreviewerStorePosition
  | typeof editorPluginPreviewerStoreResize
  | typeof editorPluginPreviewerStoreHover
> = {
  id: 'previewer-store-mh',
  initEditor(ctx) {
    const { previewerStore, elementStore } = ctx
    previewerStore.hoveredElementBounding = null
    previewerStore.hebWidth = 1
    previewerStore.syncHeb = syncHoveredElementBounding
    makeObservable(previewerStore, {
      hoveredElementBounding: observable.ref,
    })
    previewerStore.maskItems[maskItemHeb.id] = maskItemHeb
    const hoveredElementIdReactionDisposer = reaction(
      () => [previewerStore.hoveredElementId, elementStore.selectedElementId],
      syncHoveredElementBounding,
    )
    let onElementResizeIdAndDisposer: [string, Disposer] | null = null
    return () => {
      hoveredElementIdReactionDisposer()
      onElementResizeIdAndDisposer?.[1]()
    }

    function syncHoveredElementBounding(): void {
      const { maskEl } = previewerStore
      let { hoveredElementId } = previewerStore
      const { selectedElementId } = elementStore
      if (hoveredElementId === selectedElementId) {
        hoveredElementId = null
      }
      observeElement(hoveredElementId)
      if (!maskEl) return
      const elPos = isNull(hoveredElementId)
        ? hoveredElementId
        : previewerStore.positionCall.elementPositionFromId(hoveredElementId)
      runInAction(() => {
        previewerStore.hoveredElementBounding =
          elPos &&
          createRectangleByTranslate(
            createRectangleByZoom(elPos.bounding, previewerStore.hebWidth),
            createNegativePoint(createRectangleByHtmlElement(maskEl).s),
          )
      })
    }

    function observeElement(hoveredElementId: string | null): void {
      if (
        (onElementResizeIdAndDisposer &&
          onElementResizeIdAndDisposer[0] === hoveredElementId) ||
        onElementResizeIdAndDisposer === hoveredElementId
      ) {
        return
      }
      onElementResizeIdAndDisposer?.[1]()
      if (hoveredElementId) {
        onElementResizeIdAndDisposer = [
          hoveredElementId,
          previewerStore.onElementResize(
            hoveredElementId,
            syncHoveredElementBounding,
          ),
        ]
      } else {
        onElementResizeIdAndDisposer = null
      }
    }
  },
}
