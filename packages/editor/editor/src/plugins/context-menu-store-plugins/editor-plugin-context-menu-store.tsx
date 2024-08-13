import type { HardAs, LiteralObject, Point, Text } from '@p-lc/shared'
import { zeroPoint } from '@p-lc/shared'
import { once, sortBy } from 'lodash-uni'
import { action, makeObservable, observable } from 'mobx'
import type { Get } from 'type-fest'
import type {
  AnyEditorPlugin,
  Editor,
  EditorDefaultPropertiesExtHkt,
  EditorDefaultPropertiesExtHktPlugin,
  EditorRawPlugin,
} from '../../types'
import { type editorPluginRender } from '../editor-plugin-render'
import { ContextMenu } from './context-menu'

/**
 * 编辑器上下文菜单仓库插件属性扩展高等类型
 */
export interface EditorPluginContextMenuStorePropertiesExtHkt<
  Plugin extends AnyEditorPlugin,
> {
  editor: {
    /**
     * 上下文菜单仓库
     */
    contextMenuStore: {
      /**
       * 上下文菜单实体，由其他插件扩展，只用于类型推导
       */
      contextMenuEntities: LiteralObject
      /**
       * 条目，id -> 条目
       */
      items: Record<string, ContextMenuItem<Plugin>>
      /**
       * 是否可见
       */
      visible: boolean
      /**
       * 展示点
       */
      displayPoint: Point
      /**
       * 已匹配的条目
       */
      matchedItems: ContextMenuItem<Plugin>[]
      /**
       * 当前实体
       */
      currentEntity: ContextMenuEntity<Plugin> | null
      /**
       * 打开
       * @param entity 实体
       * @param point 点
       * @returns 是否成功打开
       */
      open(entity: ContextMenuEntity<Plugin>, point: Point): boolean
      /**
       * 关闭
       * @item 需要执行的条目
       */
      close(item?: ContextMenuItem<Plugin>): void
    }
  }
}

/**
 * 上下文菜单实体基础部分
 */
export interface ContextMenuEntityBase {
  /**
   * 类型
   */
  type: string
}

/**
 * 上下文菜单实体
 */
export type ContextMenuEntities<Plugin extends AnyEditorPlugin> = Get<
  Editor<Plugin>,
  ['contextMenuStore', 'contextMenuEntities']
>

/**
 * 上下文菜单实体
 */
export type ContextMenuEntity<Plugin extends AnyEditorPlugin> = HardAs<
  Get<ContextMenuEntities<Plugin>, [ContextMenuEntityType<Plugin>]>,
  ContextMenuEntityBase
>

/**
 * 上下文菜单实体类型
 */
export type ContextMenuEntityType<Plugin extends AnyEditorPlugin> = HardAs<
  keyof ContextMenuEntities<Plugin>,
  string
>

/**
 * 上下文菜单条目
 */
export interface ContextMenuItem<Plugin extends AnyEditorPlugin> {
  /**
   * 唯一标识
   */
  id: string
  /**
   * 下标，小的在前，默认：Infinity
   */
  index?: number
  /**
   * 标签
   */
  label: Text
  /**
   * 匹配，匹配后才展示
   * @param entity 实体
   * @param ctx 上下文，编辑器
   */
  match(entity: ContextMenuEntity<Plugin>, ctx: Editor<Plugin>): boolean
  /**
   * 操作
   * @param entity 实体
   * @param ctx 上下文，编辑器
   */
  action(entity: ContextMenuEntity<Plugin>, ctx: Editor<Plugin>): void
}

/**
 * EditorPluginContextMenuStorePropertiesExtHkt 辅助类型
 */
export interface $EditorPluginContextMenuStorePropertiesExtHkt
  extends EditorDefaultPropertiesExtHkt {
  type: EditorPluginContextMenuStorePropertiesExtHkt<
    EditorDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 编辑器上下文菜单仓库插件
 */
export const editorPluginContextMenuStore: EditorRawPlugin<
  $EditorPluginContextMenuStorePropertiesExtHkt,
  typeof editorPluginRender
> = {
  id: 'context-menu-store',
  initEditor(ctx) {
    const { render: oldRender } = ctx
    const contextMenuStore = (ctx.contextMenuStore =
      {} as typeof ctx.contextMenuStore)
    contextMenuStore.items = {}
    contextMenuStore.visible = false
    contextMenuStore.displayPoint = zeroPoint
    contextMenuStore.matchedItems = []
    const getSortedItems = once(() =>
      sortBy(contextMenuStore.items, ({ index = Infinity }) => index),
    )
    contextMenuStore.open = action((entity, point) => {
      const matchedItems = getSortedItems().filter((item) =>
        item.match(entity, ctx),
      )
      if (!matchedItems.length) return false
      contextMenuStore.visible = true
      contextMenuStore.displayPoint = point
      contextMenuStore.matchedItems = matchedItems
      contextMenuStore.currentEntity = entity
      return true
    })
    contextMenuStore.close = action((item) => {
      contextMenuStore.visible = false
      if (item) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        item.action(contextMenuStore.currentEntity!, ctx)
      }
    })
    makeObservable(contextMenuStore, {
      visible: observable,
    })
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ctx.render = () => (
      <>
        {oldRender()}
        <ContextMenu />
      </>
    )
  },
}
