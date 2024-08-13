import type { UnknownObject } from '@mobo-ts/shared'
import { fromPairs } from 'lodash-uni'
import { jsonParse, jsonStringify } from './es'
import type { Promisable } from './types/promise'

/**
 * 数据加载器
 */
export interface DataLoader<T, LoadOptions = void, SaveOptions = void> {
  /**
   * 加载
   * @param options 选项
   */
  load(options: LoadOptions): Promisable<T>
  /**
   * 保存
   * @param data 数据
   * @param options 选项
   */
  save(data: T, options: SaveOptions): Promisable<void>
}

/**
 * localStorage 数据加载器
 */
export class LocalStorageDataLoader<T> implements DataLoader<T, void, void> {
  /**
   * localStorage 数据加载器
   * @param _key 键值
   * @param _defaultData 默认数据
   */
  public constructor(
    private _key: string,
    private _defaultData: T,
  ) {}

  /**
   * 加载
   */
  public load(): T {
    const key = this._key
    const str = localStorage.getItem(key)
    if (str) {
      try {
        return jsonParse(str)[0]
      } catch (err) {
        console.error('LocalStorageDataLoader::load parse err', err, {
          key,
          str,
        })
      }
    }
    return this._defaultData
  }

  /**
   * 保存
   * @param data 数据
   */
  public save(data: T): void {
    localStorage.setItem(this._key, jsonStringify([data]))
  }
}

/**
 * localStorage 多键值数据加载器
 */
export class LocalStorageMultiKeysataLoader<T>
  implements DataLoader<T, string | void, string | void>
{
  /**
   * localStorage 数据加载器
   * @param _keys 键值
   * @param _splitByKeys 通过键值拆分
   * @param _joinByKeys 通过键值合并
   */
  public constructor(
    private _keys: string[],
    private _splitByKeys: Record<string, (data: T) => unknown>,
    private _joinByKeys: (splitedData: UnknownObject) => T,
  ) {}

  /**
   * 加载
   */
  public load(): T {
    const splitedData = fromPairs(
      this._keys.map((key) => {
        let d: unknown
        const str = localStorage.getItem(key)
        if (str) {
          try {
            d = jsonParse(str)[0]
          } catch (err) {
            console.error(
              'LocalStorageMultiKeysataLoader::load parse err',
              err,
              {
                key,
                str,
              },
            )
          }
        }
        return [key, d]
      }),
    ) as UnknownObject
    return this._joinByKeys(splitedData)
  }

  /**
   * 保存
   * @param data 数据
   */
  public save(data: T): void {
    for (const key of this._keys) {
      localStorage.setItem(key, jsonStringify([this._splitByKeys[key](data)]))
    }
  }
}
