import type { StyleProps } from '@p-lc/react-shared'
import { TypographyTitleSmall5, withStylePropsMemo } from '@p-lc/react-shared'
import type { FC } from 'react'
import styled from 'styled-components'
import { useI18nText } from '../i18n/context'
import { I18N_KEY_NONE } from '../i18n/keys'

/**
 * 没有属性
 */
export const AttrNone: FC<StyleProps> = withStylePropsMemo(() => {
  const textNone = useI18nText(I18N_KEY_NONE)
  return (
    <InternalAttrNoneContainer className="lc-attr-none">
      <TypographyTitleSmall5 type="secondary">{textNone}</TypographyTitleSmall5>
    </InternalAttrNoneContainer>
  )
})

/**
 * 内部：没有属性容器
 */
const InternalAttrNoneContainer = styled.div`
  padding-top: 100px;
  text-align: center;

  &&& .ant-typography {
    font-weight: normal;
  }
`
