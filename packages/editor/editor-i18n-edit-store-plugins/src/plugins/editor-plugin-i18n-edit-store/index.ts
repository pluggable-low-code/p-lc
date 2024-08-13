import type { EditorPlugin } from '@p-lc/editor'
import type { I18nLanguageResource, I18nResource, Text } from '@p-lc/shared'
import {
  EN_US,
  ZH_CN,
  definePropertyByGetter,
  firstValueOfObject,
} from '@p-lc/shared'
import type { UidlExtI18n } from '@p-lc/uidl-ext-i18n'
import {
  fromPairs,
  get,
  isString,
  keys,
  mapValues,
  set,
  sortBy,
  toPairs,
  values,
} from 'lodash-uni'
import { action, computed, makeObservable, observable } from 'mobx'
import { computedFn } from 'mobx-utils'
import type { EditorPluginI18nEditStoreI18nKeyOptions } from './i18n'
import {
  editorPluginI18nEditStoreI18n,
  editorPluginI18nEditStoreI18nEnUs,
  editorPluginI18nEditStoreI18nZhCn,
} from './i18n'

export * from './components'
export * from './i18n'

/**
 * 编辑器国际化编辑仓库插件属性扩展
 */
export interface EditorPluginI18nEditStorePropertiesExt {
  editor: {
    /**
     * 国际化仓库
     */
    i18nStore: {
      /**
       * 翻译键值选项
       */
      tKeyOptions: EditorPluginI18nEditStoreI18nKeyOptions
    }
    /**
     * UIDL 仓库
     */
    uidlStore: {
      /**
       * UIDL
       */
      uidl: UidlExtI18n | null
    }
    /**
     * 国际化编辑仓库
     */
    i18nEditStore: {
      /**
       * 原生元素，国际化编辑 DOM 根元素
       */
      el: HTMLElement | null
      /**
       * 设置原生元素
       * @param el 原生元素
       */
      setEl(el: HTMLElement | null): void
      /**
       * UIDL 里的国际化字段，不存在时返回等价的空对象
       */
      uidlI18n?: I18nResource
      /**
       * 所有可编辑的语言
       */
      lngs: string[]
      /**
       * 所有键值
       */
      keys: string[]
      /**
       * 键值集合
       */
      keySet: Set<string>
      /**
       * 获取语言资源，computed
       * @param lng 语言
       */
      getLngRes(lng: string): I18nLanguageResource | undefined
      /**
       * 有键值
       * @param key 键值
       */
      hasKey(key: string): boolean
      /**
       * 添加键值
       * @param key 键值
       */
      addKey(key: string): void
      /**
       * 删除键值
       * @param key 键值
       */
      deleteKey(key: string): void
      /**
       * 改变键值
       * @param key 键值
       * @param newKey 新键值
       */
      changeKey(Key: string, newKey: string): void
      /**
       * 获取文案
       * @param lng 语言
       * @param key 键值
       * @returns 文案，不存在返回空字符串
       */
      getText(lng: string, key: string): string
      /**
       * 翻译编辑中的文案
       * @param text 文本
       * @returns 翻译后的文案，不存在返回键值
       */
      tEditingText(text: Text): string
      /**
       * 设置文案
       * @param lng 语言
       * @param key 键值
       * @param text 文案
       * @param recipeId 配方 ID
       */
      setText(lng: string, key: string, text: string, recipeId: string): void
      /**
       * 编辑中的语言
       */
      editingLng: string
      /**
       * 设置编辑中的语言
       * @param lng 语言
       */
      setEditingLng(lng: string): void
      /**
       * 对话框是否打开
       */
      dialogIsOpen: boolean
      /**
       * 对话框旧键值
       */
      dialogOldKey: string | null
      /**
       * 打开键值对话
       * @param oldKey （需要编辑的）旧键值，不传为新建
       */
      openKeyDialog(oldKey?: string): void
      /**
       * 关闭键值对话框
       * @param newKey （编辑完成的）新键值，不传为取消
       */
      closeKeyDialog(newKey?: string): void
      /**
       * 自动滚动到新的键值
       * @param el 渲染元素
       * @param renderLng 渲染时的语言
       * @param renderKey 渲染时的键
       */
      autoScrollToNewKey(
        el: HTMLElement | null,
        renderLng: string,
        renderKey: string,
      ): void
      /**
       * 自动聚焦到新的键值
       */
      autoFocusToNewKey(): void
    }
  }
}

/**
 * 编辑器国际化编辑仓库插件
 */
