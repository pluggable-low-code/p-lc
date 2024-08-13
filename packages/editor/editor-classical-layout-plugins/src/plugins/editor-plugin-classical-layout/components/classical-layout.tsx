import { useEditor } from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import { withStylePropsMemo } from '@p-lc/react-shared'
import type { FC } from 'react'
import styled from 'styled-components'
import type { ClassicalLayoutEditor } from '../../../types'
import { ClassicalLayoutBody } from './classical-layout-body'
import { ClassicalLayoutFooter } from './classical-layout-footer'
import { ClassicalLayoutHeader } from './classical-layout-header'
import { ClassicalLayoutLeft } from './classical-layout-left'
import { ClassicalLayoutRight } from './classical-layout-right'

/**
 * 经典布局
 */
export const ClassicalLayout: FC<StyleProps> = withStylePropsMemo(() => {
  const {
    layoutStore: {
      config: {
        header: { Component: HeaderComp = ClassicalLayoutHeader } = {},
        footer: { Component: FooterComp = ClassicalLayoutFooter } = {},
        left: { Component: LeftComp = ClassicalLayoutLeft } = {},
        right: { Component: RightComp = ClassicalLayoutRight } = {},
        body: { Component: BodyComp = ClassicalLayoutBody } = {},
      } = {},
    },
  } = useEditor<ClassicalLayoutEditor>()
  return (
    <InternalClassicalLayoutContainer className="lc-cl">
      <HeaderComp />
      <div className="lc-main">
        <LeftComp />
        <BodyComp />
        <RightComp />
      </div>
      <FooterComp />
    </InternalClassicalLayoutContainer>
  )
})

/**
 * 内部：经典布局容器
 */
export const InternalClassicalLayoutContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  * {
    box-sizing: border-box;
  }

  > .lc-main {
    display: flex;
    height: 0;
    flex: auto;
  }
`
