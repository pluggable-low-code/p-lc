import type {
  DepPluginUniteEditorPlugin,
  Editor,
  EditorPlugin,
} from '@p-lc/editor'
import {
  EDITOR_EVENT_KEY_UIDL,
  EDITOR_EVENT_UIDL_TYPE_UPDATE,
} from '@p-lc/editor'
import type { LcTypesRuntimeData } from '@p-lc/lc-types-react-runtime'
import type { LcTypesUidl } from '@p-lc/lc-types-uidl'
import {
  cdToLcTypesUidlBase,
  editPdByLcTypesUidl,
} from '@p-lc/lc-types-uidl-utils'
import type { Cd, Pd } from '@p-lc/pd'
import {
  definePropertyByGetter,
  getObjectValueOrFirstValue,
  LocalStorageDataLoader,
  PKG_NAME_LC_TYPES_UI,
  V_0_0_1,
} from '@p-lc/shared'
import type { Draft } from 'immer'
import { produce } from 'immer'
import { fromPairs } from 'lodash-uni'
import { action, computed, makeObservable, observable } from 'mobx'
import { type editorPluginLcTypesUidl } from './editor-plugin-lc-types-uidl'

/**
 * 编辑器低代码类型仓库插件属性扩展
 */
export interface EditorPluginLcTypesStorePropertiesExt {
  editor: {
    /**
     * 低代码类型仓库
     */
    lcTypesStore: {
      /**
       * （正在编辑的）PD
       */
      pd: Pd
      /**
       * 编辑 PD
       * @param recipe 配方函数
       */
      editPd(recipe: (draft: Draft<Pd>) => Draft<Pd> | void): void
      /**
       * CD 对照表，组件类型 -> CD
       */
      cds: Record<string, Cd>
      /**
       * 选中的组件类型
       */
      selectedComponentType: string
      /**
       * 选中的 CD
       */
      selectedCd: Cd
      /**
       * 选中的 CD 下标
       */
      selectedCdIndex: number
      /**
       * 选中 CD
       * @param componentType 组件类型
       */
      selectCd(componentType: string): void
      /**
       * 创建 CD
       */
      createCd(): void
      /**
       * 删除 CD
       * @param componentType 组件类型
       */
      deleteCd(componentType: string): void
      /**
       * 设置 CD
       * @param componentType 组件类型
       * @param cd CD
       */
      setCd(componentType: string, cd: Cd): void
      /**
       * 编辑中的数据
       */
      editingData: LcTypesRuntimeData
      /**
       * 设置编辑中的数据
       */
      setEditingData(data: LcTypesRuntimeData): void
      /**
       * 获取低代码类型 UI 版本
       */
      getLcTypesUiVersion(): string | null
    }
  }
  editorInitOptions: {
    /**
     * （需要编辑的）包声明
     */
    pd: Pd
  }
}

/**
 * 创建默认低代码类型组件声明
 * @param ctx 上下文，编辑器
 */
export function createDefaultLcTypesCd(
  ctx: Editor<DepPluginUniteEditorPlugin<typeof editorPluginLcTypesStore>>,
): Cd {
  const {
    i18nStore: { t },
  } = ctx
  return {
    type: 'Component',
    name: 'Component',
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
      name: t('attrRootName', { pkgName: PKG_NAME_LC_TYPES_UI }),
      type: 'AttrRoot_0',
    },
    code: {
      exportPath: ['Component'],
    },
  }
}

/**
 * 编辑器低代码类型仓库插件
 */
export const editorPluginLcTypesStore: EditorPlugin<
  EditorPluginLcTypesStorePropertiesExt,
  typeof editorPluginLcTypesUidl
