import { Splitter, type SplitterProps } from 'antd'
import type { PanelProps } from 'antd/es/splitter/interface'
import { createElement, memo, type FC, type PropsWithChildren } from 'react'

/**
 * 可配置的分割器属性
 */
export interface ConfigurableSplitterProps
  extends PropsWithChildren<SplitterProps> {
  panels?: PropsWithChildren<PanelProps>[]
}

/**
 * 可配置的分割器
 *
 * Splitter 依赖 children 解析，没办法交给运行时处理 Panel 的嵌套关系
 */
export const ConfigurableSplitter: FC<ConfigurableSplitterProps> = memo(
  ({ panels, ...restProps }) => {
    return createElement(
      Splitter,
      restProps,
      ...(panels || []).map((ps) => <Splitter.Panel {...ps} />),
    )
  },
)
