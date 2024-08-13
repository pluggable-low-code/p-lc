import { useEditor } from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import { withStylePropsObserver } from '@p-lc/react-shared'
import type { FC } from 'react'
import styled from 'styled-components'
import type { ElementAttributesEditor } from '../../../types'
import { ElementAttributesEmpty } from './element-attributes-empty'
import { ElementAttributesRuntime } from './element-attributes-runtime'

/**
 * 元素属性（Attribute）属性
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ElementAttributesProps extends StyleProps {}

/**
 * 元素属性
 */
export const ElementAttributes: FC<ElementAttributesProps> =
  withStylePropsObserver(() => {
    const {
      elementStore: { selectedCd },
    } = useEditor<ElementAttributesEditor>()
    return (
      <InternalElementAttributesContainer className="lc-el-attrs">
        {selectedCd ? <ElementAttributesRuntime /> : <ElementAttributesEmpty />}
      </InternalElementAttributesContainer>
    )
  })

/**
 * 内部：元素属性容器
 */
export const InternalElementAttributesContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .lc-el-attrs-runtime {
    height: 0;
    flex: auto;
  }
`
