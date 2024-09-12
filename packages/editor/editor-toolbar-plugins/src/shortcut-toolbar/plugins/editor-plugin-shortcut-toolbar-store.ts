import type {
  AnyEditorPlugin,
  DepPluginUniteEditorPlugin,
  Editor,
  EditorDefaultPropertiesExtHkt,
  EditorDefaultPropertiesExtHktPlugin,
  EditorPlugin,
} from '@p-lc/editor'
import {
  winAddEventListener,
  winRemoveEventListener,
  type Disposer,
} from '@p-lc/shared'
import { isArray, once, sortBy, values } from 'lodash-uni'
import type { ShortcutToolbarEditorPlugin } from '../types'

/**
 * 编辑器快捷键工具栏仓库插件属性扩展高等类型
 */
export interface EditorPluginShortcutToolbarStorePropertiesExtHkt<
  Plugin extends AnyEditorPlugin,
> {
  editor: {
    /**
     * 快捷键工具栏仓库
     */
    shortcutToolbarStore: {
      /**
       * 快捷键，id -> 快捷键
       */
      shortcuts: Record<string, Shortcut<Plugin>>
      /**
       * 快捷键过滤器，id -> 过滤器
       */
      shortcutFilters: Record<string, ShortcutFilter<Plugin>>
    }
  }
}

/**
 * 快捷键
 */
export interface Shortcut<
  Plugin extends AnyEditorPlugin = ShortcutToolbarEditorPlugin,
> {
  /**
   * 唯一标识
   */
  id: string
  /**
   * 匹配，快捷键按下时调用
   * @param ev 键盘事件
   * @param ctx 上下文，编辑器
   */
  match(ev: KeyboardEvent, ctx: Editor<Plugin>): boolean
  /**
   * 操作，匹配上之后调用
   * @param ev 键盘事件
   * @param ctx 上下文，编辑器
   * @returns 销毁函数，快捷键松开时调用
   */
  action(ev: KeyboardEvent, ctx: Editor<Plugin>): Disposer | void
}

/**
 * 快捷键过滤器
 */
export interface ShortcutFilter<
  Plugin extends AnyEditorPlugin = ShortcutToolbarEditorPlugin,
> {
  /**
   * 唯一标识
   */
  id: string
  /**
   * 下标，小的先执行，默认：Infinity
   */
  index?: number
  /**
   * 执行快捷键前的过滤函数，返回 true 才会继续执行
   * @param ev 键盘事件
   * @returns 返回 true 继续执行，返回字符串数组继续执行并跳过给出 id 对应的后续过滤器
   */
  filter(ev: KeyboardEvent, ctx: Editor<Plugin>): boolean | string[]
}

/**
 * EditorPluginShortcutToolbarStorePropertiesExtHkt 辅助类型
 */
export interface $EditorPluginShortcutToolbarStorePropertiesExtHkt
  extends EditorDefaultPropertiesExtHkt {
  type: EditorPluginShortcutToolbarStorePropertiesExtHkt<
    EditorDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 编辑器快捷键工具栏仓库插件
 */
export const editorPluginShortcutToolbarStore: EditorPlugin<$EditorPluginShortcutToolbarStorePropertiesExtHkt> =
  {
    id: 'shortcut-toolbar-store',
    initEditor(ctx) {
      const shortcutToolbarStore = (ctx.shortcutToolbarStore =
        {} as typeof ctx.shortcutToolbarStore)
      shortcutToolbarStore.shortcuts = {}
      shortcutToolbarStore.shortcutFilters = {}
      const getSortedShortcutFilters = once(() => {
        return sortBy(
          shortcutToolbarStore.shortcutFilters,
          ({ index = Infinity }) => index,
        )
      })
      winAddEventListener('keydown', handleWinKeyDown)
      winAddEventListener('keyup', handleWinKeyUp)
      const actionDisposerMap = new WeakMap<Shortcut, Disposer>()
      return () => {
        winRemoveEventListener('keydown', handleWinKeyDown)
        winRemoveEventListener('keyup', handleWinKeyUp)
      }

      function handleWinKeyDown(ev: KeyboardEvent): void {
        if (!ctx.elRoot) {
          // 没有挂载，取消事件处理
          return
        }
        const skipSet = new Set<string>()
        for (const f of getSortedShortcutFilters()) {
          if (skipSet.has(f.id)) continue
          const ret = f.filter(ev, ctx)
          if (!ret) return
          if (isArray(ret)) {
            for (const id of ret) skipSet.add(id)
          }
        }
        for (const s of getFinalShortcuts()) {
          if (s.match(ev, ctx)) {
            const disposer = s.action(ev, ctx)
            if (disposer) {
              actionDisposerMap.set(s, disposer)
            }
          }
        }
      }

      function handleWinKeyUp(ev: KeyboardEvent): void {
        if (!ctx.elRoot) {
          // 没有挂载，取消事件处理
          return
        }
        void ev
        // console.log('handleWinKeyUp', ev)
        for (const s of getFinalShortcuts()) {
          const disposer = actionDisposerMap.get(s)
          if (disposer) {
            disposer()
          }
        }
      }

      function getFinalShortcuts(): Shortcut<
        DepPluginUniteEditorPlugin<typeof editorPluginShortcutToolbarStore>
      >[] {
        return values(shortcutToolbarStore.shortcuts)
      }
    },
  }
