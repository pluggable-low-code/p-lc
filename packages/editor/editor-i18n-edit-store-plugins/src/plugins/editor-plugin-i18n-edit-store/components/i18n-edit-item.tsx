import { useEditor } from '@p-lc/editor'
import {
  IconBtn,
  type StyleProps,
  TextArea,
  TypographyTextTip,
  useComposeRef,
  useLatestFn,
  withStylePropsOf,
} from '@p-lc/react-shared'
import { Tooltip } from 'antd'
import { EditPencil, MinusCircle } from 'iconoir-react'
import type { ChangeEvent } from 'react'
import { useId } from 'react'
import styled from 'styled-components'
import type { I18nEditEditor } from '../../../types'
import {
  I18N_KEY_I18N_EDIT_DELETE_KEY,
  I18N_KEY_I18N_EDIT_EDIT_KEY,
} from '../i18n'

/**
 * 国际化编辑条目最小高度
 */
export const I18N_EDIT_ITEM_MIN_HEIGHT = 74

/**
 * 国际化编辑条目属性
 */
export interface I18nEditItemProps extends StyleProps {
  /**
   * 语言
   */
  lng: string
  /**
   * 键值
   */
  i18nKey: string
  /**
   * 文本
   */
  text: string
}

/**
 * 国际化编辑条目，编辑某个语言下的某个键值及其文案
 */
export const I18nEditItem = withStylePropsOf<I18nEditItemProps, HTMLDivElement>(
  ({ lng, i18nKey: key, text }, ref) => {
    const {
      i18nStore: { t },
      i18nEditStore: { setText, openKeyDialog, deleteKey, setElItem },
    } = useEditor<I18nEditEditor>()
    const recipeId = useId()
    const handleTextChange = useLatestFn(
      (ev: ChangeEvent<HTMLTextAreaElement>) => {
        setText(lng, key, ev.target.value, recipeId)
      },
    )
    const handleEditBtnClick = useLatestFn(() => openKeyDialog(key))
    const handleDeleteBtnClick = useLatestFn(() => deleteKey(key))
    const finalRef = useComposeRef(ref, (el: HTMLDivElement | null) => {
      setElItem(lng, key, el)
    })
    // console.log('I18nEditItem render', lng, key)
    return (
      <InternalI18nEditItemContainer
        className="lc-i18n-edit-item"
        ref={finalRef}
      >
        <div className="lc-title">
          <TypographyTextTip className="lc-key">{key}</TypographyTextTip>
          <Tooltip title={t(I18N_KEY_I18N_EDIT_EDIT_KEY)}>
            <IconBtn onClick={handleEditBtnClick}>
              <EditPencil />
            </IconBtn>
          </Tooltip>
          <Tooltip title={t(I18N_KEY_I18N_EDIT_DELETE_KEY)}>
            <IconBtn onClick={handleDeleteBtnClick}>
              <MinusCircle />
            </IconBtn>
          </Tooltip>
        </div>
        <TextArea
          autoSize
          value={text}
          className="lc-text"
          onChange={handleTextChange}
        />
      </InternalI18nEditItemContainer>
    )
  },
)

/**
 * 内部：国际化编辑条目容器
 */
export const InternalI18nEditItemContainer = styled.div`
  width: 100%;
  padding: 0 8px;

  .lc-title {
    display: flex;
    align-items: center;
  }

  .lc-key {
    width: 0;
    flex: 1 0 auto;
  }

  .lc-icon-btn {
    margin-left: 6px;
  }

  .lc-text {
    margin: 8px 0 12px 0;
  }
`
