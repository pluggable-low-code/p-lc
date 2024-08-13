import type {
  AnyEditorPlugin,
  Editor,
  EditorDefaultPropertiesExtHkt,
  EditorDefaultPropertiesExtHktPlugin,
  EditorPlugin,
  UidlStoreUidlElement,
} from '@p-lc/editor'
import { definePropertyByGetter, mapGroupBy } from '@p-lc/shared'
import { sortBy, values } from 'lodash-uni'
import { computed, makeObservable } from 'mobx'
import type { FC } from 'react'
import type { SeitEditorPlugin } from '../../types'
import { Seit } from './seit'

export * from './seit'

/**
 * 编辑器选中元素内联工具栏仓库插件属性扩展高等类型
 */
export interface EditorPluginSeitStorePropertiesExtHkt<
  Plugin extends AnyEditorPlugin,
> {
  editor: {
    /**
     * 选中元素内联工具栏仓库
     */
    seitStore: {
      /**
       * 组件
       */
      Component: FC
      /**
       * 条目，id -> 条目
       */
      items: Record<string, SeitItem<Plugin>>
      /**
       * 已分组的条目
       */
      groupedItems: [number, SeitItem<Plugin>[]][]
    }
  }
}

/**
 * 选中元素内联工具栏条目
 */
export interface SeitItem<Plugin extends AnyEditorPlugin = SeitEditorPlugin> {
  /**
   * 唯一标识
   */
  id: string
  /**
   * 组下标，小的在前，默认：Infinity
   */
  groupIndex?: number
  /**
   * 下标，小的在前，默认：Infinity
   */
  index?: number
  /**
   * 组件
   */
  Component: FC
  /**
   * 匹配，返回 false 不渲染
   * @param selectedElement 选中的元素
   * @param ctx 上下文，编辑器
   */
  match?(
    selectedElement: UidlStoreUidlElement<Plugin> | null,
    ctx: Editor<Plugin>,
  ): boolean
}

/**
 * EditorPluginSeitStorePropertiesExtHkt 辅助类型
 */
export interface $EditorPluginSeitStorePropertiesExtHkt
  extends EditorDefaultPropertiesExtHkt {
  type: EditorPluginSeitStorePropertiesExtHkt<
    EditorDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 编辑器选中元素内联工具栏仓库插件
 */
export const editorPluginSeitStore: EditorPlugin<$EditorPluginSeitStorePropertiesExtHkt> =
  {
    id: 'seit-store',
    initEditor(ctx) {
      const { elementStore } = ctx
      const seitStore = (ctx.seitStore = {} as typeof ctx.seitStore)
      seitStore.Component = Seit
      seitStore.items = {}
      definePropertyByGetter(seitStore, 'groupedItems', () => {
        const finalItems: (typeof seitStore.items)[string][] = []
        for (const item of values(seitStore.items)) {
          const { match } = item
          if (match && !match(elementStore.selectedElement, ctx)) {
            continue
          }
          finalItems.push(item)
        }
        const m = mapGroupBy(finalItems, (item) => item.groupIndex ?? Infinity)
        const gs = [...m.entries()].sort((a, b) => a[0] - b[0])
        for (const g of gs) {
          g[1] = sortBy(g[1], ({ index = Infinity }) => index)
        }
        return gs
      })
      makeObservable(seitStore, {
        groupedItems: computed,
      })
    },
  }
