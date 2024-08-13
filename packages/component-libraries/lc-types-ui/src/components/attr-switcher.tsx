import type { LcTypesValueOnChange } from '@p-lc/lc-types-uidl-utils'
import type { ReactSlotRenderFn } from '@p-lc/react-component-library-shared'
import type { StyleProps } from '@p-lc/react-shared'
import {
  IconBtn,
  StyleablePopover,
  useLatestFn,
  useRcUtilMemo,
  withStylePropsMemo,
} from '@p-lc/react-shared'
import type { UidlExpression } from '@p-lc/uidl'
import {
  changeSwitchBoxExpression,
  isSwitchBoxExpression,
  switchBox,
} from '@p-lc/uidl-ext-switch-box'
import { Menu } from 'antd'
import type { MenuItemType } from 'antd/es/menu/interface'
import { Divide, DivideThree } from 'iconoir-react'
import { isEqual } from 'lodash-uni'
import type { FC } from 'react'
import { useMemo } from 'react'
import styled from 'styled-components'
import type { AttrWrapperPropsBase } from '../shared'
import {
  AttrWrapperPropsBaseContextProvider,
  splitAttrWrapperPropsBase,
} from '../shared'

/**
 * 属性（Attribute）切换属性
 */
export interface AttrSwitcherProps
  extends StyleProps,
    AttrWrapperPropsBase,
    LcTypesValueOnChange {
  /**
   * （可被切换的）条目
   */
  items?: AttrSwitcherItem[]
}

/**
 * 属性切换条目
 */
export interface AttrSwitcherItem {
  /**
   * 键值
   */
  key: string
  /**
   * 标签
   */
  label?: string
  /**
   * 渲染函数
   */
  render?: ReactSlotRenderFn
}

/**
 * 属性切换
 */
export const AttrSwitcher: FC<AttrSwitcherProps> = withStylePropsMemo(
  (props) => {
    const [baseProps, { items, value, onChange }] =
      splitAttrWrapperPropsBase(props)
    const finalItems = useMemo(() => items || [], [items])
    const finalItemKeys = useMemo(
      () => finalItems.map(({ key }) => key),
      [finalItems],
    )
    const expr = useMemo(() => {
      if (isSwitchBoxExpression(value)) return value
    }, [value])
    const exprCurrentItemKey = expr?.case
    const currentItem = useMemo(() => {
      const currentItemKey = exprCurrentItemKey
      let ret: AttrSwitcherItem | undefined
      if (currentItemKey) {
        ret = finalItems.find((item) => item.key === currentItemKey)
      }
      return ret || (finalItems[0] as AttrSwitcherItem | undefined)
    }, [exprCurrentItemKey, finalItems])
    const currentItemKey = currentItem?.key
    const menuItems: MenuItemType[] = useMemo(
      () => finalItems.map(({ key, label }) => ({ key, label })),
      [finalItems],
    )
    const menuSelectedKeys = useMemo(
      () => (currentItemKey ? [currentItemKey] : []),
      [currentItemKey],
    )
    const handleMenuSelect = useLatestFn(({ key }: { key: string }) => {
      onChange?.(switchBox(expr, key, finalItemKeys))
    })
    const labelPrefix = useMemo(
      () => (
        <div className="lc-switcher-icon">
          <InternalAttrSwitcherPopover
            placement="left"
            content={
              <Menu
                items={menuItems}
                selectedKeys={menuSelectedKeys}
                onSelect={handleMenuSelect}
              />
            }
          >
            <IconBtn>
              {finalItems.length > 2 ? <DivideThree /> : <Divide />}
            </IconBtn>
          </InternalAttrSwitcherPopover>
        </div>
      ),
      [finalItems, handleMenuSelect, menuItems, menuSelectedKeys],
    )
    const contextBaseProps = useRcUtilMemo(
      () => ({ ...baseProps, labelPrefix }),
      [labelPrefix, baseProps],
      (prev, next) => prev[0] !== next[0] || !isEqual(prev[1], next[1]),
    )
    const wrapExpression = useLatestFn((ex?: UidlExpression) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return changeSwitchBoxExpression(expr, currentItemKey!, ex, finalItemKeys)
    })
    const unwrapExpression = useLatestFn((ex?: UidlExpression) => {
      if (isSwitchBoxExpression(ex)) {
        return ex.expr
      }
      return ex
    })
    return (
      <InternalAttrSwitcherContainer className="lc-switcher">
        <AttrWrapperPropsBaseContextProvider value={contextBaseProps}>
          {currentItem?.render?.({
            item: {
              wrapExpression,
              unwrapExpression,
            },
            index: 0,
          })}
        </AttrWrapperPropsBaseContextProvider>
      </InternalAttrSwitcherContainer>
    )
  },
)

/**
 * 内部属性切换容器
 */
const InternalAttrSwitcherContainer = styled.div`
  .lc-switcher-icon {
    height: 100%;
    display: flex;
    align-items: center;
    margin-right: 4px;
  }
`

/**
 * 内部属性切换气泡卡片
 */
const InternalAttrSwitcherPopover = styled(StyleablePopover)`
  .ant-popover-inner {
    padding: 0;
  }
`
