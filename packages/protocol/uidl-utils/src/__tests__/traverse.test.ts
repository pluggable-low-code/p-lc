import { get } from 'lodash-uni'
import { expect, test } from 'vitest'
import { defaultEditorUidlUtilsConfig } from '../config'
import { defaultUidlUtilsConfig } from '../config/uidl-utils-config'
import {
  bfsChildElementsInElement,
  dfsEntity,
  dfsExpressionInExpression,
} from '../traverse'

test('dfsEntity', () => {
  const uidl = {
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
      ],
    },
  }
  expect([...dfsEntity(defaultUidlUtilsConfig, uidl)]).toEqual([
    {
      type: 'element',
      element: uidl.view,
      jsonPath: ['view'],
      logicPath: ['view'],
      traverseTime: 'enter',
      fullJsonPath: ['view'],
      fullLogicPath: ['view'],
      elementIdPath: ['v1'],
      elementId: 'v1',
      parentElementId: null,
    },
    {
      type: 'element',
      element: uidl.view.children[0],
      jsonPath: ['children', 0],
      logicPath: ['props', 'children', 0],
      traverseTime: 'enter',
      fullJsonPath: ['view', 'children', 0],
      fullLogicPath: ['view', 'props', 'children', 0],
      elementIdPath: ['v1', 'v2'],
      elementId: 'v2',
      parentElementId: 'v1',
    },
    {
      type: 'expression',
      expression: '1234234',
      jsonPath: ['props', 'children'],
      logicPath: ['props', 'children'],
      traverseTime: 'enter',
      fullJsonPath: ['view', 'children', 0, 'props', 'children'],
      fullLogicPath: ['view', 'props', 'children', 0, 'props', 'children'],
      elementIdPath: ['v1', 'v2'],
      elementId: 'v2',
      parentElementId: 'v1',
    },
    {
      type: 'element',
      element: uidl.view.children[1],
      jsonPath: ['children', 1],
      logicPath: ['props', 'children', 1],
      traverseTime: 'enter',
      fullJsonPath: ['view', 'children', 1],
      fullLogicPath: ['view', 'props', 'children', 1],
      elementIdPath: ['v1', 'v3'],
      elementId: 'v3',
      parentElementId: 'v1',
    },
    {
      type: 'element',
      element: get(uidl, 'view.children[1].children[0]'),
      jsonPath: ['children', 0],
      logicPath: ['props', 'children', 0],
      traverseTime: 'enter',
      fullJsonPath: ['view', 'children', 1, 'children', 0],
      fullLogicPath: ['view', 'props', 'children', 1, 'props', 'children', 0],
      elementIdPath: ['v1', 'v3', 't1'],
      elementId: 't1',
      parentElementId: 'v3',
    },
    {
      type: 'expression',
      expression: 'abc',
      jsonPath: ['props', 'children'],
      logicPath: ['props', 'children'],
      traverseTime: 'enter',
      fullJsonPath: ['view', 'children', 1, 'children', 0, 'props', 'children'],
      fullLogicPath: [
        'view',
        'props',
        'children',
        1,
        'props',
        'children',
        0,
        'props',
        'children',
      ],
      elementIdPath: ['v1', 'v3', 't1'],
      elementId: 't1',
      parentElementId: 'v3',
    },
    {
      type: 'expression',
      expression: {
        type: 'static',
        value: {
          color: 'red',
        },
      },
      jsonPath: ['props', 'style'],
      logicPath: ['props', 'style'],
      traverseTime: 'enter',
      fullJsonPath: ['view', 'children', 1, 'children', 0, 'props', 'style'],
      fullLogicPath: [
        'view',
        'props',
        'children',
        1,
        'props',
        'children',
        0,
        'props',
        'style',
      ],
      elementIdPath: ['v1', 'v3', 't1'],
      elementId: 't1',
      parentElementId: 'v3',
    },
    {
      type: 'element',
      element: get(uidl, 'view.children[1].children[1]'),
      jsonPath: ['children', 1],
      logicPath: ['props', 'children', 1],
      traverseTime: 'enter',
      fullJsonPath: ['view', 'children', 1, 'children', 1],
      fullLogicPath: ['view', 'props', 'children', 1, 'props', 'children', 1],
      elementIdPath: ['v1', 'v3', 't2'],
      elementId: 't2',
      parentElementId: 'v3',
    },
    {
      type: 'expression',
      expression: 'efg',
      jsonPath: ['props', 'children'],
      logicPath: ['props', 'children'],
      traverseTime: 'enter',
      fullJsonPath: ['view', 'children', 1, 'children', 1, 'props', 'children'],
      fullLogicPath: [
        'view',
        'props',
        'children',
        1,
        'props',
        'children',
        1,
        'props',
        'children',
      ],
      elementIdPath: ['v1', 'v3', 't2'],
      elementId: 't2',
      parentElementId: 'v3',
    },
    {
      type: 'expression',
      expression: {
        type: 'static',
        value: {
          color: 'green',
        },
      },
      jsonPath: ['props', 'style'],
      logicPath: ['props', 'style'],
      traverseTime: 'enter',
      fullJsonPath: ['view', 'children', 1, 'children', 1, 'props', 'style'],
      fullLogicPath: [
        'view',
        'props',
        'children',
        1,
        'props',
        'children',
        1,
        'props',
        'style',
      ],
      elementIdPath: ['v1', 'v3', 't2'],
      elementId: 't2',
      parentElementId: 'v3',
    },
  ])
})

test('bfsPureChildElementsInElement', () => {
  const element = {
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
    ],
  }
  expect([
    ...bfsChildElementsInElement(defaultUidlUtilsConfig, element),
  ]).toEqual([
    {
      type: 'element',
      element: element.children[0],
      jsonPath: ['children', 0],
      logicPath: ['props', 'children', 0],
      traverseTime: 'enter',
      fullJsonPath: ['children', 0],
      fullLogicPath: ['props', 'children', 0],
      elementIdPath: ['v1', 'v2'],
      elementId: 'v2',
      parentElementId: 'v1',
    },
    {
      type: 'element',
      element: element.children[1],
      jsonPath: ['children', 1],
      logicPath: ['props', 'children', 1],
      traverseTime: 'enter',
      fullJsonPath: ['children', 1],
      fullLogicPath: ['props', 'children', 1],
      elementIdPath: ['v1', 'v3'],
      elementId: 'v3',
      parentElementId: 'v1',
    },
  ])
})

test('dfsExpressionInExpression', () => {
  const expression = {
    type: 'box',
    expr: {
      type: 'i18n',
      key: 'stringAttrName',
    },
    boxType: 'bind',
    bindType: 'i18n',
  }
  expect([
    ...dfsExpressionInExpression(defaultEditorUidlUtilsConfig, expression),
  ]).toEqual([
    {
      elementId: null,
      elementIdPath: [],
      expression: {
        bindType: 'i18n',
        boxType: 'bind',
        expr: {
          key: 'stringAttrName',
          type: 'i18n',
        },
        type: 'box',
      },
      fullJsonPath: [],
      fullLogicPath: [],
      jsonPath: [],
      logicPath: [],
      parentElementId: null,
      traverseTime: 'enter',
      type: 'expression',
    },
    {
      elementId: null,
      elementIdPath: [],
      expression: {
        key: 'stringAttrName',
        type: 'i18n',
      },
      fullJsonPath: ['expr'],
      fullLogicPath: [],
      jsonPath: ['expr'],
      logicPath: [],
      parentElementId: null,
      traverseTime: 'enter',
      type: 'expression',
    },
  ])
})
