import type { EditorPlugin } from '@p-lc/editor'
import type { Cd, Initializer, Pd } from '@p-lc/pd'
import { deleteUndefinedValues } from '@p-lc/shared'
import type { FromDependenciesProCode } from '@p-lc/uidl'
import { CODE_TYPE_LOW } from '@p-lc/uidl-utils'
import { assign, fromPairs, keys } from 'lodash-uni'
import { action } from 'mobx'
import type { editorPluginLcTypesStore } from './editor-plugin-lc-types-store'
import type { editorPluginLcTypesUidl } from './editor-plugin-lc-types-uidl'

/**
 * 编辑器低代码类型仓库元数据插件属性扩展
 */
export interface EditorPluginLcTypesStoreMetadataPropertiesExt {
  editor: {
    /**
     * 低代码类型仓库
     */
    lcTypesStore: {
      /**
       * 获取元数据表单值
       */
      getMetadataFormValues(): MetadataFormValues
      /**
       * 设置元数据表单值
       * @param formValues 元数据表单值
       */
      setMetadataFormValues(formValues: MetadataFormValues): void
    }
  }
}

/**
 * 元数据表单值
 */
export interface MetadataFormValues
  extends Pick<
    Cd,
    'type' | 'name' | 'groupName' | 'description' | 'icon' | 'hidden'
  > {
  /**
   * 实现的能力
   */
  implements?: string[]
  /**
   * 导出路径
   */
  exportPath?: FromDependenciesProCode['exportPath']
  /**
   * 初始值
   */
  initialValue?: Initializer['partialElement']
  /**
   * PD 名称
   */
  pdName: Pd['name']
}

/**
 * 编辑器低代码类型仓库元数据插件
 */
export const editorPluginLcTypesStoreMetadata: EditorPlugin<
  EditorPluginLcTypesStoreMetadataPropertiesExt,
  typeof editorPluginLcTypesStore | typeof editorPluginLcTypesUidl
> = {
  id: 'lc-types-store-metadata',
  initEditor(ctx) {
    const { lcTypesStore, uidlStore } = ctx
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    lcTypesStore.getMetadataFormValues = () => {
      const {
        pd: { name: pdName },
        selectedCd: {
          type,
          name,
          groupName,
          description,
          icon,
          hidden,
          implements: impls,
          code,
          initializer,
        },
      } = lcTypesStore
      const formValues: MetadataFormValues = {
        type,
        name,
        groupName,
        description,
        icon,
        hidden,
        pdName,
        implements: keys(impls),
        exportPath: code.type !== CODE_TYPE_LOW ? code.exportPath : undefined,
        initialValue: initializer?.partialElement,
      }
      return formValues
    }
    lcTypesStore.setMetadataFormValues = action(
      ({
        type,
        name,
        groupName,
        description,
        icon,
        hidden,
        implements: impls,
        exportPath,
        initialValue,
        pdName,
      }) => {
        uidlStore.edit((uidl) => {
          deleteUndefinedValues(
            assign(uidl, {
              type,
              name,
              groupName,
              description,
              icon,
              hidden: hidden || undefined,
              implements: impls?.length
                ? fromPairs(impls.map((i) => [i, true]))
                : undefined,
              code: exportPath && { importPath: exportPath, exportPath },
              initializer: initialValue && { partialElement: initialValue },
            } satisfies Partial<Cd>),
          )
        })
        lcTypesStore.editPd((pd) => {
          pd.name = pdName
        })
        lcTypesStore.selectCd(type)
      },
    )
  },
}
