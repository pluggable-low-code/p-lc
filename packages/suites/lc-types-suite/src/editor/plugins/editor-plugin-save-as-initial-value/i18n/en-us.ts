import {
  I18N_KEY_SAVE_AS_INITIAL_VALUE,
  I18N_KEY_SAVE_AS_INITIAL_VALUE_MSG,
} from './keys'
import type { EditorPluginSaveAsInitialValueI18nLanguageResource } from './types'

/**
 * 编辑器另存为初始值插件国际化语言资源，英语（美国）
 */
export const editorPluginSaveAsInitialValueI18nEnUs: EditorPluginSaveAsInitialValueI18nLanguageResource =
  {
    [I18N_KEY_SAVE_AS_INITIAL_VALUE]: 'Save as initial value',
    [I18N_KEY_SAVE_AS_INITIAL_VALUE_MSG]:
      'The current editing data has been stored in the component declaration metadata as an initial value.',
  }
