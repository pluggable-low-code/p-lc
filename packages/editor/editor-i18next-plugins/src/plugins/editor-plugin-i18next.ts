import type { EditorPlugin } from '@p-lc/editor'
import { editorPluginI18nStore } from '@p-lc/editor'
import { mergePkgNameToI18nKey } from '@p-lc/pd-utils'
import type { AnyObject } from '@p-lc/shared'
import { defineProperty } from '@p-lc/shared'
import type { InitOptions as I18nextInitOptions, i18n } from 'i18next'
import i18next from 'i18next'
import { action, reaction } from 'mobx'

/**
 * i18next 命名空间 lc
 */
export const I18NEXT_NS_LC = 'lc'

/**
 * i18next 命名空间 lc-important
 */
export const I18NEXT_NS_LC_IMPORTANT = 'lc-important'

/**
 * 编辑器 i18next 插件属性扩展
 */
export interface EditorPluginI18nextPropertiesExt {
  editor: {
    /**
     * 国际化仓库
     */
    i18nStore: {
      /**
       * i18next 实例
       */
      i18next: i18n
    }
  }
  editorInitOptions: {
    /**
     * i18next 实例
     */
    i18next?: i18n
    /**
     * i18next 初始化选项
     */
    i18nextInitOptions?: I18nextInitOptions
  }
}

/**
 * 编辑器 i18next 插件
 */
export const editorPluginI18next: EditorPlugin<EditorPluginI18nextPropertiesExt> =
  {
    id: 'i18next',
    position: {
      target: editorPluginI18nStore,
    },
    initEditor(ctx) {
      const {
        initOptions: { i18next: i18nextInitInstance, i18nextInitOptions },
        i18nStore,
      } = ctx
      let i18nextInstance: i18n
      if (i18nextInitInstance) {
        i18nextInstance = i18nextInitInstance
      } else {
        ;(i18nextInstance = i18next).init({
          lng: i18nStore.language,
          resources: {},
          ...i18nextInitOptions,
        })
      }
      const reactionDisposer = reaction(
        () => i18nStore.language,
        (lng) => i18nextInstance.changeLanguage(lng),
      )
      const { setLanguage: oldSetLanguage } = i18nStore
      i18nStore.setLanguage = action((...args) => {
        oldSetLanguage(...args)
        i18nextInstance.changeLanguage(args[0])
      })
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      i18nStore.addResource = (res, isImportant) => {
        for (const lng in res) {
          i18nextInstance.addResources(
            lng,
            isImportant ? I18NEXT_NS_LC_IMPORTANT : I18NEXT_NS_LC,
            res[lng],
          )
        }
      }
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      i18nStore.t = (key: string, options?: AnyObject) => {
        const pkgName = options?.pkgName
        if (pkgName) {
          key = mergePkgNameToI18nKey(pkgName, key)
        }
        let ret = i18nextInstance.t(key, {
          ns: I18NEXT_NS_LC_IMPORTANT,
          ...options,
        })
        if (ret === key) {
          ret = i18nextInstance.t(key, {
            ns: I18NEXT_NS_LC,
            ...options,
          })
        }
        return ret
      }
      if (process.env.NODE_ENV === 'development') {
        defineProperty(i18nStore, 'debugI18nextInstance', {
          get() {
            return i18nextInstance
          },
        })
      }
      return reactionDisposer
    },
  }
