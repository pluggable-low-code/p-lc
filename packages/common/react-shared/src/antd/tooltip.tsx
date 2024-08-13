import { Tooltip } from 'antd'
import type { FC } from 'react'
import { memo } from 'react'

/**
 * 可以 styled 的文字提示，合并 overlayClassName 到 className
 */
export const StyleableTooltip = mergeOverlayClassName(Tooltip)

/**
 * 合并 overlayClassName 到 className
 * @param Comp 组件
 */
export function mergeOverlayClassName<
  Props extends { overlayClassName?: string; className?: string },
>(Comp: FC<Props>): FC<Props> {
  return memo((props) => {
    return (
      <Comp
        {...props}
        overlayClassName={props.overlayClassName || props.className}
        // 防止挂到子组件上
        className={undefined}
      />
    )
  })
}