> = {
  id: 'lc-types-store',
  initEditor(ctx) {
    const { name: editorName, uidlStore, emitter, i18nStore, pdStore } = ctx
    const lcTypesStore = (ctx.lcTypesStore = {} as typeof ctx.lcTypesStore)
    lcTypesStore.pd = ctx.initOptions.pd
    lcTypesStore.editPd = action((recipe) => {
      lcTypesStore.pd = produce(lcTypesStore.pd, recipe)
    })
    lcTypesStore.editPd(({ components }) => {
      if (!components.length) {
        components.push(createDefaultLcTypesCd(ctx))
      }
    })
    const firstComponentType = lcTypesStore.pd.components[0].type
    const selectedComponentTypeLoader = new LocalStorageDataLoader(
      `${editorName}:${lcTypesStore.pd.pkgName}:selected-component-type`,
      firstComponentType,
    )
    definePropertyByGetter(lcTypesStore, 'cds', () => {
      return fromPairs(
        lcTypesStore.pd.components.map((comp) => [comp.type, comp]),
      )
    })
    lcTypesStore.selectedComponentType = loadSelectedComponentType()
    definePropertyByGetter(
      lcTypesStore,
      'selectedCd',
      () => lcTypesStore.cds[lcTypesStore.selectedComponentType],
    )
    definePropertyByGetter(lcTypesStore, 'selectedCdIndex', () =>
      lcTypesStore.pd.components.findIndex(
        (component) => component === lcTypesStore.selectedCd,
      ),
    )
    lcTypesStore.selectCd = action((componentType) => {
      lcTypesStore.selectedComponentType = componentType
      initUidlAndDataBySelectedCd()
      selectedComponentTypeLoader.save(componentType)
    })
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    lcTypesStore.createCd = () => {
      const cd = createDefaultLcTypesCd(ctx)
      const { type, name } = cd
      for (let i = 1; cd.type in lcTypesStore.cds; i++) {
        cd.type = `${type} ${i}`
        cd.name = `${name} ${i}`
      }
      lcTypesStore.editPd((pd) => {
        pd.components.push(cd)
      })
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    lcTypesStore.deleteCd = (componentType) => {
      lcTypesStore.editPd((pd) => {
        pd.components = pd.components.filter(
          (comp) => comp.type != componentType,
        )
      })
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    lcTypesStore.setCd = (componentType, cd) => {
      lcTypesStore.editPd((pd) => {
        pd.components = pd.components.map((comp) =>
          comp.type === componentType ? cd : comp,
        )
      })
    }
    lcTypesStore.editingData = { uidlElement: null }
    lcTypesStore.setEditingData = action(
      (data) => (lcTypesStore.editingData = data),
    )
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    lcTypesStore.getLcTypesUiVersion = () => {
      return pdStore.pds[PKG_NAME_LC_TYPES_UI]?.pkgVersion || null
    }
    makeObservable(lcTypesStore, {
      pd: observable.ref,
      cds: computed,
      selectedComponentType: observable,
      selectedCd: computed,
      selectedCdIndex: computed,
      editingData: observable.ref,
    })
    let initUidlAndPd: [LcTypesUidl, Pd] | undefined
    initUidlAndDataBySelectedCd()
    emitter.on(EDITOR_EVENT_KEY_UIDL, ({ type: evType, uidl }) => {
      if (evType === EDITOR_EVENT_UIDL_TYPE_UPDATE) {
        const { selectedCdIndex } = lcTypesStore
        if (selectedCdIndex !== -1) {
          lcTypesStore.editPd((pd) => {
            if (uidl === initUidlAndPd?.[0]) {
              return initUidlAndPd[1]
            }
            editPdByLcTypesUidl(uidl, pd, selectedCdIndex)
          })
        }
      }
    })

    function loadSelectedComponentType(): string {
      const type = selectedComponentTypeLoader.load()
      if (type in lcTypesStore.cds) {
        return type
      }
      return firstComponentType
    }

    function initUidlAndDataBySelectedCd(): void {
      const { pd, selectedCd } = lcTypesStore
      lcTypesStore.setEditingData({
        uidlElement: {
          type: '',
          id: '',
          name: '',
          ...getObjectValueOrFirstValue(
            selectedCd.initializer?.partialElement,
            i18nStore.language,
          ),
        },
      })
      const uidl = cdToLcTypesUidlBase(selectedCd, pd)
      // 这里暂时不做 implements 的应用
      initUidlAndPd = [uidl, pd]
      uidlStore.init(uidl)
    }
  },
}
