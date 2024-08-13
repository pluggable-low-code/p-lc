import type { EditorPlugin } from '@p-lc/editor'
import type { EchoFn, Point } from '@p-lc/shared'
import {
  createRectangleByPointTransform,
  defineLazyInitProperty,
  echo,
} from '@p-lc/shared'
import type { ElementPosition, PositionRuntimeApis } from '../runtime-plugins'
import { type editorPluginPreviewerStore } from './editor-plugin-previewer-store'

/**
 * 编辑器预览器仓库位置插件属性扩展
 */
export interface EditorPluginPreviewerStorePositionPropertiesExt {
  editor: {
    /**
     * 预览器仓库
     */
    previewerStore: {
      /**
       * 运行时调用
       */
      runtimeCall: PositionRuntimeApis
      /**
       * 点转换到运行时
       */
      pointTransformToRuntime: EchoFn<Point>
      /**
       * 点转换从运行时
       */
      pointTransformFromRuntime: EchoFn<Point>
      /**
       * 位置（相关运行时）调用
       */
      positionCall: PositionRuntimeApis
    }
  }
}

/**
 * 编辑器预览器仓库位置插件
 */
export const editorPluginPreviewerStorePosition: EditorPlugin<
  EditorPluginPreviewerStorePositionPropertiesExt,
  typeof editorPluginPreviewerStore
> = {
  id: 'preview-store-position',
  initEditor(ctx) {
    const { previewerStore } = ctx
    previewerStore.pointTransformToRuntime =
      previewerStore.pointTransformFromRuntime = echo
    defineLazyInitProperty(previewerStore, 'positionCall', () => {
      return {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        elementPositionFromPoint(p) {
          return positionFromRuntime(
            previewerStore.runtimeCall.elementPositionFromPoint(
              previewerStore.pointTransformToRuntime(p),
            ),
          )
        },
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        elementPositionFromId(...args) {
          return positionFromRuntime(
            previewerStore.runtimeCall.elementPositionFromId(...args),
          )
        },
      }
    })

    function positionFromRuntime(
      pos: ElementPosition | null,
    ): ElementPosition | null {
      if (!pos) return pos
      const { pointTransformFromRuntime } = previewerStore
      pos = {
        ...pos,
        bounding: createRectangleByPointTransform(
          pos.bounding,
          pointTransformFromRuntime,
        ),
      }
      const { slotPos } = pos
      if (slotPos) {
        pos.slotPos = {
          ...slotPos,
          bounding: createRectangleByPointTransform(
            slotPos.bounding,
            pointTransformFromRuntime,
          ),
        }
      }
      return pos
    }
  },
}
