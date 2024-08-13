import { useEditor } from '@p-lc/editor'
import { ActionToolbarIconBtn } from '@p-lc/editor-toolbar-plugins'
import type { StyleProps } from '@p-lc/react-shared'
import {
  useLatestFn,
  useMessage,
  withStylePropsObserver,
} from '@p-lc/react-shared'
import { Tooltip } from 'antd'
import { Extrude } from 'iconoir-react'
import type { FC } from 'react'
import type { LcTypesEditor } from '../../types'
import {
  I18N_KEY_SAVE_AS_INITIAL_VALUE,
  I18N_KEY_SAVE_AS_INITIAL_VALUE_MSG,
} from './i18n'

/**
 * 操作工具栏另存为初始值按钮
 */
export const ActionToolbarSaveAsInitialValueBtn: FC<StyleProps> =
  withStylePropsObserver(() => {
    const [messageApi, contextHolder] = useMessage()
    const {
      i18nStore: { t },
      uniToolbarStore: { saveAsInitialValue: saveAsInitProps },
    } = useEditor<LcTypesEditor>()
    const handleBtnClick = useLatestFn(() => {
      saveAsInitProps()
      messageApi.success(t(I18N_KEY_SAVE_AS_INITIAL_VALUE_MSG))
    })
    return (
      <Tooltip title={t(I18N_KEY_SAVE_AS_INITIAL_VALUE)}>
        <ActionToolbarIconBtn onClick={handleBtnClick}>
          <Extrude />
          {contextHolder}
        </ActionToolbarIconBtn>
      </Tooltip>
    )
  })
