import { IconBtn } from '@p-lc/react-shared'
import { Button, Select } from 'antd'
import styled from 'styled-components'

/**
 * 操作工具栏按钮
 */
export const ActionToolbarBtn = styled(Button)`
  margin: 0 8px;
`

/**
 * 操作工具栏图标按钮
 */
export const ActionToolbarIconBtn = styled(IconBtn)`
  margin: 0 4px;
`

/**
 * 操作工具栏选择器
 */
export const ActionToolbarSelect = styled(Select)`
  margin: 0 8px;
` as typeof Select
