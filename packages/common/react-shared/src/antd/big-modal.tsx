import { Modal } from 'antd'
import { isBoolean } from 'lodash-uni'
import styled from 'styled-components'

/**
 * 大模态框，宽度 1000，高度自适应，上下各 100
 */
export const BigModal = styled(Modal).attrs({ width: 1000 })<{
  /**
   * 头部高度，默认 32
   */
  $header?: number | boolean
}>`
  max-width: 100%;

  .ant-modal-body {
    display: flow-root;
    height: calc(
      100vh - 284px -
        ${(
          { $header },
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        ) => ($header ? (isBoolean($header) ? 32 : $header) : 0)}px
    );
  }
`
