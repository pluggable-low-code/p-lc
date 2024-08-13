import type { GetInnerPopupContainer, GetPopupContainer } from '@p-lc/shared'
import type { FunctionalComponent } from 'vue'
import { inject } from 'vue'
import ContextInjector from './context-injector.vue'
import ContextProvider from './context-provider.vue'

/**
 * Vue 上下文
 */
export interface VueContext<V> {
  /**
   * 提供者
   */
  ContextProvider: FunctionalComponent<{
    /**
     * 上下文值
     */
    value: V
  }>
  /**
   * 注入器
   */
  ContextInjector: FunctionalComponent<
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    {},
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    {},
    {
      default(slotProps: { value: V }): unknown
    }
  >
  /**
   * 使用上下文
   */
  useContext(): V
}

/**
 * 创建上下文
 * @param defaultValue 默认值
 */
export function createContext<V>(defaultValue: V): VueContext<V> {
  const key = Symbol()
  return {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ContextProvider({ value }, { slots }) {
      return (
        <ContextProvider ctxKey={key} value={value}>
          {{
            ...slots,
          }}
        </ContextProvider>
      )
    },
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ContextInjector(props, { slots }) {
      void props
      return (
        <ContextInjector ctxKey={key}>
          {{
            ...slots,
          }}
        </ContextInjector>
      )
    },
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    useContext() {
      return inject(key, defaultValue)
    },
  }
}

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
  GetPopupContainerContext.ContextProvider

/**
 * 使用获取弹窗容器
 */
export const useGetPopupContainer = GetPopupContainerContext.useContext

/**
 * 获取内部弹窗容器上下文
 */
const GetInnerPopupContainerContext =
  createContext<GetInnerPopupContainer>(returnBody)

/**
 * 获取内部弹窗容器上下文提供者
 */
export const GetInnerPopupContainerContextProvider =
  GetInnerPopupContainerContext.ContextProvider

/**
 * 使用获取内部弹窗容器
 */
export const useGetInnerPopupContainer =
  GetInnerPopupContainerContext.useContext
