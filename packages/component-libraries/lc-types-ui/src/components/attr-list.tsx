import type { DragEndEvent } from '@dnd-kit/core'
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { LcTypesValueOnChange } from '@p-lc/lc-types-uidl-utils'
import type { ReactSlotRenderFn } from '@p-lc/react-component-library-shared'
import {
  CLASS_NAME_LC_POPUP,
  useGetInnerPopupContainer,
} from '@p-lc/react-component-library-shared'
import type { StyleProps } from '@p-lc/react-shared'
import {
  IconBtn,
  TypographyText,
  useLatestFn,
  useSwitchableRefs,
  withStylePropsMf,
} from '@p-lc/react-shared'
import { addCssClass } from '@p-lc/shared'
import type { UidlExpressionArray, UidlExpressionObject } from '@p-lc/uidl'
import { isI18nExpression } from '@p-lc/uidl-ext-i18n'
import {
  EXPRESSION_TYPE_ARRAY,
  EXPRESSION_TYPE_OBJECT,
  getStaticExpressionValue,
  isObjectExpression,
  toArrayExpression,
  toObjectExpression,
} from '@p-lc/uidl-utils'
import { Tooltip } from 'antd'
import { EditPencil, MinusCircle, PlusCircle, Xmark } from 'iconoir-react'
import {
  isFunction,
  isNumber,
  isString,
  isUndefined,
  uniqueId,
} from 'lodash-uni'
import type { CSSProperties, FC, ReactNode, RefAttributes } from 'react'
import { forwardRef, memo, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { useI18nText } from '../i18n/context'
import { I18N_KEY_ADD, I18N_KEY_DELETE, I18N_KEY_EDIT } from '../i18n/keys'
import type { AttrWrapperPropsBase } from '../shared'
import { AttrWrapper, splitAttrWrapperPropsBase } from '../shared'

/**
 * 属性（Attribute）列表属性
 */
export interface AttrListProps
  extends StyleProps,
    AttrWrapperPropsBase,
    LcTypesValueOnChange,
    RefAttributes<HTMLDivElement> {
  /**
   * 渲染函数
   */
  render?: ReactSlotRenderFn
}

/**
 * 条目键值 Map
 */
const itemKeyMap = new WeakMap<object, string>()

/**
 * 确保条目键值
 * @param item 条目
 */
function ensureItemKey(item: object): string {
  let key = itemKeyMap.get(item)
  if (isUndefined(key)) {
    setItemKey(item, (key = uniqueId('#')))
  }
  return key
}

/**
 * 设置条目键值
 * @param item 条目
 * @param key 键值
 */
function setItemKey(item: object, key: string): void {
  itemKeyMap.set(item, key)
}

/**
 * 属性列表
 */
export const AttrList = withStylePropsMf<AttrListProps, HTMLDivElement>(
  (props, ref) => {
    const [baseProps, { render, value, onChange }] =
      splitAttrWrapperPropsBase(props)
    const expr: UidlExpressionArray | undefined = useMemo(() => {
      return toArrayExpression(value)
    }, [value])
    const itemExprs: UidlExpressionObject[] = useMemo(() => {
      return expr
        ? expr.value.map(toObjectExpression).filter(isObjectExpression)
        : []
    }, [expr])
    const itemKeys: string[] = useMemo(
      () => itemExprs.map(ensureItemKey),
      [itemExprs],
    )
    const itemLabels: (string | number)[] = useMemo(() => {
      return itemExprs.map((itemExpr, index) => {
        const { value: itemExprValue } = itemExpr
        for (const key in itemExprValue) {
          const vExpr = itemExprValue[key]
          const v = getStaticExpressionValue(vExpr)
          if (isNumber(v)) {
            return v
          }
          if (isString(v)) {
            return v.slice(0, 100)
          }
          if (isI18nExpression(vExpr)) {
            return vExpr.key
          }
        }
        return itemKeys[index]
      })
    }, [itemExprs, itemKeys])
    const hanldeAddBtnClick = useLatestFn(() => {
      const v = [
        ...itemExprs,
        {
          type: EXPRESSION_TYPE_OBJECT,
          value: {},
        },
      ]
      onChange?.({
        type: EXPRESSION_TYPE_ARRAY,
        value: v,
      })
    })
    const [open, setOpen] = useState(false)
    const [editingIndex, setEditingIndex] = useState(-1)
    const editingExpr = itemExprs[editingIndex] as
      | UidlExpressionObject
      | undefined
    const handleItemEdit = useLatestFn((index: number) => {
      if (!render) return
      setEditingIndex(index)
      setOpen(true)
    })
    const handleItemDelete = useLatestFn((index: number) => {
      const v = [...itemExprs]
      v.splice(index, 1)
      onChange?.({
        type: EXPRESSION_TYPE_ARRAY,
        value: v,
      })
    })
    const handleDetailClose = useLatestFn(() => setOpen(false))
    const [handleWrapperRef, hanldeDetailRef] = useSwitchableRefs(ref, open)
    const textAdd = useI18nText(I18N_KEY_ADD)
    const sensors = useSensors(
      useSensor(PointerSensor, {
        activationConstraint: { distance: 10 },
      }),
    )
    const handleDragEnd = useLatestFn(({ active, over }: DragEndEvent) => {
      if (over && active.id !== over.id) {
        const fromKey = active.id
        const toKey = over.id
        const fromIndex = itemKeys.findIndex((itemKey) => itemKey === fromKey)
        const toIndex = itemKeys.findIndex((itemKey) => itemKey === toKey)
        onChange?.({
          type: EXPRESSION_TYPE_ARRAY,
          value: arrayMove(itemExprs, fromIndex, toIndex),
        })
      }
    })
    return (
      <AttrWrapper
        {...baseProps}
        className="lc-attr-list"
        ref={handleWrapperRef}
      >
        <InternalAttrListContainer>
          <DndContext
            sensors={sensors}
            onDragEnd={handleDragEnd}
            collisionDetection={closestCenter}
          >
            <SortableContext
              items={itemKeys}
              strategy={verticalListSortingStrategy}
            >
              {itemExprs.map((...[, index]) => {
                const itemKey = itemKeys[index]
                return (
                  <AttrListItem
                    key={itemKey}
                    itemKey={itemKey}
                    index={index}
                    label={itemLabels[index]}
                    onEdit={handleItemEdit}
                    onDelete={handleItemDelete}
                  />
                )
              })}
            </SortableContext>
          </DndContext>
          <div className="lc-item lc-add-wrapper">
            <Tooltip title={textAdd} mouseEnterDelay={1} placement="left">
              <IconBtn onClick={hanldeAddBtnClick}>
                <PlusCircle />
              </IconBtn>
            </Tooltip>
          </div>
          {open && editingExpr && isFunction(render) && (
            <AttrListDetail
              expr={editingExpr}
              index={editingIndex}
              render={render}
              onClose={handleDetailClose}
              ref={hanldeDetailRef}
            />
          )}
        </InternalAttrListContainer>
      </AttrWrapper>
    )
  },
)

/**
 * 内部：属性列表容器
 */
const InternalAttrListContainer = styled.div`
  width: 100%;

  .lc-item {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
    height: 24px;

    .lc-label {
      width: 0;
      flex: auto;
    }

    .lc-icon-btn {
      margin-left: 6px;
    }

    &.lc-add-wrapper {
      flex-direction: row-reverse;
      margin-bottom: 0;
    }
  }
`

/**
 * 属性（Attribute）列表条目属性
 */
interface AttrListItemProps {
  /**
   * 条目键值
   */
  itemKey: string
  /**
   * 下标
   */
  index: number
  /**
   * 标签
   */
  label: ReactNode
  /**
   * 编辑事件
   * @param index 回传下标
   */
  onEdit(index: number): void
  /**
   * 删除事件
   * @param index 回传下标
   */
  onDelete(index: number): void
}

/**
 * 属性列表条目
 */
const AttrListItem: FC<AttrListItemProps> = memo(
  ({ itemKey, index, label, onEdit, onDelete }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({
        id: itemKey,
      })

    const style: CSSProperties = useMemo(
      () => ({
        transform: CSS.Translate.toString(transform),
        transition,
        cursor: 'move',
      }),
      [transform, transition],
    )
    const handleEditBtnClick = useLatestFn(() => onEdit(index))
    const handleDeleteBtnClick = useLatestFn(() => onDelete(index))
    const textDelete = useI18nText(I18N_KEY_DELETE)
    const textEdit = useI18nText(I18N_KEY_EDIT)
    return (
      <div
        className="lc-item"
        {...attributes}
        {...listeners}
        style={style}
        ref={setNodeRef}
      >
        <TypographyText className="lc-label" ellipsis>
          {label}
        </TypographyText>
        <Tooltip title={textEdit} mouseEnterDelay={1} placement="left">
          <IconBtn onClick={handleEditBtnClick}>
            <EditPencil />
          </IconBtn>
        </Tooltip>
        <Tooltip title={textDelete} mouseEnterDelay={1} placement="left">
          <IconBtn onClick={handleDeleteBtnClick}>
            <MinusCircle />
          </IconBtn>
        </Tooltip>
      </div>
    )
  },
)

/**
 * 属性列表详情属性
 */
interface AttrListDetailProps {
  /**
   * 表达式
   */
  expr: UidlExpressionObject
  /**
   * 下标
   */
  index: number
  /**
   * 渲染函数
   */
  render: ReactSlotRenderFn
  /**
   * 关闭事件
   */
  onClose(): void
}

/**
 * 属性列表详情
 */
const AttrListDetail = memo(
  forwardRef<HTMLDivElement, AttrListDetailProps>(
    ({ index, render, onClose }, ref) => {
      const [elHost, setElHost] = useState<HTMLDivElement>()
      const elInnerPopupContainer = useGetInnerPopupContainer()()
      useEffect(() => {
        const el = document.createElement('div')
        addCssClass(el, CLASS_NAME_LC_POPUP)
        elInnerPopupContainer.appendChild(el)
        setElHost(el)
        return (): void => {
          elInnerPopupContainer.removeChild(el)
        }
      }, [elInnerPopupContainer])
      if (!elHost) return null
      return createPortal(
        <InternalAttrListDetailContainer
          className="lc-attr-list-detail"
          ref={ref}
        >
          <IconBtn className="lc-close-btn" onClick={onClose}>
            <Xmark />
          </IconBtn>
          <div className="lc-content">
            {render({
              item: {
                logicPath: [index],
              },
              index,
            })}
          </div>
        </InternalAttrListDetailContainer>,
        elHost,
      )
    },
  ),
)

/**
 * 内部：属性列表详情容器
 */
const InternalAttrListDetailContainer = styled.div`
  position: absolute;
  inset: 0;
  background: #fff;

  > .lc-close-btn {
    position: absolute;
    top: 8px;
    right: 8px;
  }

  > .lc-content {
    padding-top: 34px;
    height: 100%;
    overflow: auto;
  }
`
