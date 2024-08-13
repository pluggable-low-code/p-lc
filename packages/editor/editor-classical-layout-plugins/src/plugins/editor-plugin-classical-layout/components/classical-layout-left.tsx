import { useEditor } from '@p-lc/editor'
import type { StyleProps } from '@p-lc/react-shared'
import { withStylePropsObserver } from '@p-lc/react-shared'
import {
  VCVN_COLOR_BORDER,
  VCVN_COLOR_HIGHLIGHT,
  VCVN_COLOR_HOVER_HIGHLIGHT,
  definedValues,
} from '@p-lc/shared'
import { Tooltip } from 'antd'
import { sortBy } from 'lodash-uni'
import type { FC } from 'react'
import { useMemo } from 'react'
import styled, { css } from 'styled-components'
import type { ClassicalLayoutEditor } from '../../../types'
import type { ClassicalLayoutLeftItem } from '../types'
import { Resize } from './resize'

/**
 * 经典布局左部
 */
export const ClassicalLayoutLeft: FC<StyleProps> = withStylePropsObserver(
  () => {
    const {
      layoutStore: {
        config: {
          left: {
            disable = false,
            Content = ClassicalLayoutLeftContent,
            minWidth = 200,
            maxWidth = '45%',
            resizable = true,
          } = {},
        } = {},
        state: { leftWidth },
        setLeftWidth,
      },
    } = useEditor<ClassicalLayoutEditor>()
    if (disable) {
      return null
    }
    return (
      <InternalClassicalLayoutLeftContainer
        border="right"
        width={leftWidth}
        minWidth={minWidth}
        maxWidth={maxWidth}
        resizable={resizable}
        onWidthChangeEnd={setLeftWidth}
        className="lc-cl-left"
      >
        <Content />
      </InternalClassicalLayoutLeftContainer>
    )
  },
)

/**
 * 内部：经典布局左部容器
 */
export const InternalClassicalLayoutLeftContainer = styled(Resize)`
  height: 100%;
  border-right: 1px solid ${VCVN_COLOR_BORDER};
  flex: none;
`

/**
 * 经典布局左部内容
 */
export const ClassicalLayoutLeftContent: FC<StyleProps> =
  withStylePropsObserver(() => {
    const {
      layoutStore: {
        config: {
          left: {
            contentItems,
            contentItemWidth = 48,
            contentItemHeight = 48,
          } = {},
        } = {},
        state: { leftActiveItemId },
        setLeftActiveItemId,
      },
      i18nStore: { tText },
    } = useEditor<ClassicalLayoutEditor>()
    const finalItems = useMemo(
      () =>
        sortBy(definedValues(contentItems), ({ index = Infinity }) => index),
      [contentItems],
    )
    const activeItem: ClassicalLayoutLeftItem | undefined = useMemo(
      () =>
        finalItems.find((item) => item.id === leftActiveItemId) ||
        finalItems[0],
      [finalItems, leftActiveItemId],
    )
    return (
      <InternalClassicalLayoutLeftContentContainer className="lc-cl-left-content">
        <div className="lc-icons">
          {finalItems.map((item) => {
            const isActive = item === activeItem
            return (
              <Tooltip
                key={item.id}
                title={tText(item.iconTip)}
                placement="right"
              >
                <InternalClassicalLayoutLeftContentIconContainer
                  $width={contentItemWidth}
                  $height={contentItemHeight}
                  $isActive={isActive}
                  onClick={setLeftActiveItemId.bind(null, item.id)}
                  className="lc-icon"
                >
                  <item.Icon isActive={isActive} />
                </InternalClassicalLayoutLeftContentIconContainer>
              </Tooltip>
            )
          })}
        </div>
        {finalItems.map((item) => (
          <InternalClassicalLayoutLeftContentInnerContainer
            key={item.id}
            $isActive={item === activeItem}
            className="lc-inner"
          >
            <item.Component isActive={item === activeItem} />
          </InternalClassicalLayoutLeftContentInnerContainer>
        ))}
      </InternalClassicalLayoutLeftContentContainer>
    )
  })

/**
 * 内部：经典布局左部内容容器
 */
export const InternalClassicalLayoutLeftContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  > .lc-icons {
    height: 100%;
    display: flex;
    flex-direction: column;
    border-right: 1px solid ${VCVN_COLOR_BORDER};
  }
`

/**
 * 内部：经典布局左部内容图标容器
 */
export const InternalClassicalLayoutLeftContentIconContainer = styled.div<{
  $width: number
  $height: number
  $isActive: boolean
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  ${
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    (props) => ({
      width: props.$width,
      height: props.$height,
    })
  }

  &:hover {
    color: ${VCVN_COLOR_HOVER_HIGHLIGHT};
  }

  && {
    ${
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      (props) => ({
        color: props.$isActive ? VCVN_COLOR_HIGHLIGHT : undefined,
      })
    }
  }
`

/**
 * 内部：经典布局左部内容里层容器
 */
export const InternalClassicalLayoutLeftContentInnerContainer = styled.div<{
  $isActive: boolean
}>`
  ${
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    (props) =>
      props.$isActive
        ? null
        : css`
            display: none;
          `
  }
  flex: auto;
  width: 0;
  height: 100%;
`
