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
 * 编辑器低代码类型仓库布局插件国际化语言资源，中文（中国）
 */
export const editorPluginLcTypesStoreLayoutI18nZhCn: EditorPluginLcTypesStoreLayoutI18nLanguageResource =
  {
    [I18N_KEY_CD]: '组件声明',
    [I18N_KEY_EDIT_METADATA]: '编辑元数据',
    [I18N_KEY_CD_METADATA]: '组件声明元数据',
    [I18N_KEY_PD_METADATA]: '包声明元数据',
    [I18N_KEY_CD_TYPE]: '类型',
    [I18N_KEY_CD_NAME]: '名称',
    [I18N_KEY_CD_GROUP_NAME]: '组名称',
    [I18N_KEY_CD_DESCRIPTION]: '描述',
    [I18N_KEY_CD_ICON]: '图标',
    [I18N_KEY_CD_HIDDEN]: '隐藏',
    [I18N_KEY_CD_IMPLEMENTS]: '实现',
    [I18N_KEY_CD_IMPL_STYLE]: '样式',
    [I18N_KEY_CD_IMPL_IF]: '条件渲染',
    [I18N_KEY_CD_IMPL_FOR]: '列表渲染',
    [I18N_KEY_CD_EXPORT_PATH]: '导出路径',
    [I18N_KEY_CD_INITIAL_VALUE]: '初始值',
    [I18N_KEY_PD_NAME]: '名称',
  }
