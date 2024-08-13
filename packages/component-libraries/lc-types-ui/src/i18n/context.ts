import { createContext, useContext } from 'react'
import type { I18nKeys, I18nLngRes } from './types'

/**
 * 国际化上下文
 */
export const I18nContext = createContext<I18nLngRes | null>(null)

/**
 * 国际化提供者
 */
export const I18nProvider = I18nContext.Provider

/**
 * 国际化消费者
 */
export const I18nConsumer = I18nContext.Consumer

/**
 * 使用国际化文案
 * @param key 国际化键值
 */
export function useI18nText(key: I18nKeys): string {
  const lngRes = useContext(I18nContext)
  return lngRes ? lngRes[key] : key
}
