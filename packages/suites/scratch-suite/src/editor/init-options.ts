import type { InitOptionsOfEditor } from '@p-lc/editor'
import { MonacoUidl } from '@p-lc/editor-monaco-plugins'
import { EN_US, ZH_CN } from '@p-lc/shared'
import { ScratchPreviewer } from './previewer'
import type { ScratchEditor } from './types'

/**
 * 起步编辑器初始化选项
 */
export const scratchEditorInitOptions: InitOptionsOfEditor<ScratchEditor> = {
  layout: {
    footer: {
      disable: true,
    },
    left: {
      disable: true,
    },
    body: {
      Content: MonacoUidl,
    },
    right: {
      Content: ScratchPreviewer,
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
