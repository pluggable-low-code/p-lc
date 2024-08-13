import { useEditor } from '@p-lc/editor'
import type { BindingDialogProps } from '@p-lc/lc-types-ui'
import type { StyleProps } from '@p-lc/react-shared'
import {
  BigModal,
  useLatestFn,
  withStylePropsObserver,
} from '@p-lc/react-shared'
import type { UidlExpressionSwitchBox } from '@p-lc/uidl-ext-switch-box'
import {
  changeSwitchBoxExpression,
  isSwitchBoxExpression,
  switchBox,
} from '@p-lc/uidl-ext-switch-box'
import { Tabs } from 'antd'
import { sortBy, values } from 'lodash-uni'
import type { ComponentProps, FC } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import type { Binder } from '..'
import type { ElementAttributesEditor } from '../../../types'

/**
 * 绑定对话框
 */
export const BindingDialog: FC<BindingDialogProps & StyleProps> =
  withStylePropsObserver(
    ({
      open,
      onClose,
      defaultBinderType,
      includeBinderTypes,
      excludeBinderTypes,
      value,
      onChange,
    }) => {
      const {
        elementAttributesStore: { binders },
        i18nStore: { tText },
      } = useEditor<ElementAttributesEditor>()
      const expr = useMemo(() => {
        if (isSwitchBoxExpression(value)) return value
      }, [value])
      const [editingExpr, setEditingExpr] = useState<
        UidlExpressionSwitchBox | undefined
      >()
      useEffect(() => {
        if (open) {
          setEditingExpr(expr)
        }
      }, [expr, open])
      const editingBinderType = editingExpr?.case
      const editingInnerExpr = editingExpr?.expr
      const finalBinders = useMemo(() => {
        const includeBinderTypeSet =
          includeBinderTypes && new Set(includeBinderTypes)
        const excludeBinderTypeSet =
          excludeBinderTypes && new Set(excludeBinderTypes)
        const bs: Binder[] = []
        for (const binder of values(binders)) {
          const { type } = binder
          if (includeBinderTypeSet) {
            if (!includeBinderTypeSet.has(type)) continue
          } else if (excludeBinderTypeSet) {
            if (excludeBinderTypeSet.has(type)) continue
          }
          bs.push(binder)
        }
        return sortBy(bs, ({ index = Infinity }) => index)
      }, [binders, excludeBinderTypes, includeBinderTypes])
      const finalBinderTypes = useMemo(
        () => finalBinders.map(({ type }) => type),
        [finalBinders],
      )
      const tabItems = useMemo(() => {
        const items: NonNullable<ComponentProps<typeof Tabs>['items']> = []
        for (const { type, name, Component } of finalBinders) {
          items.push({
            key: type,
            label: tText(name),
            children: (
              <Component
                value={editingInnerExpr}
                onChange={(newInnerExpr) => {
                  setEditingExpr(
                    changeSwitchBoxExpression(
                      editingExpr,
                      type,
                      newInnerExpr,
                      finalBinderTypes,
                    ),
                  )
                }}
              />
            ),
          })
        }
        return items
      }, [editingExpr, editingInnerExpr, finalBinderTypes, finalBinders, tText])
      const activeKey = useMemo(() => {
        if (
          editingBinderType &&
          finalBinders.some((b) => b.type === editingBinderType)
        ) {
          return editingBinderType
        }
        if (
          defaultBinderType &&
          finalBinders.some((b) => b.type === defaultBinderType)
        ) {
          return defaultBinderType
        }
        if (finalBinders.length) {
          return finalBinders[0].type
        }
      }, [defaultBinderType, editingBinderType, finalBinders])
      const handleTabsChange = useLatestFn((key: string) => {
        setEditingExpr(switchBox(editingExpr, key, finalBinderTypes))
      })
      const handleModalOk = useCallback(() => {
        onClose()
        onChange?.(editingExpr)
      }, [editingExpr, onChange, onClose])
      return (
        <BigModal
          open={open}
          destroyOnClose
          onCancel={onClose}
          onOk={handleModalOk}
        >
          <InternalBindingDialogTabs
            tabPosition="left"
            items={tabItems}
            activeKey={activeKey}
            onChange={handleTabsChange}
          />
        </BigModal>
      )
    },
  )

/**
 * 内部：绑定对话框标签页
 */
export const InternalBindingDialogTabs = styled(Tabs)`
  height: 100%;

  .ant-tabs-content-holder {
    overflow: auto;
  }

  .ant-tabs-content {
    height: 100%;
  }

  .ant-tabs-tabpane {
    height: 100%;
  }
`
