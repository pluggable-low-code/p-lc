import type { EditorPlugin } from '@p-lc/editor'
import { definePropertyByGetter, EN_US, ZH_CN } from '@p-lc/shared'
import { isString } from 'lodash-uni'
import { action, computed, makeObservable } from 'mobx'
import type { EditorPluginComponentLibraryStoreI18nKeyOptions } from './i18n'
import {
  editorPluginComponentLibraryStoreI18n,
  editorPluginComponentLibraryStoreI18nEnUs,
  editorPluginComponentLibraryStoreI18nZhCn,
} from './i18n'

export * from './components'
export * from './i18n'

/**
 * 编辑器组件库仓库插件属性扩展
 */
export interface EditorPluginComponentLibraryStorePropertiesExt {
  editor: {
    /**
     * 国际化仓库
     */
    i18nStore: {
      /**
       * 翻译键值选项
       */
      tKeyOptions: EditorPluginComponentLibraryStoreI18nKeyOptions
    }
    /**
     * 组件库仓库
     */
    componentLibraryStore: {
      /**
       * 选中的包名，记录上次用户选中的包名
       */
      selectedPkgName: string | null
      /**
       * 激活的包名，多数情况下应该用这个
       */
      activePkgName: string | null
      /**
       * 选择组件库
       * @param pkgName 包名
       */
      selectComponentLibrary(pkgName: string | null): void
      /**
       * 创建并添加元素
       * @param pkgName 包名
       * @param componentType 组件类型
       */
      createAndAndElement(pkgName: string, componentType: string): void
    }
    /**
     * 布局仓库
     */
    layoutStore: {
      /**
       * UIDL 状态
       */
      uidlState: {
        /**
         * 选中的包名，记录上次用户选中的包名
         */
        selectedPkgName: string | null
      }
    }
  }
}

/**
 * 编辑器组件库仓库插件
 */
export const editorPluginComponentLibraryStore: EditorPlugin<EditorPluginComponentLibraryStorePropertiesExt> =
  {
    id: 'component-library-store',
    initEditor(ctx) {
      const { i18nStore, layoutStore, pdStore, elementStore, uidlStore } = ctx
      const componentLibraryStore = (ctx.componentLibraryStore =
        {} as typeof ctx.componentLibraryStore)
      //#region i18n 摇树
      // 打包器预处理，只能处理 if-else，不能处理 switch-case
      if (!process.env.LC_LANGUAGE) {
        i18nStore.addResource(editorPluginComponentLibraryStoreI18n)
      } else if (process.env.LC_LANGUAGE === EN_US) {
        i18nStore.addResource({
          [EN_US]: editorPluginComponentLibraryStoreI18nEnUs,
        })
      } else if (process.env.LC_LANGUAGE === ZH_CN) {
        i18nStore.addResource({
          [ZH_CN]: editorPluginComponentLibraryStoreI18nZhCn,
        })
      }
      //#endregion
      definePropertyByGetter(componentLibraryStore, 'selectedPkgName', () => {
        return layoutStore.uidlState.selectedPkgName || null
      })
      definePropertyByGetter(componentLibraryStore, 'activePkgName', () => {
        const { pds } = pdStore
        const { selectedPkgName } = componentLibraryStore
        if (isString(selectedPkgName) && selectedPkgName in pds) {
          return selectedPkgName
        }
        for (const pkgName in pds) return pkgName
        return null
      })
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      componentLibraryStore.selectComponentLibrary = (pkgName) => {
        layoutStore.setUidlState({
          selectedPkgName: pkgName,
        })
      }
      componentLibraryStore.createAndAndElement = action(
        (pkgName, componentType) => {
          const { selectedElement } = elementStore
          if (!elementStore.canAddElementByElement(selectedElement)) {
            console.error('Can not add element by', selectedElement)
            return
          }
          let element: ReturnType<typeof elementStore.createElement> | undefined
          uidlStore.edit(() => {
            element = elementStore.createElement(pkgName, componentType)
            elementStore.addElementByElement(element, selectedElement)
          })
          if (element) {
            elementStore.selectElement(element.id)
          }
        },
      )
      makeObservable(componentLibraryStore, {
        selectedPkgName: computed,
        activePkgName: computed,
      })
    },
  }
