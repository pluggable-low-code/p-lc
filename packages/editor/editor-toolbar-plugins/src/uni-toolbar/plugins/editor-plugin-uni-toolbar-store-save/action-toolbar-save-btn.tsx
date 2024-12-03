import { useEditor } from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import {
  useLatestFn,
  useMessage,
  withStylePropsObserver,
} from '@p-lc/react-shared'
import type { FC } from 'react'
import { ActionToolbarBtn } from '../../../action-toolbar'
import type { ToolbarEditor } from '../../../types'
import {
  I18N_KEY_UNI_TOOLBAR_SAVE,
  I18N_KEY_UNI_TOOLBAR_SAVE_FAILED,
  I18N_KEY_UNI_TOOLBAR_SAVE_SUCCESS,
} from './i18n'

/**
 * 操作工具栏保存按钮
 */
export const ActionToolbarSaveBtn: FC<StyleProps> = withStylePropsObserver(
  () => {
    const {
      saveStore: { save, isSavable, isSaving },
      i18nStore: { t },
    } = useEditor<ToolbarEditor>()
    const [messageApi, contextHolder] = useMessage()
    const handleBtnClick = useLatestFn(async () => {
      try {
        await save()
        messageApi.success(t(I18N_KEY_UNI_TOOLBAR_SAVE_SUCCESS))
      } catch (err) {
        let msg = t(I18N_KEY_UNI_TOOLBAR_SAVE_FAILED)
        if (err instanceof Error) {
          msg = `${msg}: ${err.message}`
        }
        messageApi.error(msg)
      }
    })
    return (
      <ActionToolbarBtn
        type="primary"
        onClick={handleBtnClick}
        loading={isSaving}
        disabled={!isSavable}
      >
        {contextHolder}
        {t(I18N_KEY_UNI_TOOLBAR_SAVE)}
      </ActionToolbarBtn>
    )
  },
)
