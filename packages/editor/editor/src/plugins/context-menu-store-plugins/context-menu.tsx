import type { StyleProps } from '@p-lc/react-shared'
import {
  StyleablePopover,
  useLatestFn,
  withStylePropsObserver,
} from '@p-lc/react-shared'
import { VCVN_Z_INDEX_MAX } from '@p-lc/shared'
import { Menu } from 'antd'
import type { MenuItemType } from 'antd/es/menu/interface'
import type { CSSProperties, FC } from 'react'
import React, { useMemo, useRef } from 'react'
import styled from 'styled-components'
import { useEditor } from '../editor-plugin-editor-react-context'

/**
 * 上下文菜单属性
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ContextMenuProps extends StyleProps {}

/**
 * 上下文菜单
 */
export const ContextMenu: FC<ContextMenuProps> = withStylePropsObserver(() => {
  const {
    contextMenuStore: { visible, displayPoint, matchedItems, close },
    i18nStore: { tText },
  } = useEditor()
  const refElContextMenu = useRef<HTMLDivElement>(null)
  const getPopupContainer = useLatestFn(
    () => refElContextMenu.current || document.body,
  )
  const anchorStyle = useMemo(
    () =>
      ({
        left: displayPoint.x,
        top: displayPoint.y,
      }) satisfies CSSProperties,
    [displayPoint],
  )
  const menuItems: MenuItemType[] = useMemo(
    () =>
      matchedItems.map(({ id, label }) => ({ key: id, label: tText(label) })),
    [matchedItems, tText],
  )
  const handleContainerContextMenu = useLatestFn((ev: React.MouseEvent) => {
    ev.preventDefault()
    close()
  })
  const handleMaskClick = useLatestFn(() => close())
  const handleMenuSelect = useLatestFn(({ key }: { key: string }) => {
    close(matchedItems.find(({ id }) => id === key))
  })
  if (!visible) return null
  return (
    <InternalContextMenuContainer
      className="lc-context-menu"
      onContextMenu={handleContainerContextMenu}
      ref={refElContextMenu}
    >
      <div className="lc-mask" onClick={handleMaskClick} />
      <InternalContextMenuPopover
        open
        arrow={false}
        placement="rightTop"
        mouseEnterDelay={0}
        getPopupContainer={getPopupContainer}
        content={<Menu items={menuItems} onSelect={handleMenuSelect} />}
      >
        <div className="lc-anchor" style={anchorStyle} />
      </InternalContextMenuPopover>
    </InternalContextMenuContainer>
  )
})

/**
 * 内部：上下文菜单容器
 */
export const InternalContextMenuContainer = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${VCVN_Z_INDEX_MAX};

  .lc-mask {
    position: absolute;
    inset: 0;
  }

  .lc-anchor {
    position: absolute;
  }
`

/**
 * 内部：上下文菜单气泡卡片
 */
export const InternalContextMenuPopover = styled(StyleablePopover)`
  .ant-popover-inner {
    padding: 0;
  }
`
