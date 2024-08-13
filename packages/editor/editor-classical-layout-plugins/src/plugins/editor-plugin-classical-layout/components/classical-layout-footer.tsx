import { useEditor } from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import { withStylePropsMemo } from '@p-lc/react-shared'
import { VCVN_COLOR_BORDER, definedValues } from '@p-lc/shared'
import type { FC } from 'react'
import { useMemo } from 'react'
import styled from 'styled-components'
import type { ClassicalLayoutEditor } from '../../../types'
import type { ClassicalLayoutFooterConfig } from '../types'
import { ClassicalLayoutHeaderFooterContent } from './classical-layout-header-footer-content'

/**
 * 经典布局尾部
 */
export const ClassicalLayoutFooter: FC<StyleProps> = withStylePropsMemo(() => {
  const {
    layoutStore: {
      config: {
        footer: {
          disable = false,
          height = 24,
          Content = ClassicalLayoutHeaderFooterContent,
          contentItems = {},
        } = {},
      } = {},
    },
  } = useEditor<ClassicalLayoutEditor>()
  const items = useMemo(() => definedValues(contentItems), [contentItems])
  if (disable) {
    return null
  }
  return (
    <InternalClassicalLayoutFooterContainer
      $height={height}
      className="lc-cl-footer"
    >
      <Content items={items} />
    </InternalClassicalLayoutFooterContainer>
  )
})

/**
 * 内部：经典布局尾部容器
 */
export const InternalClassicalLayoutFooterContainer = styled.div<{
  $height: NonNullable<ClassicalLayoutFooterConfig['height']>
}>`
  ${
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    (props) => ({
      height: props.$height,
    })
  }
  width: 100%;
  display: flex;
  align-items: center;
  border-top: 1px solid ${VCVN_COLOR_BORDER};
  flex: none;
`
