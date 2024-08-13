/* eslint-disable @typescript-eslint/naming-convention */
import { AntdEditorRenderer } from '@p-lc/antd-suite'
import { LocalStorageDataLoader } from '@p-lc/shared'
import { type EditorUidl } from '@p-lc/uidl'
import { memo, type FC } from 'react'

/**
 * UIDL 加载器
 */
const uidlLoader = new LocalStorageDataLoader<EditorUidl>(
  'demo:antd-todo:uidl',
  {
    data: {
      editingTodoText: '',
      todos: [
        {
          id: 0,
          text: 'All lc types of antd.',
          completed: false,
        },
        {
          id: 1,
          text: 'Todo list demo.',
          completed: true,
        },
      ],
    },
    components: [
      {
        elementType: 'Flex_0',
        pkgName: '@lc-types/antd',
        pkgVersion: '0.0.1',
        componentType: 'Flex',
      },
      {
        elementType: 'Button_1',
        pkgName: '@lc-types/antd',
        pkgVersion: '0.0.1',
        componentType: 'Button',
      },
      {
        elementType: 'TypographyText_2',
        pkgName: '@lc-types/antd',
        pkgVersion: '0.0.1',
        componentType: 'TypographyText',
        importPath: ['Typography', 'Text'],
      },
      {
        elementType: 'Input_3',
        pkgName: '@lc-types/antd',
        pkgVersion: '0.0.1',
        componentType: 'Input',
      },
      {
        elementType: 'Checkbox_4',
        pkgName: '@lc-types/antd',
        pkgVersion: '0.0.1',
        componentType: 'Checkbox',
      },
      {
        elementType: 'Table_5',
        pkgName: '@lc-types/antd',
        pkgVersion: '0.0.1',
        componentType: 'Table',
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
          id: 'rCCaPpdHAk_kcQs6HxBi8A',
          name: 'Flex',
          type: 'Flex_0',
          children: [
            {
              id: 'reMJRo57OIXWGBD1otuikg',
              name: 'Typography text',
              type: 'TypographyText_2',
              props: {
                children: {
                  type: 'box',
                  boxType: 'switch',
                  case: 'StringAttr',
                  oldExprs: {},
                  expr: {
                    type: 'i18n',
                    key: 'title',
                  },
                },
                style: {
                  type: 'object',
                  value: {
                    fontSize: {
                      type: 'box',
                      boxType: 'switch',
                      case: 'static',
                      oldExprs: {},
                      expr: 24,
                    },
                    fontWeight: {
                      type: 'box',
                      boxType: 'switch',
                      case: 'static',
                      oldExprs: {},
                      expr: 700,
                    },
                  },
                },
              },
            },
          ],
          props: {
            justify: {
              type: 'box',
              boxType: 'switch',
              case: 'static',
              oldExprs: {},
              expr: 'center',
            },
          },
        },
        {
          id: 'r2TaI5wMNH$nPihoO8vjsB',
          name: 'Flex 2',
          type: 'Flex_0',
          children: [
            {
              id: 'r6$I5EuzQsH8u2GLjfyCZM',
              name: 'Input',
              type: 'Input_3',
              props: {
                placeholder: 'New Todo',
                value: {
                  type: 'box',
                  boxType: 'switch',
                  case: 'BindingAttr',
                  oldExprs: {},
                  expr: {
                    type: 'box',
                    boxType: 'switch',
                    case: 'js',
                    oldExprs: {},
                    expr: {
                      type: 'js',
                      code: 'ctx.root.data.editingTodoText',
                    },
                  },
                },
                onChange: {
                  type: 'box',
                  boxType: 'switch',
                  case: 'js',
                  oldExprs: {},
                  expr: {
                    type: 'js',
                    code: 'ev => {\n  ctx.root.setData(data => {\n    return {\n      ...data,\n      editingTodoText: ev.target.value,\n    }\n  })\n}',
                  },
                },
              },
            },
            {
              id: 'rfPm6nL2IulLk8hKNXPLTN',
              name: 'Button',
              type: 'Button_1',
              props: {
                children: {
                  type: 'box',
                  boxType: 'switch',
                  case: 'StringAttr',
                  oldExprs: {},
                  expr: 'Add',
                },
                type: {
                  type: 'box',
                  boxType: 'switch',
                  case: 'static',
                  oldExprs: {},
                  expr: 'primary',
                },
                onClick: {
                  type: 'box',
                  boxType: 'switch',
                  case: 'js',
                  oldExprs: {},
                  expr: {
                    type: 'js',
                    code: "() => {\n  if (!ctx.root.data.editingTodoText) return\n  ctx.root.setData(data => {\n    return {\n      ...data,\n      editingTodoText: '',\n      todos: [\n        ...data.todos,\n        {\n          id: Math.random(),\n          text: data.editingTodoText,\n          completed: false,\n        },\n      ],\n    }\n  })\n}",
                  },
                },
              },
            },
          ],
        },
        {
          id: 'r7MtXjAIFon8aCUBG32Uyf',
          name: 'Flex 3',
          type: 'Flex_0',
          children: [
            {
              id: 'r2tZBfc3PQ6ZibTbmcgazM',
              name: 'Checkbox',
              type: 'Checkbox_4',
              props: {
                children: {
                  type: 'box',
                  boxType: 'switch',
                  case: 'BindingAttr',
                  oldExprs: {},
                  expr: {
                    type: 'box',
                    boxType: 'switch',
                    case: 'js',
                    oldExprs: {},
                    expr: {
                      type: 'js',
                      code: 'ctx.loop.item.text',
                    },
                  },
                },
                checked: {
                  type: 'box',
                  boxType: 'switch',
                  case: 'BindingAttr',
                  oldExprs: {},
                  expr: {
                    type: 'box',
                    boxType: 'switch',
                    case: 'js',
                    oldExprs: {},
                    expr: {
                      type: 'js',
                      code: 'ctx.loop.item.completed',
                    },
                  },
                },
                onChange: {
                  type: 'box',
                  boxType: 'switch',
                  case: 'js',
                  oldExprs: {},
                  expr: {
                    type: 'js',
                    code: '(ev) => {\n  ctx.root.setData(data => {\n    return {\n      ...data,\n      todos: data.todos.map(todo => {\n        if (todo.id !== ctx.loop.item.id) return todo\n        return {\n          ...todo,\n          completed: ev.target.checked,\n        }\n      })\n    }\n  })\n}',
                  },
                },
              },
            },
            {
              id: 'reFM6MU5s3KU6h1hH7ZQFw',
              name: 'Button 3',
              type: 'Button_1',
              props: {
                children: {
                  type: 'box',
                  boxType: 'switch',
                  case: 'StringAttr',
                  oldExprs: {},
                  expr: 'Delete',
                },
                danger: {
                  type: 'box',
                  boxType: 'switch',
                  case: 'static',
                  oldExprs: {},
                  expr: true,
                },
                onClick: {
                  type: 'box',
                  boxType: 'switch',
                  case: 'js',
                  oldExprs: {},
                  expr: {
                    type: 'js',
                    code: '() => {\n  ctx.root.setData(data => {\n    return {\n      ...data,\n      todos: data.todos.filter(todo => todo.id !== ctx.loop.item.id),\n    }\n  })\n}',
                  },
                },
              },
            },
          ],
          for: {
            type: 'object',
            value: {
              items: {
                type: 'box',
                boxType: 'switch',
                case: 'BindingAttr',
                oldExprs: {},
                expr: {
                  type: 'box',
                  boxType: 'switch',
                  case: 'js',
                  oldExprs: {},
                  expr: {
                    type: 'js',
                    code: 'ctx.root.data.todos',
                  },
                },
              },
              key: {
                type: 'box',
                boxType: 'switch',
                case: 'static',
                oldExprs: {},
                expr: 'id',
              },
            },
          },
          props: {
            justify: {
              type: 'box',
              boxType: 'switch',
              case: 'static',
              oldExprs: {},
              expr: 'space-between',
            },
            align: {
              type: 'box',
              boxType: 'switch',
              case: 'static',
              oldExprs: {},
              expr: 'center',
            },
          },
        },
        {
          id: 'r_xc13H_aaGozZ2iAc9b7Q',
          name: 'Table',
          type: 'Table_5',
          props: {
            dataSource: {
              type: 'box',
              boxType: 'switch',
              case: 'BindingAttr',
              oldExprs: {},
              expr: {
                type: 'box',
                boxType: 'switch',
                case: 'js',
                oldExprs: {},
                expr: {
                  type: 'js',
                  code: "(() => {\n  let completedCount = 0\n  let incompletedCount = 0\n  for (const todo of ctx.root.data.todos) {\n    if (todo.completed) {\n      completedCount++\n    } else {\n      incompletedCount++\n    }\n  }\n  return [\n    {\n      status: 'Incompleted',\n      count: incompletedCount,\n    },\n    {\n      status: 'Completed',\n      count: completedCount,\n    },\n  ]\n})()",
                },
              },
            },
            columns: [
              {
                title: 'Status',
                dataIndex: 'status',
              },
              {
                title: 'Count',
                dataIndex: 'count',
              },
            ],
            rowKey: 'status',
          },
        },
      ],
    },
    i18n: {
      'en-US': {
        title: 'TODO LIST',
      },
      'zh-CN': {
        title: '待办列表',
      },
    },
  },
)

/**
 * 初始化 UIDL
 */
const initUidl = uidlLoader.load()

/**
 * 保存事件
 */
const onSave = uidlLoader.save.bind(uidlLoader)

/**
 * antd 待办演示页面
 */
const PageDemoAntdTodo: FC = memo(() => {
  return <AntdEditorRenderer uidl={initUidl} onSave={onSave} />
})

export default PageDemoAntdTodo
