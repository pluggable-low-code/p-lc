import type { FC } from 'react'
import type {
  AnyEditorPlugin,
  EditorDefaultPropertiesExtHkt,
  EditorDefaultPropertiesExtHktPlugin,
  EditorRawPlugin,
} from '../../types'
import { type editorPluginRender } from '../editor-plugin-render'
import { DndMask } from './components'
import type {
  DraggableEntity,
  DraggableEntityType,
  DroppablePosition,
  DroppablePositionType,
} from './editor-plugin-dnd-store'

/**
 * 编辑器拖放仓库遮罩插件属性扩展高等类型
 */
export interface EditorPluginDndStoreMaskPropertiesExtHkt<
  Plugin extends AnyEditorPlugin,
> {
  editor: {
    /**
     * 拖放仓库
     */
    dndStore: {
      /**
       * 可拖拽的实体渲染器映射表
       */
      draggableEntityRendererMap: Map<
        DraggableEntityType<Plugin>,
        DraggableEntityRenderer<Plugin>
      >
      /**
       * 可放置位置渲染器映射表
       */
      droppablePositionRendererMap: Map<
        DroppablePositionType<Plugin>,
        DroppablePositionRenderer<Plugin>
      >
    }
  }
}

/**
 * 可拖拽实体渲染器
 */
export type DraggableEntityRenderer<Plugin extends AnyEditorPlugin> = FC<
  DraggableEntity<Plugin>
>

/**
 * 可放置位置渲染器
 */
export type DroppablePositionRenderer<Plugin extends AnyEditorPlugin> = FC<
  DroppablePosition<Plugin>
>

/**
 * EditorPluginDndStoreMaskPropertiesExtHkt 辅助类型
 */
export interface $EditorPluginDndStoreMaskPropertiesExtHkt
  extends EditorDefaultPropertiesExtHkt {
  type: EditorPluginDndStoreMaskPropertiesExtHkt<
    EditorDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 编辑器拖放仓库遮罩插件
 */
export const editorPluginDndStoreMask: EditorRawPlugin<
  $EditorPluginDndStoreMaskPropertiesExtHkt,
  typeof editorPluginRender
> = {
  id: 'dnd-store-mask',
  initEditor(ctx) {
    const { dndStore, render: oldRender } = ctx
    dndStore.draggableEntityRendererMap = new Map()
    dndStore.droppablePositionRendererMap = new Map()
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ctx.render = () => (
      <>
        {oldRender()}
        <DndMask />
      </>
    )
  },
}
