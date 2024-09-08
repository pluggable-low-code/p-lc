# Runtime plugin

## Create a runtime plugin

A runtime plugin is a JavaScript object whose type can be specified via `RuntimePlugin`.

```tsx
import { AntdRuntimePlugin } from '@p-lc/antd-suite'
import { RuntimePlugin } from '@p-lc/runtime'

const runtimePluginTitle: RuntimePlugin<
  {
    runtime: {
      uidl: {
        title: string
      }
    }
  },
  AntdRuntimePlugin
> = {
  id: 'title',
  initRuntime(ctx) {
    console.log('init', ctx.uidl.title)
    return () => {
      console.log('dispose', ctx.uidl.title)
    }
  },
}
```

## Use a runtime plugin

The new plugin can be added through the runtime `use` function. Then, we can convert the runtime into a component of the front-end framework by some conversion functions.

```tsx
import { AntdRuntime, antdRuntimeInitOptions, createAntdRuntime } from '@p-lc/antd-suite'
import { createRenderer, createRendererOwnerInit } from '@p-lc/react-shared'

function createMyRuntime() {
  return createAntdRuntime().use(runtimePluginTitle) as AntdRuntime
}

const MyRuntimeRenderer = createRenderer(
  createRendererOwnerInit(createMyRuntime, antdRuntimeInitOptions),
)

export const AppRuntime: FC = () => {
  const [visible, setVisible] = useState(true)
  return (
    <>
      <button onClick={() => setVisible(!visible)}>dispose</button>
      {visible && <MyRuntimeRenderer uidl={uidl} />}
    </>
  )
}
```
