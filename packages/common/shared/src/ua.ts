/**
 * 是浏览器
 */
const IS_BROWSER = typeof navigator === 'object'

/**
 * 用户代理
 */
const USER_AGENT = IS_BROWSER ? getNavigator().userAgent : ''

/**
 * 是苹果设备
 */
export const IS_APPLE_DEVICE = /Mac|iPod|iPhone|iPad/i.test(USER_AGENT)

/**
 * 用户代理语言
 */
export const uaLanguages = IS_BROWSER ? getNavigator().languages : []

/**
 * 获取领航员
 */
function getNavigator(): typeof navigator {
  return navigator
}
