import type { StyleProps } from '@p-lc/react-shared'
import {
  TypographyTextTip,
  withStylePropsMemo,
  withStylePropsMf,
} from '@p-lc/react-shared'
import {
  attrWrapperPropsBaseKeys,
  deleteUndefinedValues,
  type LAYOUT_TYPE_HORIZONTAL,
  LAYOUT_TYPE_VERTICAL,
} from '@p-lc/shared'
import { omit, pick } from 'lodash-uni'
import type { FC, ReactNode, RefAttributes } from 'react'
import { createContext, useContext } from 'react'
import styled, { css } from 'styled-components'

/**
 * 属性（Attribute）包装属性基础部分
 */
export interface AttrWrapperPropsBase {
  /**
   * 标签
   */
  label?: string
  /**
   * 标签前缀
   */
  labelPrefix?: ReactNode
  /**
   * 提示
   */
  tip?: string
  /**
   * 布局，默认：水平
   */
  layout?: typeof LAYOUT_TYPE_HORIZONTAL | typeof LAYOUT_TYPE_VERTICAL
}

/**
 * 划分属性（Attribute）包装属性基础部分
 * @param props 属性
 */
export function splitAttrWrapperPropsBase<T extends AttrWrapperPropsBase>(
  props: T,
): [Pick<T, keyof AttrWrapperPropsBase>, Omit<T, keyof AttrWrapperPropsBase>] {
  return [
    pick(props, attrWrapperPropsBaseKeys),
    omit(props, attrWrapperPropsBaseKeys),
  ]
}

/**
 * 属性（Attribute）包装属性
 */
export interface AttrWrapperProps
  extends StyleProps,
    AttrWrapperPropsBase,
    RefAttributes<HTMLDivElement> {
  children?: ReactNode
}

/**
 * 属性包装
 */
export const AttrWrapper = withStylePropsMf<AttrWrapperProps, HTMLDivElement>(
  (props, ref) => {
    const [rawBaseProps, { children }] = splitAttrWrapperPropsBase(props)
    const contextBaseProps = useAttrWrapperPropsBase()
    const baseProps = {
      ...contextBaseProps,
      ...deleteUndefinedValues(rawBaseProps),
    }
    const { layout } = baseProps
    return (
      <InternalAttrWrapperContainer
        className="lc-attr-wrapper"
        $layout={layout}
        ref={ref}
      >
        <AttrWrapperLabel {...baseProps} />
        <div className="lc-aw-content">
          <AttrWrapperPropsBaseContextProvider value={null}>
            {children}
          </AttrWrapperPropsBaseContextProvider>
        </div>
      </InternalAttrWrapperContainer>
    )
  },
)

/**
 * 内部：属性包装容器
 */
export const InternalAttrWrapperContainer = styled.div<{
  /**
   * 布局
   */
  $layout?: typeof LAYOUT_TYPE_HORIZONTAL | typeof LAYOUT_TYPE_VERTICAL
}>`
  display: flex;
  padding: 4px;

  > .lc-aw-content {
    width: 0;
    flex: auto;
    display: flex;
    align-items: center;
  }

  ${
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ({ $layout }) =>
      $layout === LAYOUT_TYPE_VERTICAL &&
      css`
        flex-wrap: wrap;

        > .lc-aw-content {
          width: 100%;
          padding-left: 22px;
        }
      `
  }
`

/**
 * 属性（Attribute）包装标签属性
 */
export interface AttrWrapperLabelProps
  extends StyleProps,
    AttrWrapperPropsBase {}

/**
 * 属性包装标签
 */
export const AttrWrapperLabel: FC<AttrWrapperLabelProps> = withStylePropsMemo(
  ({ label, labelPrefix, tip, layout }) => {
    return (
      <InternalAttrWrapperLabelContainer
        $layout={layout}
        className="lc-aw-label"
      >
        {labelPrefix}
        <TypographyTextTip tip={tip} className="lc-text">
          {label}
        </TypographyTextTip>
      </InternalAttrWrapperLabelContainer>
    )
  },
)

export const InternalAttrWrapperLabelContainer = styled.div<{
  /**
   * 布局
   */
  $layout?: typeof LAYOUT_TYPE_HORIZONTAL | typeof LAYOUT_TYPE_VERTICAL
}>`
  width: 80px;
  height: 24px;
  line-height: 24px;
  margin-right: 5px;
  flex: none;
  display: flex;

  .lc-text {
    width: 0;
    flex: auto;
  }

  ${
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ({ $layout }) =>
      $layout === LAYOUT_TYPE_VERTICAL &&
      css`
        width: 100%;
        margin-right: 5px;
        margin-bottom: 5px;
      `
  }
`

/**
 * 属性（Attribute）包装属性基础部分上下文
 */
const AttrWrapperPropsBaseContext = createContext<AttrWrapperPropsBase | null>(
  null,
)

/**
 * 属性（Attribute）包装属性基础部分上下文提供者
 */
export const AttrWrapperPropsBaseContextProvider =
  AttrWrapperPropsBaseContext.Provider

/**
 * 使用属性（Attribute）包装属性基础部分
 */
export function useAttrWrapperPropsBase(): AttrWrapperPropsBase | null {
  return useContext(AttrWrapperPropsBaseContext)
}
