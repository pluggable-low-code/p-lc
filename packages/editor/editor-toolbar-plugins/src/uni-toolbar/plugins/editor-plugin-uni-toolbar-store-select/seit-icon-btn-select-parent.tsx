import { useEditor } from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import { withStylePropsObserver } from '@p-lc/react-shared'
import { ArrowUpLeft } from 'iconoir-react'
import type { FC } from 'react'
import { SeitIconBtn } from '../../../selected-element-inline-toolbar'
import type { ToolbarEditor } from '../../../types'
import { I18N_KEY_UNI_TOOLBAR_SELECT_PARENT } from './i18n'

/**
 * 选中元素内联工具栏图标按钮选择父元素
 */
export const SeitIconBtnSelectParent: FC<StyleProps> = withStylePropsObserver(
  () => {
    const {
      uniToolbarStore: { selectParentElement },
      i18nStore: { t },
    } = useEditor<ToolbarEditor>()
    return (
      <SeitIconBtn
        tip={t(I18N_KEY_UNI_TOOLBAR_SELECT_PARENT)}
        onClick={selectParentElement}
      >
        <ArrowUpLeft />
      </SeitIconBtn>
    )
  },
)