export const editorPluginI18nEditStore: EditorPlugin<EditorPluginI18nEditStorePropertiesExt> =
  {
    id: 'i18n-edit-store',
    initEditor(ctx) {
      const { i18nStore, uidlStore } = ctx
      //#region i18n 摇树
      // 打包器预处理，只能处理 if-else，不能处理 switch-case
      if (!process.env.LC_LANGUAGE) {
        i18nStore.addResource(editorPluginI18nEditStoreI18n)
      } else if (process.env.LC_LANGUAGE === EN_US) {
        i18nStore.addResource({
          [EN_US]: editorPluginI18nEditStoreI18nEnUs,
        })
      } else if (process.env.LC_LANGUAGE === ZH_CN) {
        i18nStore.addResource({
          [ZH_CN]: editorPluginI18nEditStoreI18nZhCn,
        })
      }
      //#endregion
      const i18nEditStore = (ctx.i18nEditStore = {} as typeof ctx.i18nEditStore)
      i18nEditStore.el = null
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      i18nEditStore.setEl = (el) => {
        i18nEditStore.el = el
      }
      definePropertyByGetter(i18nEditStore, 'uidlI18n', () => {
        const { uidl } = uidlStore
        return uidl?.i18n
      })
      definePropertyByGetter(i18nEditStore, 'lngs', () => {
        return i18nStore.languages
      })
      definePropertyByGetter(i18nEditStore, 'keys', () => {
        const { uidlI18n } = i18nEditStore
        return keys(firstValueOfObject(uidlI18n))
      })
      definePropertyByGetter(i18nEditStore, 'keySet', () => {
        const { keys: ks } = i18nEditStore
        return new Set(ks)
      })
      i18nEditStore.getLngRes = computedFn((lng) => {
        const { uidlI18n } = i18nEditStore
        return uidlI18n?.[lng]
      })
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      i18nEditStore.hasKey = (key) => {
        const { keySet } = i18nEditStore
        return keySet.has(key)
      }
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      i18nEditStore.addKey = (key) => {
        uidlStore.edit((uidl) => {
          const i18n = ensureI18nResource(uidl)
          for (const lng in i18n) {
            set(i18n, [lng, key], '')
          }
          sortAllKeys(i18n)
        })
      }
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      i18nEditStore.deleteKey = (key) => {
        uidlStore.edit((uidl) => {
          for (const lngRes of values(uidl.i18n)) {
            delete lngRes[key]
          }
        })
      }
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      i18nEditStore.changeKey = (key, newKey) => {
        if (key === newKey) return
        uidlStore.edit(({ i18n }) => {
          for (const lngRes of values(i18n)) {
            lngRes[newKey] = lngRes[key]
            delete lngRes[key]
          }
          sortAllKeys(i18n)
        })
      }
      i18nEditStore.getText = computedFn((lng, key) => {
        const { uidlI18n } = i18nEditStore
        return get(uidlI18n, [lng, key], '')
      })
      i18nEditStore.tEditingText = computedFn((text: Text) => {
        if (isString(text)) return text
        const { key } = text
        const { uidlI18n } = i18nEditStore
        return get(uidlI18n, [i18nStore.language, key], key)
      })
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      i18nEditStore.setText = (lng, key, text, recipeId) => {
        uidlStore.edit((uidl) => {
          const i18n = ensureI18nResource(uidl)
          let lngRes = i18n[lng]
          if (!lngRes) {
            lngRes = i18n[lng] = {
              ...mapValues(firstValueOfObject(i18n), ''),
            }
          }
          lngRes[key] = text
        }, recipeId)
      }
      i18nEditStore.editingLng = i18nStore.language
      i18nEditStore.setEditingLng = action((lng) => {
        i18nEditStore.editingLng = lng
      })
      i18nEditStore.dialogIsOpen = false
      i18nEditStore.dialogOldKey = null
      i18nEditStore.openKeyDialog = action((oldKey) => {
        i18nEditStore.dialogOldKey = oldKey || null
        i18nEditStore.dialogIsOpen = true
      })
      let autoScrollTask: [string, string] | null = null
      i18nEditStore.closeKeyDialog = action((newKey) => {
        const { dialogOldKey, editingLng } = i18nEditStore
        if (newKey) {
          autoScrollTask = [editingLng, newKey]
          if (dialogOldKey) {
            i18nEditStore.changeKey(dialogOldKey, newKey)
          } else {
            i18nEditStore.addKey(newKey)
          }
        }
        i18nEditStore.dialogIsOpen = false
      })
      let lastElScrollTo: HTMLElement | null = null
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      i18nEditStore.autoScrollToNewKey = (el, renderLng, renderKey) => {
        if (!autoScrollTask || !el) return
        const [lng, key] = autoScrollTask
        if (renderLng !== lng || renderKey !== key) {
          return
        }
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
        lastElScrollTo = el
        autoScrollTask = null
      }
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      i18nEditStore.autoFocusToNewKey = () => {
        if (!lastElScrollTo) return
        lastElScrollTo.querySelector('textarea')?.focus()
        lastElScrollTo = null
      }
      makeObservable(i18nEditStore, {
        uidlI18n: computed,
        lngs: computed,
        keys: computed,
        keySet: computed,
        editingLng: observable,
        dialogIsOpen: observable,
        dialogOldKey: observable,
      })

      function ensureI18nResource(uidl: UidlExtI18n): I18nResource {
        let { i18n } = uidl
        if (!i18n) {
          i18n = uidl.i18n = {}
        }
        for (const lng of i18nEditStore.lngs) {
          if (!i18n[lng]) i18n[lng] = {}
        }
        return i18n
      }

      function sortAllKeys(i18n?: I18nResource): void {
        if (!i18n) return
        for (const lng in i18n) {
          i18n[lng] = fromPairs(sortBy(toPairs(i18n[lng]), (a) => a[0]))
        }
      }
    },
  }
