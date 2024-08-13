import type { Disposer } from '@p-lc/shared'
import { merge } from 'lodash-uni'
import type { FC, ReactElement, ReactNode } from 'react'
import { Component } from 'react'

/**
 * 创建渲染器拥有者初始化函数
 * @param createRendererOwner 创建渲染器拥有者
 */
export function createRendererOwnerInit<O extends RendererOwner<unknown>>(
  createRendererOwner: () => O,
  defaultInitOptions?: Partial<InitOptionsOfRendererOwner<O>>,
): RendererOwnerInit<O> {
  return (
    initOptions: InitOptionsOfRendererOwner<O>,
    initOptionsMergeMode?: InitOptionsMergeMode,
  ) => {
    const finalInitOptions =
      initOptionsMergeMode === 'replace'
        ? initOptions
        : merge({}, defaultInitOptions, initOptions)
    return createRendererOwner().init(finalInitOptions)
  }
}

/**
 * 创建渲染器
 * @param init 初始化函数
 */
export function createRenderer<O extends RendererOwner<unknown>>(
  init: RendererOwnerInit<O>,
): FC<RendererProps<O>> {
  interface OwnerClsCompProps {
    initOptions: InitOptionsOfRendererOwner<O>
    initOptionsMergeMode?: InitOptionsMergeMode
  }

  /**
   * 在严格模式下，使用函数组件碰到的问题：
   *
   * * 如果用 useMemo init，用 useEffect dispose：useMemo 和 useEffect 都执行两遍，但 useEffect 拿到的都是 useMemo 第二次生成的值，即 dispose 一次再继续用
   * * 如果用 useEffect init、dispose，那会导致一次没必要的渲染，在同步加载情况下会引起闪烁
   * * useId、useRef 会产生两个不同的，用不上
   *
   * 后续再考虑一下函数组件有没有更好的使用方式
   *
   * 目前的类组件会执行两次 init，两次 render，但两次 render 都使用后一次生成的值。首次渲染不会执行 unmount，后续会针对第二次的值执行一次 unmount
   */
  class OwnerClsComp extends Component<OwnerClsCompProps> {
    private _owner: O

    public constructor(props: OwnerClsCompProps) {
      super(props)
      const { initOptions, initOptionsMergeMode } = props
      this._owner = init(initOptions, initOptionsMergeMode)
      // console.log('OwnerClsComp init', this._owner)
    }

    public shouldComponentUpdate(): boolean {
      return false
    }

    public componentWillUnmount(): void {
      this._owner.dispose()
      // console.log('OwnerClsComp unmount', this._owner)
    }

    public render(): ReactNode {
      return this._owner.render()
    }
  }

  return ({ initOptionsMergeMode, ...restProps }) => {
    return (
      <OwnerClsComp
        initOptions={restProps as InitOptionsOfRendererOwner<O>}
        initOptionsMergeMode={initOptionsMergeMode}
      />
    )
  }
}

/**
 * 渲染器拥有者
 */
export interface RendererOwner<InitOptions> {
  /**
   * 初始化
   * @param initOptions 初始化选项
   */
  init(initOptions: InitOptions): this
  /**
   * 渲染
   */
  render(): ReactElement
  /**
   * 处理
   */
  dispose: Disposer
}

/**
 * 渲染器拥有者的初始化选项
 */
export type InitOptionsOfRendererOwner<O> =
  O extends RendererOwner<infer P> ? P : never

/**
 * 渲染器拥有者初始化函数
 */
export type RendererOwnerInit<O extends RendererOwner<unknown>> = (
  initOptions: InitOptionsOfRendererOwner<O>,
  initOptionsMergeMode?: InitOptionsMergeMode,
) => O

/**
 * 初始化选项合并模式
 * * merge: lodash merge
 * * replace: 整体替换
 */
export type InitOptionsMergeMode = 'merge' | 'replace'

/**
 * 渲染器属性
 */
export type RendererProps<O extends RendererOwner<unknown>> =
  InitOptionsOfRendererOwner<O> & {
    /**
     * 初始化选项合并模式，默认：merge
     */
    initOptionsMergeMode?: InitOptionsMergeMode
  }
