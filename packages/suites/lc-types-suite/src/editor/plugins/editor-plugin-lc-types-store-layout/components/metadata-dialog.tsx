import { useEditor } from '@p-lc/editor'
import { I18nTextInput } from '@p-lc/editor-i18n-edit-store-plugins'
import {
  BigModal,
  FormItem,
  MonacoJsonModal,
  TypographyTitleSmall5,
  useForm,
  useLatestFn,
  withStylePropsMemo,
  type StyleProps,
} from '@p-lc/react-shared'
import { Button, Form, Input, Select, Switch } from 'antd'
import {
  memo,
  useEffect,
  useMemo,
  useState,
  type ComponentProps,
  type FC,
} from 'react'
import type { LcTypesEditor } from '../../../types'
import type { MetadataFormValues } from '../../editor-plugin-lc-types-store-metadata'
import {
  I18N_KEY_CD_DESCRIPTION,
  I18N_KEY_CD_EXPORT_PATH,
  I18N_KEY_CD_GROUP_NAME,
  I18N_KEY_CD_HIDDEN,
  I18N_KEY_CD_ICON,
  I18N_KEY_CD_IMPL_FOR,
  I18N_KEY_CD_IMPL_IF,
  I18N_KEY_CD_IMPL_STYLE,
  I18N_KEY_CD_IMPLEMENTS,
  I18N_KEY_CD_INITIAL_VALUE,
  I18N_KEY_CD_METADATA,
  I18N_KEY_CD_NAME,
  I18N_KEY_CD_TYPE,
  I18N_KEY_EDIT_METADATA,
  I18N_KEY_PD_METADATA,
  I18N_KEY_PD_NAME,
} from '../i18n'
import { InitialValueDialog } from './initial-value-dialog'

/**
 * 元数据对话框
 */
export const MetadataDialog: FC<StyleProps> = withStylePropsMemo(() => {
  const {
    i18nStore: { t },
    lcTypesStore: { getMetadataFormValues, setMetadataFormValues },
  } = useEditor<LcTypesEditor>()
  const [open, setOpen] = useState(false)
  const [form] = useForm<MetadataFormValues>()
  const handleEditBtnClick = useLatestFn(() => setOpen(true))
  const handleModalCancel = useLatestFn(() => setOpen(false))
  const handleModalOk = useLatestFn(() => form.submit())
  useEffect(() => {
    if (open) {
      form.resetFields()
      form.setFieldsValue(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getMetadataFormValues() satisfies MetadataFormValues as any,
      )
    }
  }, [form, getMetadataFormValues, open])
  const handleFormFinish = useLatestFn((formValues: MetadataFormValues) => {
    setMetadataFormValues(formValues)
    setOpen(false)
  })
  return (
    <>
      <Button type="primary" onClick={handleEditBtnClick}>
        {t(I18N_KEY_EDIT_METADATA)}
      </Button>
      <BigModal open={open} onCancel={handleModalCancel} onOk={handleModalOk}>
        <MetadataForm form={form} onFinish={handleFormFinish} />
      </BigModal>
    </>
  )
})

/**
 * 元数据表单
 */
export const MetadataForm = memo((props) => {
  const {
    i18nStore: { t },
  } = useEditor<LcTypesEditor>()
  const implementsOptions = useMemo(
    () => [
      {
        label: t(I18N_KEY_CD_IMPL_STYLE),
        value: 'style',
      },
      {
        label: t(I18N_KEY_CD_IMPL_IF),
        value: 'if',
      },
      {
        label: t(I18N_KEY_CD_IMPL_FOR),
        value: 'for',
      },
    ],
    [t],
  )
  return (
    <Form {...props}>
      <TypographyTitleSmall5>{t(I18N_KEY_CD_METADATA)}</TypographyTitleSmall5>
      <FormItem
        label={t(I18N_KEY_CD_TYPE)}
        name="type"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </FormItem>
      <FormItem
        label={t(I18N_KEY_CD_NAME)}
        name="name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <I18nTextInput />
      </FormItem>
      <FormItem label={t(I18N_KEY_CD_GROUP_NAME)} name="groupName">
        <I18nTextInput />
      </FormItem>
      <FormItem label={t(I18N_KEY_CD_DESCRIPTION)} name="description">
        <I18nTextInput />
      </FormItem>
      <FormItem label={t(I18N_KEY_CD_ICON)} name="icon">
        <Input />
      </FormItem>
      <FormItem label={t(I18N_KEY_CD_HIDDEN)} name="hidden">
        <Switch />
      </FormItem>
      <FormItem label={t(I18N_KEY_CD_IMPLEMENTS)} name="implements">
        <Select mode="multiple" options={implementsOptions} />
      </FormItem>
      <FormItem label={t(I18N_KEY_CD_EXPORT_PATH)} name="exportPath">
        <MonacoJsonModal />
      </FormItem>
      <FormItem label={t(I18N_KEY_CD_INITIAL_VALUE)} name="initialValue">
        <InitialValueDialog />
      </FormItem>
      <TypographyTitleSmall5>{t(I18N_KEY_PD_METADATA)}</TypographyTitleSmall5>
      <FormItem
        label={t(I18N_KEY_PD_NAME)}
        name="pdName"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <I18nTextInput />
      </FormItem>
    </Form>
  )
}) as FC<ComponentProps<typeof Form>> as typeof Form
