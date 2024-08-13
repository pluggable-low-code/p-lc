import type {
  AnyEditorPlugin,
  DepPluginUniteEditorPlugin,
  Editor,
  EditorDefaultPropertiesExtHkt,
  EditorDefaultPropertiesExtHktPlugin,
  EditorPlugin,
} from '@p-lc/editor'
import type { LcTypesReactRuntimePlugin } from '@p-lc/lc-types-react-runtime'
import { createLcTypesReactRuntime } from '@p-lc/lc-types-react-runtime'
import * as lcTypesUi from '@p-lc/lc-types-ui'
import type { LcTypesUidl } from '@p-lc/lc-types-uidl'
import {
  cdToLcTypesUidlBase,
  lcTypesUidlUtilsConfig,
  transformUidlByImplementsFor,
  transformUidlByImplementsIf,
  transformUidlByImplementsStyle,
} from '@p-lc/lc-types-uidl-utils'
import type { Cd, Pd } from '@p-lc/pd'
import type { AnyRuntimePlugin, Runtime } from '@p-lc/runtime'
import { RUNTIME_EVENT_KEY_UIDL } from '@p-lc/runtime-emitter-plugins'
import type { Disposer, SoftAs } from '@p-lc/shared'
import {
  EN_US,
  PKG_NAME_LC_TYPES_UI,
  V_0_0_1,
  ZH_CN,
  defineLazyInitProperty,
  echo,
  weakMemoize,
} from '@p-lc/shared'
import { assign, once, sortBy } from 'lodash-uni'
import { reaction } from 'mobx'
import type { Get } from 'type-fest'
import type { EditorPluginElementAttributesStoreI18nKeyOptions } from './i18n'
import {
  editorPluginElementAttributesStoreI18n,
  editorPluginElementAttributesStoreI18nEnUs,
  editorPluginElementAttributesStoreI18nZhCn,
} from './i18n'

export * from './components'
export * from './i18n'

/**
 * 编辑器元素属性仓库插件属性扩展高等类型
 */
export interface EditorPluginElementAttributesStorePropertiesExtHkt<
  Plugin extends AnyEditorPlugin,
> {
  editor: {
    /**
     * 国际化仓库
     */
    i18nStore: {
      /**
       * 翻译键值选项
       */
      tKeyOptions: EditorPluginElementAttributesStoreI18nKeyOptions
    }
    /**
     * 元素属性仓库
     */
    elementAttributesStore: {
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
       * 低代码类型运行时插件，由其他插件扩展，只用于类型推导
       */
      lcTypesRuntimePlugins: {
        LcTypesReactRuntimePlugin: LcTypesReactRuntimePlugin
      }
      /**
       * 低代码类型运行时
       */
      lcTypesRuntime: LcTypesRuntime<Plugin>
      /**
       * （创建并）初始化低代码类型运行时
       */
      initLcTypesRuntime: InitLcTypesRuntime<Plugin> | null
      /**
       * 未选中时的低代码类型运行时 UIDL
       */
      lcTypesRuntimeUidlForNotSelected: LcTypesUidl | null
      /**
       * 低代码类型 UIDL 转换器，id -> 转换器
       */
      lcTypesUidlTransformers: Record<string, LcTypesUidlTransformer>
    }
  }
}

/**
 * （创建并）初始化低代码类型运行时
 */
export interface InitLcTypesRuntime<Plugin extends AnyEditorPlugin> {
  /**
   * （创建并）初始化低代码类型运行时
   * @param uidl UIDL
   * @param ctx 上下文，编辑器
   */
  (uidl: LcTypesUidl, ctx: Editor<Plugin>): Runtime<AnyRuntimePlugin>
  // 放宽 Runtime 返回类型，方便扩展运行时
  // LcTypesRuntime<Plugin>
}

/**
 * 低代码类型运行时插件
 */
export type LcTypesRuntimePlugin<Plugin extends AnyEditorPlugin> = SoftAs<
  Get<
    Editor<Plugin>,
    ['elementAttributesStore', 'lcTypesRuntimePlugins']
  >[keyof Get<
    Editor<Plugin>,
    ['elementAttributesStore', 'lcTypesRuntimePlugins']
  >],
  AnyRuntimePlugin
>

/**
 * 低代码类型运行时
 */
export type LcTypesRuntime<Plugin extends AnyEditorPlugin> = Runtime<
  LcTypesRuntimePlugin<Plugin>
>

/**
 * 默认的（创建并）初始化低代码类型运行时
 */
export const defaultInitLcTypesRuntime: InitLcTypesRuntime<
  DepPluginUniteEditorPlugin<typeof editorPluginElementAttributesStore>
> = (uidl, ctx) => {
  const {
    elementStore,
    i18nStore: { language },
    elementAttributesStore,
  } = ctx
  const runtime = createLcTypesReactRuntime()
  if (process.env.NODE_ENV === 'development') {
    assign(window, {
      debugLcTypesRuntime: runtime,
    })
  }
  return runtime.init({
    uidl,
    dependencies: {
      [PKG_NAME_LC_TYPES_UI]: lcTypesUi,
    },
    uidlUtilsConfig: lcTypesUidlUtilsConfig,
    getData() {
      return {
        uidlElement: elementStore.selectedElement,
      }
    },
    setData({ uidlElement }, { recipeId } = {}) {
      if (uidlElement) {
        elementStore.editElement(uidlElement, recipeId)
      }
    },
    language,
    getInnerPopupContainer() {
      return elementAttributesStore.elPopupContainer || document.body
    },
  })
}

/**
 * 默认的未选中时的低代码类型运行时 UIDL
 */
