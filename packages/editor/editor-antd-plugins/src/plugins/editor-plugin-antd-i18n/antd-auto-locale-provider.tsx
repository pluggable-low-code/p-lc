import { useEditor } from '@p-lc/editor'
import { ConfigProvider } from 'antd'
import type { Locale } from 'antd/es/locale'
import { observer } from 'mobx-react-lite'
import type { FC, ReactNode } from 'react'

/**
 * antd 自动本地文案提供者属性
 */
export interface AntdAutoLocaleProviderProps {
  /**
   * 本地文案
   */
  locales: Record<string, Locale>
  children?: ReactNode
}

/**
 * antd 自动本地文案提供者
 */
export const AntdAutoLocaleProvider: FC<AntdAutoLocaleProviderProps> = observer(
  ({ locales, children }) => {
    const {
      i18nStore: { language },
    } = useEditor()
    return (
      <ConfigProvider locale={locales[language]}>{children}</ConfigProvider>
    )
  },
)
