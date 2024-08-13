import type { DomDataLcSlot } from '@p-lc/previewer'
import type { StyleProps } from '@p-lc/react-shared'
import { withStylePropsMemo } from '@p-lc/react-shared'
import { jsonStringify } from '@p-lc/shared'
import { Collapse } from 'iconoir-react'
import type { FC } from 'react'
import { useMemo } from 'react'
import styled from 'styled-components'

/**
 * 插槽占位属性
 */
export interface SlotPlaceholderProps extends StyleProps, DomDataLcSlot {}

/**
 * 插槽占位
 */
export const SlotPlaceholder: FC<SlotPlaceholderProps> = withStylePropsMemo(
  ({ elementId, slotLogicPath, dynamicRender }) => {
    const lcSlot = useMemo(() => {
      return jsonStringify({
        elementId,
        slotLogicPath,
        dynamicRender,
      } satisfies DomDataLcSlot)
    }, [dynamicRender, elementId, slotLogicPath])
    return (
      <InternalSlotPlaceholderContainer
        className="lc-slot-placeholder"
        data-lc-slot={lcSlot}
      >
        <Collapse />
      </InternalSlotPlaceholderContainer>
    )
  },
)

/**
 * 内部插槽占位容器
 */
export const InternalSlotPlaceholderContainer = styled.div`
  min-height: 100%;
  height: 48px;
  max-height: 100%;
  min-width: 100%;
  width: 48px;
  max-width: 100%;
  flex: auto;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
`
