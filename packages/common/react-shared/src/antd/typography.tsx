import { Tooltip, Typography } from 'antd'
import {
  memo,
  useState,
  type ComponentProps,
  type FC,
  type MouseEventHandler,
} from 'react'
import styled from 'styled-components'
import { useLatestFn } from '../hooks'

const {
  Text: TypographyText,
  Paragraph: TypographyParagraph,
  Title: TypographyTitle,
} = Typography

export { TypographyParagraph, TypographyText }

/**
 * 五级小标题
 */
export const TypographyTitleSmall5 = styled(TypographyTitle).attrs({
  level: 5,
})`
  margin: 8px;
`

/**
 * 四级小标题
 */
export const TypographyTitleSmall4: typeof TypographyTitle = styled(
  TypographyTitle,
).attrs({
  level: 4,
})`
  margin: 8px;
`

/**
 * 排版文本提示属性
 */
export interface TypographyTextTipProps
  extends ComponentProps<typeof TypographyText> {
  /**
   * 提示
   */
  tip?: string
  children?: string
}

/**
 * 排版文本提示
 */
export const TypographyTextTip: FC<TypographyTextTipProps> = memo(
  ({ tip, children, ...restProps }) => {
    return tip ? (
      <Tooltip title={tip}>
        <TypographyText {...restProps}>{children}</TypographyText>
      </Tooltip>
    ) : (
      <TypographyTextAutoEllipsis {...restProps}>
        {children}
      </TypographyTextAutoEllipsis>
    )
  },
)

/**
 * 排版（文本）带提示的省略
 */
const typographyEllipsisWithTooltip: NonNullable<
  ComponentProps<typeof TypographyText>['ellipsis']
> = {
  tooltip: true,
}

/**
 * 排版文本自动省略
 *
 * Typography.Text 性能比较差，加了 ellipsis 更差，加了 ellipsis.tooltip 非常差
 */
const TypographyTextAutoEllipsis: FC<TypographyTextTipProps> = ({
  onMouseEnter,
  children,
  ...restProps
}) => {
  const [entered, setEntered] = useState(false)
  const handleTypographyTextMouseEnter: MouseEventHandler<HTMLElement> =
    useLatestFn((ev) => {
      setEntered(true)
      onMouseEnter?.(ev)
    })
  return (
    <TypographyText
      ellipsis={entered ? typographyEllipsisWithTooltip : true}
      {...restProps}
      onMouseEnter={handleTypographyTextMouseEnter}
    >
      {children}
    </TypographyText>
  )
}
