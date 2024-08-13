import type { EditorPlugin } from '@p-lc/editor'
import { definePropertyByGetter, EN_US, ZH_CN } from '@p-lc/shared'
import type { UidlData, UidlExtData } from '@p-lc/uidl-ext-data'
import type { EditorPluginDataStoreI18nKeyOptions } from './i18n'
import {
  editorPluginDataStoreI18n,
  editorPluginDataStoreI18nEnUs,
  editorPluginDataStoreI18nZhCn,
} from './i18n'

export * from './components'
export * from './i18n'

/**
 * 编辑器数据仓库插件属性扩展
 */
export interface EditorPluginDataStorePropertiesExt {
  editor: {
    /**
     * 国际化仓库
     */
    i18nStore: {
      /**
       * 翻译键值选项
       */
      tKeyOptions: EditorPluginDataStoreI18nKeyOptions
    }
    /**
     * UIDL 仓库
     */
    uidlStore: {
      /**
       * UIDL
       */
      uidl: UidlExtData | null
    }
    /**
     * 组件库仓库
     */
    dataStore: {
      /**
       * 数据
       */
      data: UidlData | undefined
      /**
       * 设置数据
       * @param data 数据
       */
      setData(data?: UidlData): void
    }
  }
}

/**
 * 编辑器数据仓库插件
 */
export const editorPluginDataStore: EditorPlugin<EditorPluginDataStorePropertiesExt> =
  {
    id: 'data-store',
    initEditor(ctx) {
      const { i18nStore, uidlStore } = ctx
      const dataStore = (ctx.dataStore = {} as typeof ctx.dataStore)
      //#region i18n 摇树
      // 打包器预处理，只能处理 if-else，不能处理 switch-case
      if (!process.env.LC_LANGUAGE) {
        i18nStore.addResource(editorPluginDataStoreI18n)
      } else if (process.env.LC_LANGUAGE === EN_US) {
        i18nStore.addResource({
          [EN_US]: editorPluginDataStoreI18nEnUs,
        })
      } else if (process.env.LC_LANGUAGE === ZH_CN) {
        i18nStore.addResource({
          [ZH_CN]: editorPluginDataStoreI18nZhCn,
        })
      }
      //#endregion
      definePropertyByGetter(dataStore, 'data', () => uidlStore.uidl?.data)
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      dataStore.setData = (data) => {
        uidlStore.edit((uidl) => {
          if (data) uidl.data = data
          else delete uidl.data
        }, 'data')
      }
    },
  }
