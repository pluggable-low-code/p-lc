import type {
  AnyEditorPlugin,
  Editor,
  EditorDefaultPropertiesExtHkt,
  EditorDefaultPropertiesExtHktPlugin,
  EditorPlugin,
  UidlStoreUidl,
} from '@p-lc/editor'
import type {
  AnyRuntimePlugin,
  Runtime,
  RuntimeDefaultPlugin,
} from '@p-lc/runtime'
import type {
  GetInnerPopupContainer,
  GetPopupContainer,
  LiteralObject,
  SoftAs,
} from '@p-lc/shared'
import { defineLazyInitProperty, definePropertyByGetter } from '@p-lc/shared'
import type { Get } from 'type-fest'
import type {
  PdForPreview,
  PreviewerEditorPlugin,
  PreviewerRuntimePlugin,
} from '../../previewer'
import { type editorPluginPreviewerStoreSyncPd } from '../../previewer'
import { type editorPluginPreviewerStoreMaskPopupContainer } from './editor-plugin-previewer-store-mask-popup-container'

/**
 * 编辑器预览器仓库内联插件属性扩展高等类型
 */
export interface EditorPluginPreviewStoreInlinePropertiesExtHkt<
  Plugin extends AnyEditorPlugin,
> {
  editor: {
    /**
     * 预览器仓库
     */
    previewerStore: {
      /**
       * 内联运行时插件，由其他插件扩展，只用于类型推导
       */
      inlineRuntimePlugins: {
        RuntimeDefaultPlugin: RuntimeDefaultPlugin
        PreviewerRuntimePlugin: PreviewerRuntimePlugin
      }
      /**
       * 内联运行时
       */
      inlineRuntime: InlineRuntime<Plugin>
      /**
       * （创建并）初始化内联运行时
       */
      initInlineRuntime: InitInlineRuntime<Plugin> | null
      /**
       * 默认的内联运行时 UIDL
       */
      defaultInlineRuntimeUidl: UidlStoreUidl<Plugin> | null
      /**
       * 内联运行时初始化选项，由其他插件扩展，只用于类型推导
       */
      inlineRuntimeInitOptions: {
        /**
         * 国际化字符串
         */
        i18nStrings: LiteralObject
        /**
         * 预览用 PD
         */
        pdsForPreview: PdForPreview[]
        /**
         * 获取弹窗容器
         */
        getPopupContainer: GetPopupContainer
        /**
         * 获取内部弹窗容器
         */
        getInnerPopupContainer: GetInnerPopupContainer
      }
      /**
       * 部分内联运行时初始化选项，由其他插件扩展
       */
      partialInlineRuntimeInitOptions: Partial<InlineRuntimeInitOptions<Plugin>>
    }
  }
}

/**
 * （创建并）初始化内联运行时
 */
export interface InitInlineRuntime<Plugin extends AnyEditorPlugin> {
  /**
   * 创建内联运行时
   * @param uidl UIDL
   * @param inlineRuntimeInitOptions 内联运行时初始化选项
   * @param ctx 上下文，编辑器
   */
  (
    uidl: UidlStoreUidl<Plugin>,
    inlineRuntimeInitOptions: InlineRuntimeInitOptions<Plugin>,
    ctx: Editor<Plugin>,
  ): Runtime<AnyRuntimePlugin>
  // 放宽 Runtime 返回类型，方便扩展运行时
  // InlineRuntime<Plugin>
}

/**
 * 内联运行时插件
 */
export type InlineRuntimePlugin<Plugin extends AnyEditorPlugin> = SoftAs<
  Get<Editor<Plugin>, ['previewerStore', 'inlineRuntimePlugins']>[keyof Get<
    Editor<Plugin>,
    ['previewerStore', 'inlineRuntimePlugins']
  >],
  AnyRuntimePlugin
>

/**
 * 内联运行时
 */
export type InlineRuntime<Plugin extends AnyEditorPlugin> = Runtime<
  InlineRuntimePlugin<Plugin>
>

/**
 * 内联运行时初始化选项
 */
export type InlineRuntimeInitOptions<Plugin extends AnyEditorPlugin> = Get<
  Editor<Plugin>,
  ['previewerStore', 'inlineRuntimeInitOptions']
>

/**
 * EditorPluginPreviewStoreInlinePropertiesExtHkt 辅助类型
 */
export interface $EditorPluginPreviewStoreInlinePropertiesExtHkt
  extends EditorDefaultPropertiesExtHkt {
  type: EditorPluginPreviewStoreInlinePropertiesExtHkt<
    EditorDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 编辑器预览器仓库内联插件
 */
export const editorPluginPreviewerStoreInline: EditorPlugin<
  $EditorPluginPreviewStoreInlinePropertiesExtHkt,
  | PreviewerEditorPlugin
  | typeof editorPluginPreviewerStoreSyncPd
  | typeof editorPluginPreviewerStoreMaskPopupContainer
> = {
  id: 'previewer-store-inline',
  initEditor(ctx) {
    const { previewerStore } = ctx
    const h = defineLazyInitProperty(previewerStore, 'inlineRuntime', () => {
      const {
        initInlineRuntime,
        defaultInlineRuntimeUidl,
        partialInlineRuntimeInitOptions,
      } = previewerStore
      const {
        uidlStore: { uidl = defaultInlineRuntimeUidl },
      } = ctx
      if (!initInlineRuntime) {
        throw new Error(
          `Please set the initInlineRuntime function before call it.`,
        )
      }
      if (!uidl) {
        throw new Error(
          `Please set defaultInlineRuntimeUidl for loading of uidl files.`,
        )
      }
      const runtime = initInlineRuntime(
        uidl,
        {
          i18nStrings: {},
          pdsForPreview: previewerStore.getPdsForPreview(),
          getPopupContainer,
          getInnerPopupContainer: getPopupContainer,
          ...partialInlineRuntimeInitOptions,
        },
        ctx,
      )
      // 短路
      definePropertyByGetter(runtime, 'editorCall', () => {
        return previewerStore.editorExpose
      })
      return runtime

      function getPopupContainer(): HTMLElement {
        return previewerStore.elPopupContainer || document.body
      }
    })
    previewerStore.initInlineRuntime = null
    previewerStore.partialInlineRuntimeInitOptions = {
      i18nStrings: {},
    }
    // 短路
    definePropertyByGetter(previewerStore, 'runtimeCall', () => {
      return previewerStore.inlineRuntime.runtimeExpose
    })
    return () => h.current?.dispose()
  },
}
