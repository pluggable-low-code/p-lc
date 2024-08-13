import { mergePkgNameToI18nKey } from '@p-lc/pd-utils'
import type {
  AnyObject,
  DataLoader,
  I18nResource,
  LiteralObject,
  Text,
} from '@p-lc/shared'
import {
  EN_US,
  LocalStorageDataLoader,
  NAME_EN_US,
  NAME_ZH_CN,
  ZH_CN,
  create,
  defaultLanguageNames,
  defineLazyInitProperty,
  defineProperty,
  getLanguageByUa,
} from '@p-lc/shared'
import { debounce, get, isString, keys, merge, once } from 'lodash-uni'
import { action } from 'mobx'
import type { Get } from 'type-fest'
import type {
  AnyEditorPlugin,
  Editor,
  EditorDefaultPropertiesExtHkt,
  EditorDefaultPropertiesExtHktPlugin,
  EditorRawPlugin,
} from '../../types'
import type { editorPluginName } from '../editor-plugin-name'

/**
 * 编辑器国际化仓库插件属性扩展高等类型
 */
export interface EditorPluginI18nStorePropertiesExtHkt<
  Plugin extends AnyEditorPlugin,
> {
  editor: {
    /**
     * 国际化仓库
     */
    i18nStore: {
      /**
       * 所有支持的语言
       */
      languages: string[]
      /**
       * 语言名称
       */
      languageNames: Record<string, string>
      /**
       * 设置语言名称
       * @param languageNames 语言名称
       */
      setLanguageNames(languageNames: Record<string, string>): void
      /**
       * （当前）语言
       */
      language: string
      /**
       * 设置语言
       * @param language 语言
       * @param save 保存当前语言，默认为: true
       */
      setLanguage(language: string, save?: boolean): void
      /**
       * 添加资源，以 merge 的形式
       * @param resource 资源
       * @param isImportant 重要，默认：false，为 true 时会覆盖 初始化选项里的资源
       */
      addResource(resource: I18nResource, isImportant?: boolean): void
      /**
       * 翻译键值选项，由其他插件扩展，只用于类型推导
       */
      tKeyOptions?: LiteralObject
      /**
       * 翻译
       * @param key 键值
       * @param options 选项
       */
      t<T extends keyof I18nStoreTKeyOptions<Plugin>>(
        key: T,
        options?: I18nStoreTKeyOptions<Plugin>[T],
      ): string
      t(key: string, options?: AnyObject): string
      /**
       * 翻译（国际化）文本
       * @param text 文本
       * @param options 选项
       */
      tText<T extends keyof I18nStoreTKeyOptions<Plugin>>(
        text: Text<T extends string ? T : string>,
        options?: I18nStoreTKeyOptions<Plugin>[T],
      ): string
      tText(text: Text, options?: AnyObject): string
      /**
       * 国际化状态加载器
       */
      i18nStateLoader: DataLoader<I18nState | null> | null
    }
  }
}

/**
 * 国际化仓库翻译键值选项
 */
export type I18nStoreTKeyOptions<Plugin extends AnyEditorPlugin> = Get<
  Editor<Plugin>,
  ['i18nStore', 'tKeyOptions']
>

/**
 * 国际化状态
 */
export interface I18nState {
  /**
   * 语言
   */
  language: string
}

/**
 * EditorPluginI18nStorePropertiesExtHkt 辅助类型
 */
export interface $EditorPluginI18nStorePropertiesExtHkt
  extends EditorDefaultPropertiesExtHkt {
  type: EditorPluginI18nStorePropertiesExtHkt<
    EditorDefaultPropertiesExtHktPlugin<this>
  >
}

/**
 * 编辑器国际化仓库插件
 */
export const editorPluginI18nStore: EditorRawPlugin<
  $EditorPluginI18nStorePropertiesExtHkt,
  typeof editorPluginName
> = {
  id: 'i18n-store',
  initEditor(ctx) {
    const { name: editorName } = ctx
    const i18nStore = (ctx.i18nStore = {} as typeof ctx.i18nStore)
    const setLanguageByUa = process.env.LC_LANGUAGE
      ? null
      : once((languages: string[]) => {
          if (!languages.length) return
          i18nStore.setLanguage(getLanguageByUa(languages), false)
        })
    const setLanguageNames = (i18nStore.setLanguageNames = action(
      (languageNames) => {
        const languages = (i18nStore.languages = keys(languageNames))
        i18nStore.languageNames = languageNames
        setLanguageByUa?.(languages)
      },
    ))
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    i18nStore.language = process.env.LC_LANGUAGE!
    i18nStore.setLanguage = action((language, save = true) => {
      i18nStore.language = language
      if (save) {
        debounceSaveI18nState({ language })
      }
    })
    let initLanguageNames: typeof i18nStore.languageNames = {}
    //#region i18n 摇树
    // 打包器预处理，只能处理 if-else，不能处理 switch-case
    if (!process.env.LC_LANGUAGE) {
      initLanguageNames = defaultLanguageNames
    } else if (process.env.LC_LANGUAGE === EN_US) {
      initLanguageNames = {
        [EN_US]: NAME_EN_US,
      }
    } else if (process.env.LC_LANGUAGE === ZH_CN) {
      initLanguageNames = {
        [ZH_CN]: NAME_ZH_CN,
      }
    }
    //#endregion
    setLanguageNames(initLanguageNames)
    const resource: I18nResource = create(null)
    const importantResource: I18nResource = create(null)
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    i18nStore.addResource = (res, isImportant) => {
      merge(isImportant ? importantResource : resource, res)
    }
    if (process.env.NODE_ENV === 'development') {
      defineProperty(i18nStore, 'debugResources', {
        get() {
          return { resource, importantResource }
        },
      })
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    i18nStore.t = (key: string, options?: AnyObject) => {
      const pkgName = options?.pkgName
      if (isString(pkgName)) {
        key = mergePkgNameToI18nKey(pkgName, key)
      }
      const path = [ctx.i18nStore.language, key]
      return get(importantResource, path) ?? get(resource, path, key)
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    i18nStore.tText = (text: Text, options?: AnyObject) => {
      if (isString(text)) return text
      return ctx.i18nStore.t(text.key, options)
    }
    defineLazyInitProperty(
      i18nStore,
      'i18nStateLoader',
      () =>
        new LocalStorageDataLoader<I18nState | null>(
          `${editorName}:i18n-state`,
          null,
        ),
    )
    const debounceSaveI18nState = debounce((i18nState: I18nState) => {
      i18nStore.i18nStateLoader?.save(i18nState)
    })

    // 暂不支持原地修改语言，需要刷新
    // makeObservable(i18nStore, {
    //   languages: observable.ref,
    //   languageNames: observable.ref,
    //   language: observable,
    // })
  },
}
