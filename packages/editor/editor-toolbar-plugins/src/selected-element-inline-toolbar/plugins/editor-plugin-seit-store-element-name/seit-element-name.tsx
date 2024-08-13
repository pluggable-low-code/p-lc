import {
  DRAGGABLE_ENTITY_TYPE_ELEMENT,
  useDraggable,
  useEditor,
} from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import {
  ComponentIcon,
  TypographyText,
  withStylePropsObserver,
} from '@p-lc/react-shared'
import type { FC } from 'react'
import styled from 'styled-components'

/**
 * 选中元素内联工具栏元素名
 */
export const SeitElementName: FC<StyleProps> = withStylePropsObserver(() => {
  const {
    elementStore: { selectedElement },
    pdStore: { getComponentIconByEt },
  } = useEditor()
  const draggableProps = useDraggable(
    selectedElement && {
      type: DRAGGABLE_ENTITY_TYPE_ELEMENT,
      element: selectedElement,
    },
  )
  if (!selectedElement) return null
  const icon = getComponentIconByEt(selectedElement.type)
  return (
    <InternalSeitElementNameContainer
      {...draggableProps}
      className="lc-se-tool-title"
    >
      {icon && <ComponentIcon icon={icon} />}
      <TypographyText className="lc-name">
        {selectedElement.name}
      </TypographyText>
    </InternalSeitElementNameContainer>
  )
})

/**
 * 内部：选中元素内联工具栏元素名容器
 */
export const InternalSeitElementNameContainer = styled.div`
  user-select: none;
  display: flex;
  align-items: center;
  cursor: pointer;

  .lc-icon {
    img {
      filter: invert(1);
    }
  }

  .lc-name {
    color: inherit;
  }
`
