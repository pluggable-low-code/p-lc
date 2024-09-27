import {
  I18N_KEY_I18N_EDIT_ADD_KEY,
  I18N_KEY_I18N_EDIT_DELETE_KEY,
  I18N_KEY_I18N_EDIT_EDIT_KEY,
  I18N_KEY_I18N_EDIT_KEY,
  I18N_KEY_I18N_EDIT_KEY_EXISTS,
  I18N_KEY_I18N_EDIT_NONE,
  I18N_KEY_I18N_EDIT_SEARCH,
  I18N_KEY_I18N_EDIT_TITLE,
} from './keys'
import type { EditorPluginI18nEditStoreI18nLanguageResource } from './types'

/**
 * 编辑器国际化编辑仓库插件国际化语言资源，英语（美国）
 */
export const editorPluginI18nEditStoreI18nEnUs: EditorPluginI18nEditStoreI18nLanguageResource =
  {
    [I18N_KEY_I18N_EDIT_TITLE]: 'I18n',
    [I18N_KEY_I18N_EDIT_SEARCH]: 'Search',
    [I18N_KEY_I18N_EDIT_NONE]: 'None',
    [I18N_KEY_I18N_EDIT_ADD_KEY]: 'Add key',
    [I18N_KEY_I18N_EDIT_EDIT_KEY]: 'Edit key',
    [I18N_KEY_I18N_EDIT_DELETE_KEY]: 'Delete key',
    [I18N_KEY_I18N_EDIT_KEY]: 'Key',
    [I18N_KEY_I18N_EDIT_KEY_EXISTS]: 'Duplicate keys are not allowed',
  }
