import type { EditorPlugin } from '@p-lc/editor'
import { editorPluginEditorReactContext } from '@p-lc/editor'
import type { I18nLngRes } from '@p-lc/lc-types-ui'
import { I18nProvider } from '@p-lc/lc-types-ui'
import {
  enUs as lcTypesUiEnUs,
  zhCn as lcTypesUiZhCn,
} from '@p-lc/lc-types-ui/dist/i18n'
import { EN_US, POSITION_TYPE_BEFORE, ZH_CN } from '@p-lc/shared'
import { LcTypesUiAutoI18nProvider } from './lc-types-ui-auto-i18n-provider'

export * from './lc-types-ui-auto-i18n-provider'

/**
 * 编辑器低代码类型 UI 国际化插件属性扩展
 */
export interface EditorPluginLcTypesUiI18nPropertiesExt {
  editorInitOptions: {
    /**
     * 低代码类型 UI 国际化语言资源
     */
    lcTypesUiLngRes?: I18nLngRes
  }
}

/**
 * 编辑器低代码类型 UI 国际化插件
 */
export const editorPluginLcTypesUiI18n: EditorPlugin<EditorPluginLcTypesUiI18nPropertiesExt> =
  {
    id: 'lc-types-ui-i18n',
    position: {
      type: POSITION_TYPE_BEFORE,
      target: editorPluginEditorReactContext,
    },
    initEditor(ctx) {
      const {
        render: oldRender,
        initOptions: { lcTypesUiLngRes: initLngRes },
      } = ctx
      if (initLngRes) setRenderByLngRes(initLngRes)
      else {
        //#region i18n 摇树
        // 打包器预处理，只能处理 if-else，不能处理 switch-case
        if (!process.env.LC_LANGUAGE) {
          setRenderByLngRess({
            [EN_US]: lcTypesUiEnUs,
            [ZH_CN]: lcTypesUiZhCn,
          })
        } else if (process.env.LC_LANGUAGE === EN_US) {
          setRenderByLngRes(lcTypesUiEnUs)
        } else if (process.env.LC_LANGUAGE === ZH_CN) {
          setRenderByLngRes(lcTypesUiZhCn)
        }
        //#endregion
      }

      function setRenderByLngRes(lngRes: I18nLngRes): void {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        ctx.render = () => {
          return <I18nProvider value={lngRes}>{oldRender()}</I18nProvider>
        }
      }

      function setRenderByLngRess(lngRess: Record<string, I18nLngRes>): void {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        ctx.render = () => {
          return (
            <LcTypesUiAutoI18nProvider lngRess={lngRess}>
              {oldRender()}
            </LcTypesUiAutoI18nProvider>
          )
        }
      }
    },
  }
