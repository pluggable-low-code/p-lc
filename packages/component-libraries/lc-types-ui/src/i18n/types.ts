import type {
  I18N_KEY_ADD,
  I18N_KEY_BIND,
  I18N_KEY_BOUND,
  I18N_KEY_CLEAR,
  I18N_KEY_DELETE,
  I18N_KEY_EDIT,
  I18N_KEY_NONE,
  I18N_KEY_SLOT,
} from './keys'

/**
 * 国际化键值
 */
export type I18nKeys =
  | typeof I18N_KEY_NONE
  | typeof I18N_KEY_BIND
  | typeof I18N_KEY_BOUND
  | typeof I18N_KEY_SLOT
  | typeof I18N_KEY_ADD
  | typeof I18N_KEY_DELETE
  | typeof I18N_KEY_EDIT
  | typeof I18N_KEY_CLEAR

/**
 * 国际化语言资源
 */
export type I18nLngRes = Record<I18nKeys, string>
