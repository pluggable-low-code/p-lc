import { useEditor } from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import { withStylePropsObserver } from '@p-lc/react-shared'
import { Tooltip } from 'antd'
import { Redo } from 'iconoir-react'
import type { FC } from 'react'
import { ActionToolbarIconBtn } from '../../../action-toolbar'
import type { ToolbarEditor } from '../../../types'
import { I18N_KEY_UNI_TOOLBAR_REDO_TIP } from './i18n'

/**
 * 操作工具栏重做按钮
 */
export const ActionToolbarRedoBtn: FC<StyleProps> = withStylePropsObserver(
  () => {
    const {
      i18nStore: { t },
      uidlStore: { isRedoable, redo },
    } = useEditor<ToolbarEditor>()
    return (
      <Tooltip title={t(I18N_KEY_UNI_TOOLBAR_REDO_TIP)}>
        <ActionToolbarIconBtn $disabled={!isRedoable} onClick={redo}>
          <Redo />
        </ActionToolbarIconBtn>
      </Tooltip>
    )
  },
)
