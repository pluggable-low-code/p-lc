[English (US)](./readme.md) | 中文（简体）

# p-lc

一个插件化低代码库。

## 为什么选 p-lc ？

- 吃自己的狗粮：没有内置的功能，只有内置的插件。所以我们有信心，你可以通过新的插件实现任何功能。
- 框架不可知：运行时的核心部分（插件）只维护数据和逻辑。视图相关的功能都通过额外的插件添加。
- 部分自举：除了预览器，元素属性编辑的表单也是通过运行时渲染实现的。表单则是通过编辑器搭建出来的。

## 快速开始（React）

### 安装

选择一个套餐，比如：`@p-lc/antd-suite`，并安装依赖。

```sh
pnpm i @p-lc/antd-suite
# or
npm i @p-lc/antd-suite
```

### 使用

#### 运行时

导入运行时渲染器，作为 React 组件使用。

```tsx
import { AntdRuntimeRenderer } from '@p-lc/antd-suite'
import { FC } from 'react'

const uidl = {
  components: [
    {
      elementType: 'Flex_0',
      pkgName: '@lc-types/antd',
      pkgVersion: '0.0.1',
      componentType: 'Flex',
    },
    {
      elementType: 'TypographyText_1',
      pkgName: '@lc-types/antd',
      pkgVersion: '0.0.1',
      componentType: 'TypographyText',
      importPath: ['Typography', 'Text'],
    },
  ],
  view: {
    id: 'root',
    name: 'Root Flex',
    type: 'Flex_0',
    props: {
      style: {
        type: 'static',
        value: {
          height: '100%',
        },
      },
      vertical: {
        type: 'box',
        boxType: 'switch',
        case: 'static',
        oldExprs: {},
        expr: true,
      },
    },
    children: [
      {
        id: 'text',
        name: 'Typography text',
        type: 'TypographyText_1',
        props: {
          children: 'Hello World',
        },
      },
    ],
  },
}

export const AppRuntime: FC = () => {
  return <AntdRuntimeRenderer uidl={uidl} />
}
```

#### 编辑器

导入编辑器渲染器，作为 React 组件使用。

```tsx
import { AntdEditorRenderer } from '@p-lc/antd-suite'
import { FC } from 'react'

const uidl = {
  components: [
    {
      elementType: 'Flex_0',
      pkgName: '@lc-types/antd',
      pkgVersion: '0.0.1',
      componentType: 'Flex',
    },
    {
      elementType: 'TypographyText_1',
      pkgName: '@lc-types/antd',
      pkgVersion: '0.0.1',
      componentType: 'TypographyText',
      importPath: ['Typography', 'Text'],
    },
  ],
  view: {
    id: 'root',
    name: 'Root Flex',
    type: 'Flex_0',
    props: {
      style: {
        type: 'static',
        value: {
          height: '100%',
        },
      },
      vertical: {
        type: 'box',
        boxType: 'switch',
        case: 'static',
        oldExprs: {},
        expr: true,
      },
    },
    children: [
      {
        id: 'text',
        name: 'Typography text',
        type: 'TypographyText_1',
        props: {
          children: 'Hello World',
        },
      },
    ],
  },
}

export const AppEditor: FC = () => {
  return (
    <AntdEditorRenderer
      uidl={uidl}
      onSave={(newUidl) => {
        console.log('save', newUidl)
      }}
    />
  )
}
```

![](https://s1.locimg.com/2024/09/08/a07a994fd13fe.png)
