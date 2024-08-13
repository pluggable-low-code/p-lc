import {
  I18N_KEY_PLEASE_SELECT_ELEMENT,
  I18N_KEY_SOMETHING_WENT_WRONG_IN_CD,
} from './keys'
import type { EditorPluginElementAttributesStoreI18nLanguageResource } from './types'

/**
 * 编辑器元素属性仓库插件国际化语言资源，英语（美国）
 */
export const editorPluginElementAttributesStoreI18nEnUs: EditorPluginElementAttributesStoreI18nLanguageResource =
  {
    [I18N_KEY_SOMETHING_WENT_WRONG_IN_CD]:
      'Something went wrong in the component declaration (Cd)',
    [I18N_KEY_PLEASE_SELECT_ELEMENT]: 'Please select element',
  }
