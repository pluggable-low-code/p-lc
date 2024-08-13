import type { GetInnerPopupContainer, GetPopupContainer } from '@p-lc/shared'
import { createContext, useContext } from 'react'

/**
 * 返回 body 原生元素
 */
function returnBody(): HTMLElement {
  return document.body
}

/**
 * 获取弹窗容器上下文
 */
const GetPopupContainerContext = createContext<GetPopupContainer>(returnBody)

/**
 * 获取弹窗容器上下文提供者
 */
export const GetPopupContainerContextProvider =
  GetPopupContainerContext.Provider

/**
 * 使用获取弹窗容器
 */
export function useGetPopupContainer(): GetPopupContainer {
  return useContext(GetPopupContainerContext)
}

/**
 * 获取内部弹窗容器上下文
 */
const GetInnerPopupContainerContext =
  createContext<GetInnerPopupContainer>(returnBody)

/**
 * 获取内部弹窗容器上下文提供者
 */
export const GetInnerPopupContainerContextProvider =
  GetInnerPopupContainerContext.Provider

/**
 * 使用获取内部弹窗容器
 */
export function useGetInnerPopupContainer(): GetInnerPopupContainer {
  return useContext(GetInnerPopupContainerContext)
}
