import { isObject } from 'lodash-uni'

/**
 * 可弱化的 Map
 */
export class WeakableMap<K, V> {
  /**
   * Map，用于非对象键值
   */
  private _map: Map<K, V> | null = null

  /**
   * WeakMap，用于对象键值
   */
  private _weakMap: WeakMap<WeakKey, V> | null = null

  /**
   * 获取
   * @param key 键值
   */
  public get(key: K): V | undefined {
    const m = (isObject(key) ? this._weakMap : this._map) as
      | (K extends WeakKey ? WeakMap<K, V> : Map<K, V>)
      | null
    return m?.get(key)
  }

  /**
   * 设置
   * @param key 键值
   * @param value 值
   */
  public set(key: K, value: V): V {
    const m = (
      isObject(key)
        ? this._weakMap || (this._weakMap = new WeakMap())
        : this._map || (this._map = new Map())
    ) as K extends WeakKey ? WeakMap<K, V> : Map<K, V>
    m.set(key, value)
    return value
  }
}

/**
 * 通过 Map 分组
 * @param items 条目
 * @param getKey 获取键值函数
 */
export function mapGroupBy<K, V>(
  items: V[],
  getKey: (item: V) => K,
): Map<K, V[]> {
  const m = new Map<K, V[]>()
  for (const item of items) {
    const key = getKey(item)
    let arr = m.get(key)
    if (!arr) {
      m.set(key, (arr = []))
    }
    arr.push(item)
  }
  return m
}
