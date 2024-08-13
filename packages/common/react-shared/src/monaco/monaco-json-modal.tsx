import type { ValueOnChangeProps } from '@p-lc/shared'
import { clsxLite } from '@p-lc/shared'
import type { ButtonProps } from 'antd'
import { Button, type Modal } from 'antd'
import { isUndefined, uniqueId } from 'lodash-uni'
import type { ComponentProps } from 'react'
import { forwardRef, memo, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { BigModal } from '../antd'
import { useLatestFn } from '../hooks'
import { fillRef } from '../rc-util'
import { MonacoJson } from './monaco-json'

/**
 * Monaco JSON 模态框（编辑器）属性
 */
export interface MonacoJsonModalProps
  extends ComponentProps<typeof Modal>,
    ValueOnChangeProps {
  /**
   * 打开按钮属性
   */
  openButtonProps?: ButtonProps
  /**
   * Monaco JSON（编辑器）属性
   */
  monacoJsonProps?: ComponentProps<typeof MonacoJson>
  /**
   * 可视状态改变事件
   * @param visible 可视状态状态
   */
  onVisibleChange?(visible: boolean): void
}

/**
 * Monaco JSON 模态框（编辑器）
 */
export const MonacoJsonModal = memo(
  forwardRef<HTMLDivElement, MonacoJsonModalProps>(
    (
      {
        openButtonProps,
        monacoJsonProps,
        onVisibleChange,
        value,
        onChange,
        className,
        ...restProps
      },
      ref,
    ) => {
      const [isModalOpen, setIsModalOpen] = useState(false)
      const [editingValue, setEditingValue] = useState(value)
      const [editingError, setEditingError] = useState<Error | null>(null)
      const okButtonProps: ButtonProps = useMemo(
        () => ({
          disabled: !!editingError,
        }),
        [editingError],
      )
      const handleButtonClick = useLatestFn(() => {
        setIsModalOpen(true)
        onVisibleChange?.(true)
        setEditingValue(value)
      })
      const handleModalOk = useLatestFn(() => {
        setIsModalOpen(false)
        onVisibleChange?.(false)
        onChange?.(editingValue)
      })
      const handleModalCancel = useLatestFn(() => {
        setIsModalOpen(false)
        onVisibleChange?.(false)
      })
      const modalClassNameId = useMemo(() => uniqueId('mjm'), [])
      useEffect(() => {
        if (isModalOpen) {
          // 等 DOM 加载
          setTimeout(() => {
            const el = document.querySelector(
              `.${modalClassNameId} .ant-modal-content`,
            )
            if (el) {
              fillRef(ref, el)
            }
          }, 0)
        }
      }, [isModalOpen, modalClassNameId, ref])
      return (
        <>
          <Button
            type={isUndefined(value) ? value : 'primary'}
            onClick={handleButtonClick}
            {...openButtonProps}
          >
            JSON
          </Button>
          <InternalMonacoJsonModalModal
            open={isModalOpen}
            onOk={handleModalOk}
            onCancel={handleModalCancel}
            okButtonProps={okButtonProps}
            className={clsxLite(modalClassNameId, className)}
            destroyOnClose
            {...restProps}
          >
            <MonacoJson
              value={editingValue}
              onChange={setEditingValue}
              onError={setEditingError}
              {...monacoJsonProps}
            />
          </InternalMonacoJsonModalModal>
        </>
      )
    },
  ),
)

/**
 * 内部：Monaco JSON 模态框（编辑器）模态框
 */
export const InternalMonacoJsonModalModal = styled(BigModal)`
  .ant-modal-body {
    margin-right: 15px;
  }
`
