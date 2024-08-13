import type { CbFn, Returnable } from '@p-lc/shared'
import { getReturnValue, isShallowEqual, sleepMicrotask } from '@p-lc/shared'
import { uniqueId } from 'lodash-uni'
import type { ComponentClass, FC, ReactNode } from 'react'
import { Component, createContext, useEffect, useState } from 'react'

/**
 * Fiber 收集器上下文
 */
export interface FiberCollecterContext<V> {
  /**
   * 带上收集器：包装组件，向子组件提供收集器上下文
   * @param Comp
   */
  withCollecter<
    Props extends {
      children?: ReactNode
    },
  >(
    Comp: FC<
      Omit<Props, 'children'> & {
        fiberCollecter: FiberCollecter<V>
      }
    >,
  ): FC<Props>
  /**
   * 带上收集能力：包装组件，并收集数据，收集数据时，组件不渲染
   * @param Comp 组件
   * @param collect 收集函数
   */
  withCollect<Props>(
    collect: (props: Props) => V,
    Comp?: FC<Props>,
  ): ComponentClass<Props>
}

/**
 * Fiber 收集器
 */
export interface FiberCollecter<V> {
  /**
   * 数据
   */
  data: FiberCollecterData<V>
  /**
   * 设置数据，undefined 表示删除键值
   * @param data 新的数据
   */
  setData(
    data: Returnable<FiberCollecterData<V>, [FiberCollecterData<V>]>,
  ): void
  /**
   * 立刻更新（基于微任务）
   */
  updateNextTick(): void
  /**
   * 监听数据
   * @param cb 回调函数
   */
  on(cb: CbFn<[FiberCollecterData<V>]>): void
  /**
   * 取消监听数据
   * @param cb 回调函数
   */
  off(cb: CbFn<[FiberCollecterData<V>]>): void
}

/**
 * Fiber 收集器数据
 */
export type FiberCollecterData<V> = Map<string, V>

/**
 * 创建 Fiber 收集器上下文，用于跨 Fiber 树层级收集数据
 */
export function createFiberCollecterContext<V>(): FiberCollecterContext<V> {
  const Context = createContext<FiberCollecter<V> | null>(null)
  const { Provider: ContextProvider } = Context
  return {
    withCollecter,
    withCollect,
  }

  function withCollecter<Props extends { children?: ReactNode }>(
    Comp: FC<Omit<Props, 'children'> & { fiberCollecter: FiberCollecter<V> }>,
  ): FC<Props> {
    return ({ children, ...restProps }) => {
      const fiberCollecter = useCollecter<V>()
      return (
        <>
          <ContextProvider value={fiberCollecter}>{children}</ContextProvider>
          <ContextProvider value={null}>
            <Comp {...restProps} fiberCollecter={fiberCollecter} />
          </ContextProvider>
        </>
      )
    }
  }

  function withCollect<Props>(
    collect: (props: Props) => V,
    Comp?: FC<Props>,
  ): ComponentClass<Props> {
    class WithCollect extends Component<Props> {
      public static contextType = Context

      private _id = uniqueId()

      public declare context: FiberCollecter<V> | null

      public render(): ReactNode {
        const { props, _id: id } = this
        const fc = this.context
        if (fc) {
          fc.setData((data) => {
            const item = collect(props)
            const oldItem = data.get(id)
            if (!isShallowEqual(oldItem, item)) {
              data = new Map(data)
              data.set(id, item)
            }
            return data
          })
          return null
        }
        return Comp && <Comp {...props} />
      }

      public componentWillUnmount(): void {
        const { context: fc, _id: id } = this
        fc?.setData((data) => {
          if (data.has(id)) {
            data = new Map(data)
            data.delete(id)
          }
          return data
        })
      }
    }
    return WithCollect
  }
}

/**
 * （创建并）使用收集器
 */
export function useCollecter<V>(): FiberCollecter<V> {
  const [fiberCollecter] = useState(() => {
    const cbSet = new Set<CbFn<[FiberCollecterData<V>]>>()
    let promise: Promise<void> | null = null
    const updateNextTick: FiberCollecter<V>['updateNextTick'] = () => {
      if (promise || !cbSet.size) return
      promise = (async (): Promise<void> => {
        await sleepMicrotask()
        promise = null
        for (const fn of cbSet) {
          fn(fc.data)
        }
      })()
    }
    const fc: FiberCollecter<V> = {
      data: new Map(),
      setData(data) {
        const oldData = fc.data
        const newData = getReturnValue(data, oldData)
        if (newData === oldData) return
        fc.data = newData
        updateNextTick()
      },
      updateNextTick,
      on(cb) {
        cbSet.add(cb)
      },
      off(cb) {
        cbSet.delete(cb)
      },
    }
    return fc
  })
  return fiberCollecter
}

/**
 * 使用（并监听）收集器数据
 * @param fc Fiber 收集器
 */
export function useCollecterData<V>(
  fc: FiberCollecter<V>,
): FiberCollecterData<V> {
  const [d, setD] = useState(fc.data)
  useEffect(() => {
    fc.on(setD)
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    return () => fc.off(setD)
  }, [fc])
  return d
}
