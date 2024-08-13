/**
 * 国际化资源
 */
export interface I18nResource {
  [language: string]: I18nLanguageResource
}

/**
 * 国际化语言资源
 */
export interface I18nLanguageResource {
  [key: string]: string
}

/**
 * 文本
 */
export type Text<T extends string = string> = StringText | I18nText<T>

/**
 * 字符串文本
 */
export type StringText = string

/**
 * 国际化文本
 */
export interface I18nText<T extends string = string> {
  /**
   * 类型
   */
  type?: 'i18n'
  /**
   * （国际化语言资源的）键值
   */
  key: T
}
