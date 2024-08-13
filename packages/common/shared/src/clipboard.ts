import { isArray } from 'lodash-uni'
import { CLIPBOARD_CUSTOM_MINE_TYPE_JSON, MINE_TYPE_JSON } from './constants'

/**
 * 将 JSON 写入剪贴板
 * @param type 类型，用于读取校验
 * @param json JSON
 */
export async function writeJsonToClipboard<T = unknown>(
  type: string,
  json: T,
): Promise<void> {
  const blob = new Blob([JSON.stringify([type, json])], {
    type: MINE_TYPE_JSON,
  })
  const items = [new ClipboardItem({ [CLIPBOARD_CUSTOM_MINE_TYPE_JSON]: blob })]
  await navigator.clipboard.write(items)
}

/**
 * 从剪贴板读取 JSON
 * @param type 类型，用于读取校验
 */
export async function readJsonFromClipboard<T = unknown>(
  type: string,
): Promise<T | undefined> {
  const items = await navigator.clipboard.read()
  for (const item of items) {
    try {
      if (item.types.includes(CLIPBOARD_CUSTOM_MINE_TYPE_JSON)) {
        const blob = await item.getType(CLIPBOARD_CUSTOM_MINE_TYPE_JSON)
        const arr = JSON.parse(await blob.text())
        if (isArray(arr) && arr[0] === type) {
          return arr[1]
        }
      }
    } catch (err) {
      console.error('readJsonFromClipboard err', item, err)
    }
  }
}
