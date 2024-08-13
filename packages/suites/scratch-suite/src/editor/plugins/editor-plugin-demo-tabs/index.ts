import type { EditorPlugin } from '@p-lc/editor'
import { editorPluginLayoutStoreInit } from '@p-lc/editor'
import type { ClassicalLayoutEditorPlugin } from '@p-lc/editor-classical-layout-plugins'
import { EN_US, POSITION_TYPE_BEFORE, ZH_CN } from '@p-lc/shared'
import type { EditorUidl } from '@p-lc/uidl'
import { mapValues, merge } from 'lodash-uni'
import { DemoTabs } from './demo-tabs'

export * from './demo-tabs'

/**
 * 编辑器 Demo 标签页插件属性扩展
 */
export interface EditorPluginDemoTabsPropertiesExt {
  editor: {
    /**
     * DEMO 仓库
     */
    demoStore: {
      /**
       * 所有 Demo
       */
      demos: Demo[]
      /**
       * 当前 Demo
       */
      currentDemo: Demo
    }
  }
  editorInitOptions: {
    /**
     * 所有 Demo
     */
    demos?: Demo[]
  }
}

/**
 * Demo，承载不同的 UIDL
 */
export interface Demo {
  /**
   * 唯一标识
   */
  id: string
  /**
   * 名称
   */
  name: Record<string, string>
  /**
   * 编辑器 UIDL
   */
  uidl: EditorUidl
}

/**
 * 编辑器 Demo 标签页插件
 */
export const editorPluginDemoTabs: EditorPlugin<
  EditorPluginDemoTabsPropertiesExt,
  ClassicalLayoutEditorPlugin
> = {
  id: 'demo-tabs',
  position: {
    type: POSITION_TYPE_BEFORE,
    target: editorPluginLayoutStoreInit,
  },
  initEditor(ctx) {
    const { layoutStore, uidlStore, i18nStore } = ctx
    const demos = ctx.initOptions.demos || defaultDemos
    const sp = new URLSearchParams(location.search)
    const demoId = sp.get('demoId')
    const currentDemo = demos.find((demo) => demo.id === demoId) || demos[0]
    ctx.demoStore = { demos, currentDemo }
    merge(layoutStore.config, {
      header: {
        Content: DemoTabs,
      },
    } satisfies typeof layoutStore.config)
    for (const demo of demos) {
      i18nStore.addResource(
        mapValues(demo.name, (v) => ({
          [`demoName${demo.id}`]: v,
        })),
      )
    }
    uidlStore.init(currentDemo.uidl)
  },
}

/**
 * 默认所有 Demo
 */
export const defaultDemos: Demo[] = [
  {
    id: 'hello-world',
    name: {
      [EN_US]: 'Hello World',
      [ZH_CN]: '你好世界',
    },
    uidl: {
      view: {
        id: 'v1',
        name: 'nv1',
        type: 'View',
        props: {
          children: 'Hello World',
        },
      },
    },
  },
  {
    id: 'nest',
    name: {
      [EN_US]: 'Nest',
      [ZH_CN]: '嵌套',
    },
    uidl: {
      view: {
        id: 'v1',
        name: 'nv1',
        type: 'View',
        children: [
          {
            id: 'v2',
            name: 'nv2',
            type: 'View',
            props: {
              children: '1111',
            },
          },
          {
            id: 'v3',
            name: 'nv3',
            type: 'View',
            props: {
              children: '22 22',
            },
          },
        ],
      },
    },
  },
]
