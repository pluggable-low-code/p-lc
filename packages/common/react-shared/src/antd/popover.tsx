import { Popover } from 'antd'
import { mergeOverlayClassName } from './tooltip'

/**
 * antd 气泡卡片，合并 overlayClassName 到 className
 */
export const StyleablePopover = mergeOverlayClassName(Popover)
