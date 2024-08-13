import { silentRun } from '@p-lc/shared'
import { findDOMNode } from 'react-dom'

/**
 * 安静地查找 DOM 节点，不要在开发环境报错
 */
export const findDOMNodeSilently =
  process.env.NODE_ENV === 'development'
    ? silentRun(findDOMNode, 'deprecated')
    : findDOMNode