export const defaultLcTypesRuntimeUidlForNotSelected: LcTypesUidl = {
  type: '',
  name: '',
  components: [
    {
      elementType: 'AttrRoot_0',
      pkgName: PKG_NAME_LC_TYPES_UI,
      pkgVersion: V_0_0_1,
      componentType: 'AttrRoot',
    },
  ],
  view: {
    id: 'root',
    name: 'Low-code types',
    type: 'AttrRoot_0',
  },
  code: {},
}

/**
 * 低代码类型 UIDL 转换器
 */
export interface LcTypesUidlTransformer {
  /**
   * 唯一标识
   */
  id: string
  /**
   * 下标，小的先执行，默认：Infinity
   */
  index?: number
  /**
   * 转换
   * @param uidl 当前的低代码类型 UIDL
   * @param cd 组件声明
   * @param pd 包声明
   * @returns 新的低代码类型 UIDL
   */
  transform(uidl: LcTypesUidl, cd: Cd, pd: Pd): LcTypesUidl
}

/**
 * 低代码类型 UIDL 转换器：样式
 */
export const lcTypesUidlTransformerStyle: LcTypesUidlTransformer = {
  id: 'style',
  index: 550,
  transform: transformUidlByImplementsStyle,
}

/**
 * 低代码类型 UIDL 转换器：条件渲染
 */
export const lcTypesUidlTransformerIf: LcTypesUidlTransformer = {
  id: 'if',
  index: 650,
  transform: transformUidlByImplementsIf,
}

/**
 * 低代码类型 UIDL 转换器：列表渲染
 */
export const lcTypesUidlTransformerFor: LcTypesUidlTransformer = {
  id: 'for',
  index: 750,
  transform: transformUidlByImplementsFor,
}

/**
 * EditorPluginElementAttributesStorePropertiesExtHkt 辅助类型
 */
export interface $EditorPluginElementAttributesStorePropertiesExtHkt
  extends EditorDefaultPropertiesExtHkt {
  type: EditorPluginElementAttributesStorePropertiesExtHkt<
    EditorDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 编辑器元素属性仓库插件
 */
export const editorPluginElementAttributesStore: EditorPlugin<$EditorPluginElementAttributesStorePropertiesExtHkt> =
  {
    id: 'ea-store',
    initEditor(ctx) {
      const { elementStore, i18nStore } = ctx
      //#region i18n 摇树
      // 打包器预处理，只能处理 if-else，不能处理 switch-case
      if (!process.env.LC_LANGUAGE) {
        i18nStore.addResource(editorPluginElementAttributesStoreI18n)
      } else if (process.env.LC_LANGUAGE === EN_US) {
        i18nStore.addResource({
          [EN_US]: editorPluginElementAttributesStoreI18nEnUs,
        })
      } else if (process.env.LC_LANGUAGE === ZH_CN) {
        i18nStore.addResource({
          [ZH_CN]: editorPluginElementAttributesStoreI18nZhCn,
        })
      }
      //#endregion
      let reactionDisposer: Disposer | undefined
      const elementAttributesStore = (ctx.elementAttributesStore =
        {} as typeof ctx.elementAttributesStore)
      elementAttributesStore.elPopupContainer = null
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      elementAttributesStore.setElPopupContainer = (el) => {
        elementAttributesStore.elPopupContainer = el
      }
      const h = defineLazyInitProperty(
        elementAttributesStore,
        'lcTypesRuntime',
        () => {
          const { initLcTypesRuntime } = elementAttributesStore
          const init = initLcTypesRuntime || defaultInitLcTypesRuntime
          const runtime = init(
            getLcTypesUidl(),
            ctx,
          ) as typeof elementAttributesStore.lcTypesRuntime
          reactionDisposer = reaction(
            () => elementStore.selectedCd,
            () => {
              runtime.emitter.emit(RUNTIME_EVENT_KEY_UIDL, {
                uidl: getLcTypesUidl(),
              })
            },
          )
          return runtime
        },
      )
      elementAttributesStore.lcTypesUidlTransformers = {
        [lcTypesUidlTransformerStyle.id]: lcTypesUidlTransformerStyle,
        [lcTypesUidlTransformerIf.id]: lcTypesUidlTransformerIf,
        [lcTypesUidlTransformerFor.id]: lcTypesUidlTransformerFor,
      }
      const getMergedTransformer = once(() => {
        const transforms = sortBy(
          elementAttributesStore.lcTypesUidlTransformers,
          ({ index = Infinity }) => index,
        ).map(({ transform }) => transform)
        const ret: LcTypesUidlTransformer['transform'] = (uidl, cd, pd) => {
          for (const transform of transforms) {
            uidl = transform(uidl, cd, pd)
          }
          return uidl
        }
        return ret
      })
      const memoizedCdToLcTypesUidl = weakMemoize((cd: Cd, pd: Pd) => {
        let uidl = cdToLcTypesUidlBase(cd, pd)
        uidl = getMergedTransformer()(uidl, cd, pd)
        return uidl
      }, echo)
      return () => {
        reactionDisposer?.()
        h.current?.dispose()
      }

      function getLcTypesUidl(): LcTypesUidl {
        const { lcTypesRuntimeUidlForNotSelected } = elementAttributesStore
        const { selectedPd, selectedCd } = elementStore
        if (selectedPd && selectedCd) {
          return memoizedCdToLcTypesUidl(selectedCd, selectedPd)
        }
        return (
          lcTypesRuntimeUidlForNotSelected ||
          defaultLcTypesRuntimeUidlForNotSelected
        )
      }
    },
  }
