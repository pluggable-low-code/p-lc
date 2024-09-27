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
 * 编辑器国际化编辑仓库插件国际化语言资源，中文（中国）
 */
export const editorPluginI18nEditStoreI18nZhCn: EditorPluginI18nEditStoreI18nLanguageResource =
  {
    [I18N_KEY_I18N_EDIT_TITLE]: '国际化',
    [I18N_KEY_I18N_EDIT_SEARCH]: '搜索',
    [I18N_KEY_I18N_EDIT_NONE]: '没有键值',
    [I18N_KEY_I18N_EDIT_ADD_KEY]: '添加键值',
    [I18N_KEY_I18N_EDIT_EDIT_KEY]: '编辑键值',
    [I18N_KEY_I18N_EDIT_DELETE_KEY]: '删除键值',
    [I18N_KEY_I18N_EDIT_KEY]: '键值',
    [I18N_KEY_I18N_EDIT_KEY_EXISTS]: '不允许重复键值',
  }
