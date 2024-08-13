import type { EditorPlugin } from '@p-lc/editor'
import { EDITOR_EVENT_KEY_UIDL } from '@p-lc/editor'
import { filterNotNil, mapGroupBy } from '@p-lc/shared'
import { values } from 'lodash-uni'
import type {
  CdForPreview,
  PdForPreview,
  SyncPdRuntimeApis,
} from '../runtime-plugins'
import { type editorPluginPreviewerStore } from './editor-plugin-previewer-store'

/**
 * 编辑器预览器仓库同步 PD 插件属性扩展
 */
export interface EditorPluginPreviewerStoreSyncPdPropertiesExt {
  editor: {
    /**
     * 预览器仓库
     */
    previewerStore: {
      /**
       * 运行时调用
       */
      runtimeCall: SyncPdRuntimeApis
      /**
       * 获取预览用 PD
       */
      getPdsForPreview(): PdForPreview[]
    }
  }
}

/**
 * 编辑器预览器仓库同步 PD 插件
 */
export const editorPluginPreviewerStoreSyncPd: EditorPlugin<
  EditorPluginPreviewerStoreSyncPdPropertiesExt,
  typeof editorPluginPreviewerStore
> = {
  id: 'preview-store-sync-pd',
  initEditor(ctx) {
    const { emitter, previewerStore, pdStore, uidlStore } = ctx
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    previewerStore.getPdsForPreview = () => {
      const pkgNameMap = mapGroupBy(
        uidlStore.uidl?.components || [],
        (component) => component.pkgName,
      )
      const pkgNameComponentTypeMap = new Map(
        [...pkgNameMap].map(([pkgName, components]) => [
          pkgName,
          new Map(
            components.map((component) => [
              component.componentType,
              component.elementType,
            ]),
          ),
        ]),
      )
      return filterNotNil(values(pdStore.pds))
        .filter((pd) => pkgNameComponentTypeMap.has(pd.pkgName))
        .map(({ pkgName, pkgVersion, components }) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const set = pkgNameComponentTypeMap.get(pkgName)!
          return {
            pkgName,
            pkgVersion,
            components: components
              .filter((comp) => set.has(comp.type))
              .map(({ type, slots }) => {
                return {
                  type,
                  slots,
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  elementType: set.get(type)!,
                } satisfies CdForPreview
              }),
          }
        })
    }
    emitter.on(EDITOR_EVENT_KEY_UIDL, () => {
      previewerStore.runtimeCall.syncPd(previewerStore.getPdsForPreview())
    })
  },
}
