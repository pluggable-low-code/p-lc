import { useEditor } from '@p-lc/editor'
import { useLatestFn, withStylePropsObserver } from '@p-lc/react-shared'
import { Input } from 'antd'
import type { ChangeEvent, FC } from 'react'
import type { I18nEditEditor } from '../../../types'
import { I18N_KEY_I18N_EDIT_SEARCH } from '../i18n'

/**
 * 国际化编辑搜索属性
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface I18nEditSearchProps {}

/**
 * 国际化编辑搜索
 */
export const I18nEditSearch: FC<I18nEditSearchProps> = withStylePropsObserver(
  () => {
    const {
      i18nStore: { t },
      i18nEditStore: { searchText, setSearchText },
    } = useEditor<I18nEditEditor>()
    const handleInputChange = useLatestFn(
      (ev: ChangeEvent<HTMLInputElement>) => {
        setSearchText(ev.target.value)
      },
    )
    return (
      <Input
        value={searchText}
        onChange={handleInputChange}
        placeholder={t(I18N_KEY_I18N_EDIT_SEARCH)}
        allowClear
      />
    )
  },
)
