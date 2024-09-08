# Editor plugin

## Create a editor plugin

A editor plugin is a JavaScript object whose type can be specified via `EditorPlugin`.

```tsx
import { AntdEditorPlugin } from '@p-lc/antd-suite'
import { EditorPlugin } from '@p-lc/editor'

const editorPluginFooter: EditorPlugin<
  {
    editor: {
      uidlStore: {
        uidl: {
          footer: string
        } | null
      }
    }
  },
  AntdEditorPlugin
> = {
  id: 'footer',
  initEditor(ctx) {
    ctx.layoutStore.config.footer = {
      Component: () => {
        return <div>{ctx.uidlStore.uidl?.footer}</div>
      },
    }
    return () => {
      console.log('dispose', ctx.uidlStore.uidl?.footer)
    }
  },
}
```

## Use a editor plugin

The new plugin can be added through the editor `use` function. Then, we can convert the editor into a component of the front-end framework by some conversion functions.

```tsx
import { AntdEditor, antdEditorInitOptions, createAntdEditor } from '@p-lc/antd-suite'
import { createRenderer, createRendererOwnerInit } from '@p-lc/react-shared'

function createMyEditor() {
  return createAntdEditor().use(editorPluginFooter) as unknown as AntdEditor
}

const MyEditorRenderer = createRenderer(
  createRendererOwnerInit(createMyEditor, antdEditorInitOptions),
)

export const AppEditor: FC = () => {
  return (
    <MyEditorRenderer
      uidl={uidl}
      onSave={(newUidl) => {
        console.log('save', newUidl)
      }}
    />
  )
}
```
