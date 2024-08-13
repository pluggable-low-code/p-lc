/**
 * CSS 类名：lc-popup，约定组件库内自定义的弹窗需要加这个
 */
export const CLASS_NAME_LC_POPUP = 'lc-popup'

/**
 * 获取弹窗容器，一般是覆盖整个页面展示
 */
export interface GetPopupContainer {
  /**
   * 获取弹窗容器
   */
  (): HTMLElement
}

/**
 * 获取内部弹窗容器，一般是覆盖运行时的整个视图展示
 */
export interface GetInnerPopupContainer {
  /**
   * 获取内部弹窗容器（
   */
  (): HTMLElement
}
