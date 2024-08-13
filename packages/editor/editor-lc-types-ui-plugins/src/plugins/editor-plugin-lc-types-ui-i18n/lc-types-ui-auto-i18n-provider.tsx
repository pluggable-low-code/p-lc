import { useEditor } from '@p-lc/editor'
import type { I18nLngRes } from '@p-lc/lc-types-ui'
import { I18nProvider } from '@p-lc/lc-types-ui'
import { observer } from 'mobx-react-lite'
import type { FC, ReactNode } from 'react'

/**
 * antd 自动本地文案提供者属性
 */
export interface AntdAutoLocaleProviderProps {
  /**
   * 国际化语言资源
   */
  lngRess: Record<string, I18nLngRes>
  children?: ReactNode
}

/**
 * antd 自动本地文案提供者
 */
export const LcTypesUiAutoI18nProvider: FC<AntdAutoLocaleProviderProps> =
  observer(({ lngRess, children }) => {
    const {
      i18nStore: { language },
    } = useEditor()
    return <I18nProvider value={lngRess[language]}>{children}</I18nProvider>
  })
