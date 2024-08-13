import { useDragAutoScrollRef, useEditor } from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import {
  TypographyTitleSmall5,
  withStylePropsObserver,
} from '@p-lc/react-shared'
import type { FC } from 'react'
import styled from 'styled-components'
import type { ElementTreeEditor } from '../../../types'
import { I18N_KEY_ELEMENT_TREE_TITLE } from '../i18n'

/**
 * 元素树属性
 */
export interface ElementTreeProps extends StyleProps {
  /**
   * 是激活状态
   */
  isActive: boolean
}

/**
 * 元素树
 */
export const ElementTree: FC<ElementTreeProps> = withStylePropsObserver(() => {
  const {
    uidlStore: { uidl },
    elementTreeStore: {
      setEl,
      components: { ElementTreeNode: EtNode },
    },
    i18nStore: { t },
  } = useEditor<ElementTreeEditor>()
  const refElRootContainer = useDragAutoScrollRef<HTMLDivElement>()
  if (!uidl) return null
  return (
    <InternalElementTreeContainer className="lc-et" ref={setEl}>
      <TypographyTitleSmall5>
        {t(I18N_KEY_ELEMENT_TREE_TITLE)}
      </TypographyTitleSmall5>
      <div className="lc-et-root-container" ref={refElRootContainer}>
        <EtNode element={uidl.view} />
      </div>
    </InternalElementTreeContainer>
  )
})

/**
 * 内部：元素树容器
 */
export const InternalElementTreeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .lc-et-root-container {
    height: 0;
    flex: auto;
    overflow: auto;
    padding: 8px 0;
    margin-top: -8px;
  }
`
