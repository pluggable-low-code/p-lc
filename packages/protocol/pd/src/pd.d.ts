import type { Cd } from './cd'
import type { I18nResource, Text } from './i18n'

/**
 * 包声明
 */
export interface Pd<C extends Cd = Cd> {
  /**
   * 版本，是协议版本，不是内容版本
   */
  version?: string
  /**
   * 包名，和 package.json 保持一致
   */
  pkgName: string
  /**
   * 包版本，和 package.json 保持一致
   */
  pkgVersion: string
  /**
   * 名称（展示用）
   */
  name: Text
  /**
   * 组件
   */
  components: C[]
  /**
   * 国际化资源
   */
  i18n?: I18nResource
}
