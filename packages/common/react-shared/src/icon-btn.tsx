import {
  VCVN_COLOR_HIGHLIGHT,
  VCVN_COLOR_HOVER_HIGHLIGHT,
  VCVN_COLOR_TEXT_DISABLED,
} from '@p-lc/shared'
import styled from 'styled-components'

/**
 * 图标按钮
 */
export const IconBtn = styled.div.attrs<{
  /**
   * 是否禁用
   */
  $disabled?: boolean
  /**
   * 是否激活
   */
  $actived?: boolean
}>(({ $disabled }) => ({
  className: 'lc-icon-btn',
  ...($disabled
    ? {
        onClick: undefined,
      }
    : {}),
}))`
  font-size: 12px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  ${
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ({ $disabled, $actived }) =>
      $disabled
        ? {
            cursor: 'not-allowed',
            color: VCVN_COLOR_TEXT_DISABLED,
          }
        : $actived && {
            color: VCVN_COLOR_HIGHLIGHT,
          }
  }

  &:hover {
    color: ${
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      ({ $disabled }) =>
        $disabled ? VCVN_COLOR_TEXT_DISABLED : VCVN_COLOR_HOVER_HIGHLIGHT
    };
  }
`
