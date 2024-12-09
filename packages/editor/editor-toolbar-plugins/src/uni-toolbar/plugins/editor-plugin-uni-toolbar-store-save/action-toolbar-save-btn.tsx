import { useEditor } from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import { withStylePropsObserver } from '@p-lc/react-shared'
import type { FC } from 'react'
import { ActionToolbarBtn } from '../../../action-toolbar'
import type { ToolbarEditor } from '../../../types'
import { I18N_KEY_UNI_TOOLBAR_SAVE } from './i18n'

/**
 * 操作工具栏保存按钮
 */
export const ActionToolbarSaveBtn: FC<StyleProps> = withStylePropsObserver(
  () => {
    const {
      saveStore: { save, isSavable, isSaving },
      i18nStore: { t },
    } = useEditor<ToolbarEditor>()
    return (
      <ActionToolbarBtn
        type="primary"
        onClick={save}
        loading={isSaving}
        disabled={!isSavable}
      >
        {t(I18N_KEY_UNI_TOOLBAR_SAVE)}
      </ActionToolbarBtn>
    )
  },
)
