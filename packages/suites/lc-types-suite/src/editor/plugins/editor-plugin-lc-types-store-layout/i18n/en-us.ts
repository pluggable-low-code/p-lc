import {
  I18N_KEY_CD,
  I18N_KEY_CD_DESCRIPTION,
  I18N_KEY_CD_EXPORT_PATH,
  I18N_KEY_CD_GROUP_NAME,
  I18N_KEY_CD_HIDDEN,
  I18N_KEY_CD_ICON,
  I18N_KEY_CD_IMPL_FOR,
  I18N_KEY_CD_IMPL_IF,
  I18N_KEY_CD_IMPL_STYLE,
  I18N_KEY_CD_IMPLEMENTS,
  I18N_KEY_CD_INITIAL_VALUE,
  I18N_KEY_CD_METADATA,
  I18N_KEY_CD_NAME,
  I18N_KEY_CD_TYPE,
  I18N_KEY_EDIT_METADATA,
  I18N_KEY_PD_METADATA,
  I18N_KEY_PD_NAME,
} from './keys'
import type { EditorPluginLcTypesStoreLayoutI18nLanguageResource } from './types'

/**
 * 编辑器低代码类型仓库布局插件国际化语言资源，英语（美国）
 */
export const editorPluginLcTypesStoreLayoutI18nEnUs: EditorPluginLcTypesStoreLayoutI18nLanguageResource =
  {
    [I18N_KEY_CD]: 'Component declarations',
    [I18N_KEY_EDIT_METADATA]: 'Edit metadata',
    [I18N_KEY_CD_METADATA]: 'Component declaration metadata',
    [I18N_KEY_PD_METADATA]: 'Package declaration metadata',
    [I18N_KEY_CD_TYPE]: 'Type',
    [I18N_KEY_CD_NAME]: 'Name',
    [I18N_KEY_CD_GROUP_NAME]: 'Group name',
    [I18N_KEY_CD_DESCRIPTION]: 'Description',
    [I18N_KEY_CD_ICON]: 'Icon',
    [I18N_KEY_CD_HIDDEN]: 'Hidden',
    [I18N_KEY_CD_IMPLEMENTS]: 'Implements',
    [I18N_KEY_CD_IMPL_STYLE]: 'Style',
    [I18N_KEY_CD_IMPL_IF]: 'If',
    [I18N_KEY_CD_IMPL_FOR]: 'For',
    [I18N_KEY_CD_EXPORT_PATH]: 'Export Path',
    [I18N_KEY_CD_INITIAL_VALUE]: 'Initial Value',
    [I18N_KEY_PD_NAME]: 'Name',
  }
