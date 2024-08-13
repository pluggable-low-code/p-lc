import type { InitOptionsOfEditor } from '@p-lc/editor'
import lcTypesJson from '@p-lc/lc-types-ui/lc-types.json'
import type { Pd } from '@p-lc/pd'
import type { I18nLanguageResource, I18nResource } from '@p-lc/shared'
import { EN_US, ZH_CN } from '@p-lc/shared'
import { Flower } from 'iconoir-react'
import { initLcTypesPreviewerRuntime } from './previewer'
import type { LcTypesEditor } from './types'

/**
 * P-LC 网站链接
 */
const P_LC_WEBSITE_URL = 'https://p-lc.github.io'

/**
 * 国际化资源
 */
let i18n: I18nResource | undefined

const I18N_KEY_LOGO_TITLE = 'logoTitle'

/**
 * 国际化语言资源，英语（美国）
 */
const i18nEnUs: I18nLanguageResource = {
  [I18N_KEY_LOGO_TITLE]: 'LOW-CODE TYPES',
}

/**
 * 国际化语言资源，中文（中国）
 */
const i18nZhCn: I18nLanguageResource = {
  [I18N_KEY_LOGO_TITLE]: '低代码类型',
}

//#region i18n 摇树
// 打包器预处理，只能处理 if-else，不能处理 switch-case
if (!process.env.LC_LANGUAGE) {
  i18n = {
    [EN_US]: i18nEnUs,
    [ZH_CN]: i18nZhCn,
  }
} else if (process.env.LC_LANGUAGE === EN_US) {
  i18n = {
    [EN_US]: i18nEnUs,
  }
} else if (process.env.LC_LANGUAGE === ZH_CN) {
  i18n = {
    [ZH_CN]: i18nZhCn,
  }
}
//#endregion

/**
 * 低代码类型编辑器初始化选项
 */
export const lcTypesEditorInitOptions: Partial<
  InitOptionsOfEditor<LcTypesEditor>
> = {
  name: 'lc-types-editor',
  layout: {
    footer: {
      disable: true,
    },
  },
  i18n,
  pds: [lcTypesJson as unknown as Pd],
  initInlineRuntime: initLcTypesPreviewerRuntime,
  logo: {
    icon: <Flower />,
    iconLink: P_LC_WEBSITE_URL,
    title: {
      key: I18N_KEY_LOGO_TITLE,
    },
    titleLink: P_LC_WEBSITE_URL,
  },
}
