English (US) | [中文（简体）](./readme-zh-cn.md)

# p-lc

A pluggable low-code library.

## Why p-lc ?

- Dogfooding: There are no built-in features, only built-in plugins. So we are confident that you can achieve any feature with the new plugin.
- Framework agnostic: The core part (plugins) of the runtime only maintains data and logic. View-related features are added through additional plugins.
- Partial bootstrapping: In addition to the previewer, the element attributes editing form is also implemented through runtime rendering. The form is built through the editor.

## Quick start (React)

### Installation

Choose a suite, such as: `@p-lc/antd-suite`, and install the dependency.

```sh
pnpm i @p-lc/antd-suite
# or
npm i @p-lc/antd-suite
```

### Usage

#### Runtime

Import the runtime renderer and use it as a React component.

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

#### Editor

Import the editor renderer and use it as a React component.

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
