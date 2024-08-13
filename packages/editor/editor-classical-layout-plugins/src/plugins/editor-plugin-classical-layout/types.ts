import type { StyleProps } from '@p-lc/react-shared'
import type { Text } from '@p-lc/shared'
import {
  type POSITION_TYPE_CENTER,
  type POSITION_TYPE_LEFT,
  type POSITION_TYPE_RIGHT,
} from '@p-lc/shared'
import type { FC } from 'react'

/**
 * 经典布局配置
 */
export interface ClassicalLayoutConfig {
  /**
   * 头部
   */
  header?: ClassicalLayoutHeaderConfig
  /**
   * 尾部
   */
  footer?: ClassicalLayoutFooterConfig
  /**
   * 左部
   */
  left?: ClassicalLayoutLeftConfig
  /**
   * 右部
   */
  right?: ClassicalLayoutRightConfig
  /**
   * 主体
   */
  body?: ClassicalLayoutBodyConfig
  /**
   * 组件
   */
  Component?: FC
}

/**
 * 经典布局头部配置
 */
export interface ClassicalLayoutHeaderConfig {
  /**
   * 禁用，默认：false
   */
  disable?: boolean
  /**
   * 组件
   */
  Component?: FC
  /**
   * 高度，默认：48
   */
  height?: number | string
  /**
   * 内容（组件）
   */
  Content?: FC<ClassicalLayoutHeaderFooterContentProps>
  /**
   * 内容条目，对象形式更好 merge，id -> 条目
   */
  contentItems?: Record<string, ClassicalLayoutHeaderFooterItem | undefined>
}

/**
 * 经典布局尾部配置
 */
export interface ClassicalLayoutFooterConfig {
  /**
   * 禁用，默认：false
   */
  disable?: boolean
  /**
   * 组件
   */
  Component?: FC
  /**
   * 高度，默认：24
   */
  height?: number | string
  /**
   * 内容（组件）
   */
  Content?: FC<ClassicalLayoutHeaderFooterContentProps>
  /**
   * 内容条目，对象形式更好 merge，id -> 条目
   */
  contentItems?: Record<string, ClassicalLayoutHeaderFooterItem | undefined>
}

/**
 * 经典布局头部、尾部内容属性
 */
export interface ClassicalLayoutHeaderFooterContentProps extends StyleProps {
  /**
   * 条目
   */
  items: ClassicalLayoutHeaderFooterItem[]
}

/**
 *  经典布局头部、尾部条目
 */
export interface ClassicalLayoutHeaderFooterItem {
  /**
   * 唯一标识
   */
  id: string
  /**
   * 类型，默认：left
   */
  type: ClassicalLayoutHeaderFooterItemType
  /**
   * 下标，小的在前，默认：Infinity
   */
  index?: number
  /**
   * 组件
   */
  Component: FC
}

/**
 * 经典布局头部、尾部条目类型
 */
export type ClassicalLayoutHeaderFooterItemType =
  | typeof POSITION_TYPE_LEFT
  | typeof POSITION_TYPE_CENTER
  | typeof POSITION_TYPE_RIGHT

/**
 * 经典布局左部配置
 */
export interface ClassicalLayoutLeftConfig {
  /**
   * 禁用，默认：false
   */
  disable?: boolean
  /**
   * 组件
   */
  Component?: FC
  /**
   * 宽度，默认：384
   */
  width?: number | string
  /**
   * 最小宽度，默认：200
   */
  minWidth?: number | string
  /**
   * 最大宽度，默认：45%
   */
  maxWidth?: number | string
  /**
   * 可调整大小，默认：true
   */
  resizable?: boolean
  /**
   * 内容（组件）
   */
  Content?: FC
  /**
   * 内容条目，对象形式更好 merge，id -> 条目
   */
  contentItems?: Record<string, ClassicalLayoutLeftItem | undefined>
  /**
   * 内容条目宽度，默认：48
   */
  contentItemWidth?: number
  /**
   * 内容条目高度，默认：48
   */
  contentItemHeight?: number
}

/**
 *  经典布局左部条目
 */
export interface ClassicalLayoutLeftItem {
  /**
   * 唯一标识
   */
  id: string
  /**
   * 下标，小的在前，默认：Infinity
   */
  index?: number
  /**
   * 组件
   */
  Component: FC<ClassicalLayoutLeftItemProps>
  /**
   * 图标
   */
  Icon: FC<ClassicalLayoutLeftItemIconProps>
  /**
   * 图标提示
   */
  iconTip: Text
}

/**
 * 经典布局左部条目属性
 */
export interface ClassicalLayoutLeftItemProps {
  /**
   * 是激活状态
   */
  isActive: boolean
}

/**
 * 经典布局左部条目图标属性
 */
export type ClassicalLayoutLeftItemIconProps = ClassicalLayoutLeftItemProps

/**
 * 经典布局右部配置
 */
export interface ClassicalLayoutRightConfig {
  /**
   * 禁用，默认：false
   */
  disable?: boolean
  /**
   * 组件
   */
  Component?: FC
  /**
   * 宽度，默认：384
   */
  width?: number | string
  /**
   * 最小宽度，默认：200
   */
  minWidth?: number | string
  /**
   * 最大宽度，默认：50%
   */
  maxWidth?: number | string
  /**
   * 可调整大小，默认：true
   */
  resizable?: boolean
  /**
   * 内容（组件）
   */
  Content?: FC
}

/**
 * 经典布局主体配置
 */
export interface ClassicalLayoutBodyConfig {
  /**
   * 禁用，默认：false
   */
  disable?: boolean
  /**
   * 组件
   */
  Component?: FC
  /**
   * 内容（组件）
   */
  Content?: FC
}

/**
 * 经典布局状态，可以整体保存、加载
 */
export interface ClassicalLayoutState {
  /**
   * 左部宽度
   */
  leftWidth: number | string
  /**
   * 右部宽度
   */
  rightWidth: number | string
  /**
   * 左部激活的条目 ID
   */
  leftActiveItemId?: string
}
