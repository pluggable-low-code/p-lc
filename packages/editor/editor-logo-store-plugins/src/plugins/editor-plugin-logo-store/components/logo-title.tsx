import { useEditor } from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import { TypographyTitleSmall4, withStylePropsMemo } from '@p-lc/react-shared'
import type { FC } from 'react'
import { useCallback } from 'react'
import styled from 'styled-components'
import type { LogoEditor } from '../../../types'

/**
 * 标识标题
 */
export const LogoTitle: FC<StyleProps> = withStylePropsMemo(() => {
  const {
    logoStore: { title, titleLink },
    i18nStore: { tText },
  } = useEditor<LogoEditor>()
  const handleClick = useCallback(() => {
    if (titleLink) open(titleLink)
  }, [titleLink])
  if (!title) return null
  return (
    <InternalLogoTitleContainer
      $hasLink={!!titleLink}
      onClick={handleClick}
      className="lc-logo-title"
    >
      {tText(title)}
    </InternalLogoTitleContainer>
  )
})

/**
 * 内部：标识标题容器
 */
export const InternalLogoTitleContainer = styled(TypographyTitleSmall4)<{
  $hasLink: boolean
}>`
  &&& {
    margin: 0 8px 0 0;
  }

  ${
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    (props) =>
      props.$hasLink && {
        cursor: 'pointer',
      }
  }
`
