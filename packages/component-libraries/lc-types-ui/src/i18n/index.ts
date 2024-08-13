import {
  I18N_KEY_ADD,
  I18N_KEY_BIND,
  I18N_KEY_BOUND,
  I18N_KEY_CLEAR,
  I18N_KEY_DELETE,
  I18N_KEY_EDIT,
  I18N_KEY_NONE,
  I18N_KEY_SLOT,
} from './keys'
import type { I18nLngRes } from './types'

export const enUs: I18nLngRes = {
  [I18N_KEY_NONE]: 'No Attributes',
  [I18N_KEY_BIND]: 'Bind',
  [I18N_KEY_BOUND]: 'Bound',
  [I18N_KEY_SLOT]: 'Slot',
  [I18N_KEY_ADD]: 'Add',
  [I18N_KEY_DELETE]: 'Delete',
  [I18N_KEY_EDIT]: 'Edit',
  [I18N_KEY_CLEAR]: 'Clear',
}

export const zhCn: I18nLngRes = {
  [I18N_KEY_NONE]: '没有属性',
  [I18N_KEY_BIND]: '绑定',
  [I18N_KEY_BOUND]: '已绑定',
  [I18N_KEY_SLOT]: '插槽',
  [I18N_KEY_ADD]: '添加',
  [I18N_KEY_DELETE]: '删除',
  [I18N_KEY_EDIT]: '编辑',
  [I18N_KEY_CLEAR]: '清除',
}
