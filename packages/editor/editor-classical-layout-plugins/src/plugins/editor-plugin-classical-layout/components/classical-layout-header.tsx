import { useEditor } from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import { withStylePropsMemo } from '@p-lc/react-shared'
import { VCVN_COLOR_BORDER, definedValues } from '@p-lc/shared'
import type { FC } from 'react'
import { useMemo } from 'react'
import styled from 'styled-components'
import type { ClassicalLayoutEditor } from '../../../types'
import type { ClassicalLayoutHeaderConfig } from '../types'
import { ClassicalLayoutHeaderFooterContent } from './classical-layout-header-footer-content'

/**
 * 经典布局头部
 */
export const ClassicalLayoutHeader: FC<StyleProps> = withStylePropsMemo(() => {
  const {
    layoutStore: {
      config: {
        header: {
          disable = false,
          height = 48,
          Content = ClassicalLayoutHeaderFooterContent,
          contentItems,
        } = {},
      } = {},
    },
  } = useEditor<ClassicalLayoutEditor>()
  const items = useMemo(() => definedValues(contentItems), [contentItems])
  if (disable) {
    return null
  }
  return (
    <InternalClassicalLayoutHeaderContainer
      $height={height}
      className="lc-cl-header"
    >
      <Content items={items} />
    </InternalClassicalLayoutHeaderContainer>
  )
})

/**
 * 内部：经典布局头部容器
 */
export const InternalClassicalLayoutHeaderContainer = styled.div<{
  $height: NonNullable<ClassicalLayoutHeaderConfig['height']>
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
  border-bottom: 1px solid ${VCVN_COLOR_BORDER};
  flex: none;
`
