import { useLatestFn } from '@p-lc/react-shared'
import type { AnyObject } from '@p-lc/shared'
import type { FC, ReactNode } from 'react'
import { memo } from 'react'
import styled from 'styled-components'
import { useEditor } from '../editor-plugin-editor-react-context'

/**
 * 根属性
 */
export interface RootProps {
  children?: ReactNode
}

/**
 * 根
 */
export const Root: FC<RootProps> = memo(({ children }) => {
  const ctx = useEditor()
  const ref = useLatestFn((el: HTMLDivElement) => {
    ctx.elRoot = el
  })
  const {
    styleStore: { cssVars },
  } = ctx
  return (
    <InternalRootContainer className="lc-root" $cssVars={cssVars} ref={ref}>
      {children}
    </InternalRootContainer>
  )
})

/**
 * 内部根容器
 */
export const InternalRootContainer = styled.div<{ $cssVars: AnyObject }>`
  ${
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    (props) => props.$cssVars
  }
  width: 100%;
  height: 100%;
`
