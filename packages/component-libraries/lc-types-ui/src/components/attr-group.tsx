import type { StyleProps } from '@p-lc/react-shared'
import { withStylePropsMemo } from '@p-lc/react-shared'
import { LAYOUT_TYPE_VERTICAL, VCVN_COLOR_BORDER } from '@p-lc/shared'
import { Collapse } from 'antd'
import { isNil } from 'lodash-uni'
import type { ComponentProps, FC, ReactNode } from 'react'
import { useMemo } from 'react'
import styled from 'styled-components'
import {
  AttrWrapperLabel,
  AttrWrapperPropsBaseContextProvider,
  useAttrWrapperPropsBase,
} from '../shared'

/**
 * 折叠面板属性
 */
type CollapseProps = ComponentProps<typeof Collapse>

/**
 * 属性（Attribute）组属性
 */
export interface AttrGroupProps extends StyleProps, CollapseProps {
  /**
   * 标签
   */
  label?: ReactNode
  children?: ReactNode
}

/**
 * 属性组
 */
export const AttrGroup: FC<AttrGroupProps> = withStylePropsMemo(
  ({ label, children, ...restProps }) => {
    const contextBaseProps = useAttrWrapperPropsBase()
    if (isNil(label)) {
      label = (
        <AttrWrapperLabelForGroup
          {...contextBaseProps}
          layout={LAYOUT_TYPE_VERTICAL}
        />
      )
    }
    const items: CollapseProps['items'] = useMemo(() => {
      return [
        {
          key: '',
          label,
          children: (
            <AttrWrapperPropsBaseContextProvider value={null}>
              {children}
            </AttrWrapperPropsBaseContextProvider>
          ),
        },
      ]
    }, [children, label])
    return (
      <InternalAttrGroupCollapse
        className="lc-attr-group"
        size="small"
        bordered={false}
        items={items}
        defaultActiveKey=""
        {...restProps}
      />
    )
  },
)

/**
 * 内部：属性组折叠面板
 */
const InternalAttrGroupCollapse: typeof Collapse = styled(Collapse)`
  border-radius: 0;
  background: transparent;

  .ant-collapse-header {
    background: ${VCVN_COLOR_BORDER};
  }

  &&& .ant-collapse-content-box {
    padding: 0 0 0 4px;
    display: flex;
    flex-direction: column;
  }
`

/**
 * 组使用的属性包装标签
 */
const AttrWrapperLabelForGroup = styled(AttrWrapperLabel)`
  height: 22px;
  line-height: 22px;

  &&& {
    margin: 0;
  }
`
