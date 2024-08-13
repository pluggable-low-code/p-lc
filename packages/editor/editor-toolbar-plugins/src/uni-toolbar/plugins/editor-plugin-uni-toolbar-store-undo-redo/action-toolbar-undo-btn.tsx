import { useEditor } from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import { withStylePropsObserver } from '@p-lc/react-shared'
import { Tooltip } from 'antd'
import { Undo } from 'iconoir-react'
import type { FC } from 'react'
import { ActionToolbarIconBtn } from '../../../action-toolbar'
import type { ToolbarEditor } from '../../../types'
import { I18N_KEY_UNI_TOOLBAR_UNDO_TIP } from './i18n'

/**
 * 操作工具栏撤销按钮
 */
export const ActionToolbarUndoBtn: FC<StyleProps> = withStylePropsObserver(
  () => {
    const {
      i18nStore: { t },
      uidlStore: { isUndoable, undo },
    } = useEditor<ToolbarEditor>()
    return (
      <Tooltip title={t(I18N_KEY_UNI_TOOLBAR_UNDO_TIP)}>
        <ActionToolbarIconBtn $disabled={!isUndoable} onClick={undo}>
          <Undo />
        </ActionToolbarIconBtn>
      </Tooltip>
    )
  },
)
