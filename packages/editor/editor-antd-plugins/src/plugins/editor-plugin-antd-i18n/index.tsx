import type { EditorPlugin } from '@p-lc/editor'
import { editorPluginEditorReactContext } from '@p-lc/editor'
import { EN_US, POSITION_TYPE_BEFORE, ZH_CN } from '@p-lc/shared'
import { ConfigProvider } from 'antd'
import type { Locale } from 'antd/es/locale'
import antdEnUs from 'antd/locale/en_US'
import antdZhCn from 'antd/locale/zh_CN'
import { AntdAutoLocaleProvider } from './antd-auto-locale-provider'

export * from './antd-auto-locale-provider'

/**
 * 编辑器 antd 国际化插件属性扩展
 */
export interface EditorPluginAntdI18nPropertiesExt {
  editorInitOptions: {
    /**
     * antd 本地文本
     */
    antdLocale?: Locale
  }
}

/**
 * 编辑器 antd 国际化插件
 */
export const editorPluginAntdI18n: EditorPlugin<EditorPluginAntdI18nPropertiesExt> =
  {
    id: 'antd-i18n',
    position: {
      type: POSITION_TYPE_BEFORE,
      target: editorPluginEditorReactContext,
    },
    initEditor(ctx) {
      const {
        render: oldRender,
        initOptions: { antdLocale: initLocale },
      } = ctx
      if (initLocale) setRenderByLocale(initLocale)
      else {
        //#region i18n 摇树
        // 打包器预处理，只能处理 if-else，不能处理 switch-case
        if (!process.env.LC_LANGUAGE) {
          setRenderByLocales({
            [EN_US]: antdEnUs,
            [ZH_CN]: antdZhCn,
          })
        } else if (process.env.LC_LANGUAGE === EN_US) {
          setRenderByLocale(antdEnUs)
        } else if (process.env.LC_LANGUAGE === ZH_CN) {
          setRenderByLocale(antdZhCn)
        }
        //#endregion
      }

      function setRenderByLocale(locale: Locale): void {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        ctx.render = () => {
          return <ConfigProvider locale={locale}>{oldRender()}</ConfigProvider>
        }
      }

      function setRenderByLocales(locales: Record<string, Locale>): void {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        ctx.render = () => {
          return (
            <AntdAutoLocaleProvider locales={locales}>
              {oldRender()}
            </AntdAutoLocaleProvider>
          )
        }
      }
    },
  }
