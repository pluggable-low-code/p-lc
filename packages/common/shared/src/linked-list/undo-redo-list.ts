import type { DoubleLinkedNode, LiteralObject } from '@mobo-ts/shared'
import { createDoubleLinkedNode } from '@mobo-ts/shared'
import type { Draft, Patch } from 'immer'
import { enablePatches, produceWithPatches } from 'immer'
import { isNull, noop } from 'lodash-uni'
import { mergePatchs } from '../immer'

/**
 * 撤销重做列表
 */
export class UndoRedoList<T extends LiteralObject> {
  /**
   * 最大大小
   */
  private _maxSize: number

  /**
   * 内容变化时的回调
   */
  private _onChange: UndoRedoListOnChange<T>

  /**
   * 当前（节点）
   */
  private _current: DoubleLinkedNode<UndoRedoListNodeValue<T>>

  /**
   * 头部（节点）
   */
  private _head: DoubleLinkedNode<UndoRedoListNodeValue<T>>

  /**
   * 撤销大小
   */
  private _undoSize = 0

  /**
   * 重做大小
   */
  private _redoSize = 0

  /**
   * 草稿
   */
  private _draft: Draft<T> | null = null

  /**
   * 上一个配方 ID
   */
  private _lastRecipeId: string | number | null = null

  /**
   * 草稿
   */
  public get draft(): Draft<T> | null {
    return this._draft
  }

  /**
   * 当前状态
   */
  public get currentState(): T {
    return this._current.value.state
  }

  /**
   * 是可撤销的
   */
  public get isUndoable(): boolean {
    return !!this._undoSize
  }

  /**
   * 是可重做的
   */
  public get isRedoable(): boolean {
    return !!this._redoSize
  }

  /**
   * 大小
   */
  public get size(): number {
    return this._undoSize + this._redoSize + 1
  }

  public constructor({
    initState,
    maxSize = 256,
    onChange = noop,
  }: UndoRedoListConstructorOptions<T>) {
    enablePatches()
    this._current = this._head = createDoubleLinkedNode({
      state: initState,
      patches: [],
      inversePatches: [],
    })
    this._maxSize = Math.max(8, maxSize)
    this._onChange = onChange
  }

  /**
   * 撤销
   */
  public undo(): void {
    const cur = this._current
    const prev = cur.prev
    if (!prev) {
      return
    }
    const inversePatches = cur.value.inversePatches
    this._current = prev
    this._undoSize--
    this._redoSize++
    this._onChange(
      UNDO_REDO_LIST_CHANGE_TYPE_UNDO,
      this.currentState,
      inversePatches,
    )
    this._lastRecipeId = null
  }

  /**
   * 重做
   */
  public redo(): void {
    let cur = this._current
    const next = cur.next
    if (!next) {
      return
    }
    this._current = cur = next
    this._undoSize++
    this._redoSize--
    this._onChange(
      UNDO_REDO_LIST_CHANGE_TYPE_REDO,
      this.currentState,
      cur.value.patches,
    )
    this._lastRecipeId = null
  }

  /**
   * 产生新的状态，支持嵌套调用，但 recipeId 和 recipe 的返回值只在最外层有效
   * @param recipe 配方函数
   * @param recipeId 配方 ID
   */
  public produce(
    recipe: UndoRedoListRecipe<T>,
    recipeId: string | number | null = null,
  ): void {
    const draft = this._draft
    if (!draft) {
      try {
        const currentState = this.currentState
        const [newState, patches, inversePatches] = produceWithPatches(
          currentState,
          (d) => recipe((this._draft = d)),
        )
        if (newState !== currentState) {
          this._update(
            newState,
            patches,
            inversePatches,
            !isNull(recipeId) && recipeId === this._lastRecipeId,
          )
        }
        this._lastRecipeId = recipeId
      } finally {
        this._draft = null
      }
    } else {
      recipe(draft)
    }
  }

  /**
   * 更新（新状态）
   * @param newState 新的状态
   * @param patches 补丁
   * @param inversePatches 逆补丁
   * @param inPlace 原地压入
   */
  private _update(
    newState: T,
    patches: Patch[],
    inversePatches: Patch[],
    inPlace: boolean,
  ): void {
    let cur = this._current
    if (inPlace) {
      const v = cur.value
      cur.value = {
        state: newState,
        patches: mergePatchs(v.patches, patches),
        inversePatches: mergePatchs(inversePatches, v.inversePatches),
      }
    } else {
      this._current = cur = createDoubleLinkedNode(
        {
          state: newState,
          patches,
          inversePatches,
        },
        cur,
      )
      this._undoSize++
      this._redoSize = 0
      this._clip()
    }
    this._onChange(
      inPlace
        ? UNDO_REDO_LIST_CHANGE_TYPE_IN_PLACE_UPDATE
        : UNDO_REDO_LIST_CHANGE_TYPE_UPDATE,
      newState,
      patches,
    )
  }

  /**
   * 修剪
   */
  private _clip(): void {
    while (this.size > this._maxSize) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this._head = this._head.next!
      this._head.prev = null
      this._undoSize--
    }
  }
}

/**
 * 撤销重做列表构造函数选项
 */
export interface UndoRedoListConstructorOptions<T> {
  /**
   * 初始状态
   */
  initState: T
  /**
   * 最大大小，最小 8，默认值：256
   */
  maxSize?: number
  /**
   * 变化回调
   */
  onChange?: UndoRedoListOnChange<T>
}

/**
 * 变化回调
 */
export type UndoRedoListOnChange<T> = (
  type: UndoRedoListChangeType,
  state: T,
  patches: Patch[],
) => void

/**
 * 变化类型
 */
export type UndoRedoListChangeType =
  | typeof UNDO_REDO_LIST_CHANGE_TYPE_UPDATE
  | typeof UNDO_REDO_LIST_CHANGE_TYPE_IN_PLACE_UPDATE
  | typeof UNDO_REDO_LIST_CHANGE_TYPE_UNDO
  | typeof UNDO_REDO_LIST_CHANGE_TYPE_REDO

/**
 * 变化类型：更新
 */
export const UNDO_REDO_LIST_CHANGE_TYPE_UPDATE = 'update'

/**
 * 变化类型：原地更新
 */
export const UNDO_REDO_LIST_CHANGE_TYPE_IN_PLACE_UPDATE = 'in-place-update'

/**
 * 变化类型：撤销
 */
export const UNDO_REDO_LIST_CHANGE_TYPE_UNDO = 'undo'

/**
 * 变化类型：重做
 */
export const UNDO_REDO_LIST_CHANGE_TYPE_REDO = 'redo'

/**
 * 节点值
 */
export interface UndoRedoListNodeValue<T> {
  /**
   * 状态
   */
  state: T
  /**
   * 补丁
   */
  patches: Patch[]
  /**
   * 逆补丁
   */
  inversePatches: Patch[]
}

/**
 * 配方函数
 */
export type UndoRedoListRecipe<T> = (draft: Draft<T>) => Draft<T> | void
