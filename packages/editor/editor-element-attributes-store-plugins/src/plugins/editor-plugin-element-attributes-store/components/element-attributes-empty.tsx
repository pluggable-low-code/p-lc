import { useEditor } from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import { TypographyTitleSmall5, withStylePropsMemo } from '@p-lc/react-shared'
import type { FC } from 'react'
import styled from 'styled-components'
import type { ElementAttributesEditor } from '../../../types'
import { I18N_KEY_PLEASE_SELECT_ELEMENT } from '../i18n'

/**
 * 元素属性（Attribute）空属性
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ElementAttributesEmptyProps extends StyleProps {}

/**
 * 元素属性空，没有对应的组件声明
 */
export const ElementAttributesEmpty: FC<ElementAttributesEmptyProps> =
  withStylePropsMemo(() => {
    const {
      i18nStore: { t },
    } = useEditor<ElementAttributesEditor>()
    return (
      <InternalElementAttributesEmptyContainer className="lc-el-attrs-empty">
        <TypographyTitleSmall5 type="secondary">
          {t(I18N_KEY_PLEASE_SELECT_ELEMENT)}
        </TypographyTitleSmall5>
      </InternalElementAttributesEmptyContainer>
    )
  })

/**
 * 内部：元素属性空容器
 */
export const InternalElementAttributesEmptyContainer = styled.div`
  padding-top: 100px;
  text-align: center;

  &&& .ant-typography {
    font-weight: normal;
  }
`
