import { useEditor } from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import { useLatestFn, withStylePropsObserver } from '@p-lc/react-shared'
import { map } from 'lodash-uni'
import { runInAction } from 'mobx'
import { useMemo, type FC } from 'react'
import { ActionToolbarSelect } from '../../../action-toolbar'
import type { ToolbarEditor } from '../../../types'

/**
 * 操作工具栏语言选择
 */
export const ActionToolbarLanguageSelect: FC<StyleProps> =
  withStylePropsObserver(() => {
    const {
      i18nStore: { languageNames, language, setLanguage },
    } = useEditor<ToolbarEditor>()
    const options = useMemo(
      () =>
        map(languageNames, (name: string, lng: string) => ({
          label: name,
          value: lng,
        })),
      [languageNames],
    )
    const handleOnChange = useLatestFn((newValue: string) => {
      runInAction(() => {
        setLanguage(newValue)
        // 暂不支持原地修改语言，需要刷新
        location.reload()
      })
    })
    return (
      <ActionToolbarSelect
        options={options}
        value={language}
        onChange={handleOnChange}
      />
    )
  })
