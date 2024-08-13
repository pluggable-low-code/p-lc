import { useEditor } from '@p-lc/editor'
import {
  FormItem,
  useForm,
  useLatestFn,
  withStylePropsObserver,
} from '@p-lc/react-shared'
import type { InputRef } from 'antd'
import { Form, Input, Modal } from 'antd'
import type { Rule } from 'antd/es/form'
import type { ComponentProps, FC } from 'react'
import { useEffect, useMemo, useRef } from 'react'
import type { I18nEditEditor } from '../../../types'
import {
  I18N_KEY_I18N_EDIT_ADD_KEY,
  I18N_KEY_I18N_EDIT_EDIT_KEY,
  I18N_KEY_I18N_EDIT_KEY,
  I18N_KEY_I18N_EDIT_KEY_EXISTS,
} from '../i18n'

/**
 * 国际化编辑键值对话框属性
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface I18nEditKeyDialogProps extends ComponentProps<typeof Modal> {}

/**
 * 国际化编辑键值对话框
 */
export const I18nEditKeyDialog: FC<I18nEditKeyDialogProps> =
  withStylePropsObserver((props) => {
    const {
      i18nStore: { t },
      i18nEditStore: {
        hasKey,
        dialogIsOpen,
        dialogOldKey,
        closeKeyDialog,
        autoFocusToNewKey,
      },
    } = useEditor<I18nEditEditor>()
    const [form] = useForm<I18nEditKeyDialogFormValues>()
    const refInput = useRef<InputRef>(null)
    useEffect(() => {
      if (dialogIsOpen) {
        form.setFieldsValue({ k: dialogOldKey || undefined })
        // FIXME: 等 antd 修复 Modal 内 Input autoFocus 问题：https://github.com/ant-design/ant-design/issues/41239
        setTimeout(() => {
          refInput.current?.focus()
        }, 0)
      }
    }, [form, dialogOldKey, dialogIsOpen])
    const rules = useMemo(() => {
      return [
        {
          required: true,
        },
        {
          async validator(...[, newKey]): Promise<void | string> {
            if (!(dialogOldKey && newKey === dialogOldKey) && hasKey(newKey)) {
              throw t(I18N_KEY_I18N_EDIT_KEY_EXISTS)
            }
          },
        },
      ] satisfies Rule[]
    }, [hasKey, dialogOldKey, t])
    const handleModalCancel = useLatestFn(() => closeKeyDialog())
    const handleModalOk = useLatestFn(() => form.submit())
    const handleFormFinish = useLatestFn(({ k }: I18nEditKeyDialogFormValues) =>
      closeKeyDialog(k),
    )
    return (
      <Modal
        {...props}
        open={dialogIsOpen}
        title={t(
          dialogOldKey
            ? I18N_KEY_I18N_EDIT_EDIT_KEY
            : I18N_KEY_I18N_EDIT_ADD_KEY,
        )}
        onCancel={handleModalCancel}
        onOk={handleModalOk}
        afterClose={autoFocusToNewKey}
      >
        <Form form={form} onFinish={handleFormFinish}>
          <FormItem label={t(I18N_KEY_I18N_EDIT_KEY)} name="k" rules={rules}>
            <Input ref={refInput} />
          </FormItem>
        </Form>
      </Modal>
    )
  })

/**
 * 国际化编辑键值对话框表单值
 */
export interface I18nEditKeyDialogFormValues {
  /**
   * 新键值
   */
  k: string
}
