import { ScratchEditorRenderer } from '@p-lc/scratch-suite'
import { EN_US, ZH_CN } from '@p-lc/shared'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ScratchEditorRenderer
      language={EN_US}
      demos={[
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
          id: 'style',
          name: {
            [EN_US]: 'Style',
            [ZH_CN]: '样式',
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
                    children: '1234234',
                  },
                },
                {
                  id: 'v3',
                  name: 'nv3',
                  type: 'View',
                  children: [
                    {
                      id: 't1',
                      name: 'nt1',
                      type: 'Text',
                      props: {
                        children: 'abc',
                        style: {
                          type: 'static',
                          value: {
                            color: 'red',
                          },
                        },
                      },
                    },
                    {
                      id: 't2',
                      name: 'nt2',
                      type: 'Text',
                      props: {
                        children: 'efg',
                        style: {
                          type: 'static',
                          value: {
                            color: 'green',
                          },
                        },
                      },
                    },
                  ],
                },
                {
                  id: 'v4',
                  name: 'nv4',
                  type: 'View',
                  props: {
                    style: {
                      type: 'static',
                      value: {
                        marginTop: 1000,
                      },
                    },
                    children: 'bbbb',
                  },
                },
              ],
            },
          },
        },
      ]}
    />
  </StrictMode>,
)
