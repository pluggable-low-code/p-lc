import { useEditor } from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import { withStylePropsObserver } from '@p-lc/react-shared'
import { Trash } from 'iconoir-react'
import type { FC } from 'react'
import { SeitIconBtn } from '../../../selected-element-inline-toolbar'
import type { ToolbarEditor } from '../../../types'
import { I18N_KEY_UNI_TOOLBAR_DELETE_ELEMENT } from './i18n'

/**
 * 选中元素内联工具栏图标按钮删除
 */
export const SeitIconBtnDelete: FC<StyleProps> = withStylePropsObserver(() => {
  const {
    uniToolbarStore: { deleteSelectedElement },
    i18nStore: { t },
  } = useEditor<ToolbarEditor>()
  return (
    <SeitIconBtn
      tip={t(I18N_KEY_UNI_TOOLBAR_DELETE_ELEMENT)}
      onClick={deleteSelectedElement}
    >
      <Trash />
    </SeitIconBtn>
  )
})
