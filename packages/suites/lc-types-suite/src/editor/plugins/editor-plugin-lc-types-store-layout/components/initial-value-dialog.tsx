import { useEditor } from '@p-lc/editor'
import type { Initializer } from '@p-lc/pd'
import { BigModal, MonacoJson, useLatestFn } from '@p-lc/react-shared'
import { clearObjectToUndefined, type ValueOnChangeProps } from '@p-lc/shared'
import type { EditorUidlExpression } from '@p-lc/uidl'
import { Button, Tabs, type ButtonProps } from 'antd'
import { isUndefined } from 'lodash-uni'
import { memo, useMemo, useState, type ComponentProps, type FC } from 'react'
import styled from 'styled-components'
import type { LcTypesEditor } from '../../../types'

/**
 * 初始值对话框属性
 */
export interface InitialValueDialogProps
  extends ValueOnChangeProps<Initializer['partialElement'] | undefined> {
  /**
   * 打开按钮属性
   */
  openButtonProps?: ButtonProps
}

/**
 * 初始值对话框
 */
export const InitialValueDialog: FC<InitialValueDialogProps> = memo(
  ({ openButtonProps, value, onChange }) => {
    const {
      i18nStore: { language, languageNames },
      i18nEditStore: { lngs },
    } = useEditor<LcTypesEditor>()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingValue, setEditingValue] = useState(value)
    const handleButtonClick = useLatestFn(() => {
      setIsModalOpen(true)
      setEditingValue(value)
    })
    const handleModalOk = useLatestFn(() => {
      setIsModalOpen(false)
      onChange?.(editingValue)
    })
    const handleModalCancel = useLatestFn(() => {
      setIsModalOpen(false)
    })
    const tabItems = useMemo(() => {
      const items: NonNullable<ComponentProps<typeof Tabs>['items']> = []
      for (const lng of lngs) {
        items.push({
          key: lng,
          label: languageNames[lng],
          children: (
            <MonacoJson
              value={value?.[lng]}
              onChange={(lngJson) => {
                setEditingValue(
                  clearObjectToUndefined({
                    ...value,
                    [lng]: lngJson as Record<string, EditorUidlExpression>,
                  }),
                )
              }}
            />
          ),
        })
      }
      return items
    }, [languageNames, lngs, value])
    return (
      <>
        <Button
          type={isUndefined(value) ? value : 'primary'}
          onClick={handleButtonClick}
          {...openButtonProps}
        >
          JSON
        </Button>
        <InternalInitialValueDialogModal
          open={isModalOpen}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
        >
          <InternalInitialValueDialogTabs
            tabPosition="left"
            items={tabItems}
            defaultActiveKey={language}
          />
        </InternalInitialValueDialogModal>
      </>
    )
  },
)

/**
 * 内部：初始值对话框模态框
 */
export const InternalInitialValueDialogModal = styled(BigModal)`
  .ant-modal-body {
    margin-right: 15px;
  }
`

/**
 * 内部：初始值对话框标签页
 */
export const InternalInitialValueDialogTabs = styled(Tabs)`
  height: 100%;

  .ant-tabs-content {
    height: 100%;
  }

  .ant-tabs-tabpane {
    height: 100%;
  }
`
