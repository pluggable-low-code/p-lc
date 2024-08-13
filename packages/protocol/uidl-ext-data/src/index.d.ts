/**
 * UIDL 数据扩展
 */
export interface UidlExtData {
  /**
   * 数据（初始值）
   */
  data?: UidlData
}

/**
 * UIDL 数据
 */
export type UidlData = Record<string, unknown>
