import type { StyleProps } from '@p-lc/react-shared'
import { withStylePropsMemo } from '@p-lc/react-shared'
import { Tabs } from 'antd'
import type { ComponentProps, FC } from 'react'
import { useMemo } from 'react'
import styled from 'styled-components'

/**
 * 标签页属性
 */
type TabsProps = ComponentProps<typeof Tabs>

/**
 * 属性（Attribute）分类属性
 */
export interface AttrCategoriesProps extends StyleProps, TabsProps {}

/**
 * 属性分类
 */
export const AttrCategories: FC<AttrCategoriesProps> = withStylePropsMemo(
  (props) => {
    const { items } = props
    const finalItems = useMemo(() => {
      if (!items) return items
      const ret: typeof items = []
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        const { key } = item
        // 避免 key 相同报错
        ret.push({
          ...item,
          key: `${key}${i}`,
        })
      }
      return ret
    }, [items])
    return (
      <InternalAttrCategoriesTabs
        size="small"
        type="card"
        className="lc-attr-categories"
        {...props}
        items={finalItems}
      />
    )
  },
)

/**
 * 内部：属性分类标签页
 */
const InternalAttrCategoriesTabs = styled(Tabs)`
  flex: auto;
  height: 0;

  &&& .ant-tabs-nav {
    margin-bottom: 0;
  }

  .ant-tabs-content-holder {
    padding: 8px 0;
    overflow: auto;
  }
`
