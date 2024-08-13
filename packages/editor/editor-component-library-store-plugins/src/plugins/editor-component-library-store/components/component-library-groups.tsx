import { useEditor } from '@p-lc/editor'
import type { Cd, Pd } from '@p-lc/pd'
import type { StyleProps } from '@p-lc/react-shared'
import { withStylePropsMemo } from '@p-lc/react-shared'
import { mapGroupBy } from '@p-lc/shared'
import { Collapse } from 'antd'
import { isUndefined } from 'lodash-uni'
import type { ComponentProps, FC } from 'react'
import { useMemo } from 'react'
import styled from 'styled-components'
import type { ComponentLibraryEditor } from '../../../types'
import { ComponentLibraryGroup } from './component-library-group'

/**
 * 组件库所有组属性
 */
export interface ComponentLibraryGroupsProps extends StyleProps {
  /**
   * PD
   */
  pd: Pd
}

/**
 * 组件声明组
 */
export interface CdGroup {
  /**
   * 名称
   */
  name?: string
  /**
   * 组件
   */
  components: Cd[]
}

/**
 * 组件库所有组
 */
export const ComponentLibraryGroups: FC<ComponentLibraryGroupsProps> =
  withStylePropsMemo(({ pd: { pkgName, components } }) => {
    const {
      i18nStore: { tText },
    } = useEditor<ComponentLibraryEditor>()
    const groups: CdGroup[] = useMemo(() => {
      const m = mapGroupBy(
        components.filter((component) => !component.hidden),
        (component) => {
          let groupName = component.groupName
          if (!isUndefined(groupName)) {
            groupName = tText(groupName, {
              pkgName,
            })
          }
          return groupName
        },
      )
      return [...m.entries()].map(([name, comps]) => ({
        name,
        components: comps,
      }))
    }, [components, pkgName, tText])
    const collapseItems = useMemo(() => {
      const items: NonNullable<ComponentProps<typeof Collapse>['items']> = []
      for (const group of groups) {
        if (isUndefined(group.name)) continue
        items.push({
          key: group.name,
          label: group.name,
          children: (
            <ComponentLibraryGroup
              pkgName={pkgName}
              components={group.components}
            />
          ),
        })
      }
      return items
    }, [groups, pkgName])
    const defaultActiveKey = useMemo(
      () => collapseItems.map((item) => item.key as string),
      [collapseItems],
    )
    const defaultGroup = useMemo(
      () => groups.find((group) => isUndefined(group.name)),
      [groups],
    )
    return (
      <InternalComponentLibraryGroupsContainer className="lc-clib-groups">
        {defaultGroup && (
          <ComponentLibraryGroup
            pkgName={pkgName}
            components={defaultGroup.components}
            className="lc-clib-default-group"
          />
        )}
        <Collapse
          items={collapseItems}
          defaultActiveKey={defaultActiveKey}
          ghost
          size="small"
          className="lc-clib-group-collapse"
        />
      </InternalComponentLibraryGroupsContainer>
    )
  })

/**
 * 内部：组件库所有组容器
 */
export const InternalComponentLibraryGroupsContainer = styled.div`
  height: calc(100% + 8px);
  overflow: auto;
  padding: 8px 0;
  margin-top: -8px;

  .lc-clib-default-group {
    padding: 0 12px;
  }

  &&& {
    .ant-collapse-content-box {
      padding: 0 12px;
    }
  }
`
