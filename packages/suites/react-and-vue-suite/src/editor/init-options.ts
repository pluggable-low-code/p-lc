import type { InitOptionsOfEditor } from '@p-lc/editor'
import { MonacoUidl } from '@p-lc/editor-monaco-plugins'
import { EN_US, ZH_CN } from '@p-lc/shared'
import { RavReactPreviewer } from './react-previewer'
import type { RavEditor } from './types'
import { RavVuePreviewer } from './vue-previewer'

/**
 * RAV 编辑器初始化选项
 */
export const ravEditorInitOptions: InitOptionsOfEditor<RavEditor> = {
  name: 'rav-editor',
  layout: {
    footer: {
      disable: true,
    },
    left: {
      Content: RavReactPreviewer,
    },
    body: {
      Content: MonacoUidl,
    },
    right: {
      Content: RavVuePreviewer,
    },
  },
  i18n: {
    [EN_US]: {
      somethingWentWrong: 'Something went wrong',
    },
    [ZH_CN]: {
      somethingWentWrong: '出错了',
    },
  },
}
