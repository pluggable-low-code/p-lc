import type { ApiLoadLcTypes, ApiSaveLcTypes } from '../shared'

/**
 * 加载低代码类型
 */
export const loadLcTypes: ApiLoadLcTypes = async () => {
  return await (await fetch('/apis/load-lc-types')).json()
}

/**
 * 保存低代码类型
 */
export const saveLcTypes: ApiSaveLcTypes = async (pd) => {
  return await (
    await fetch('/apis/save-lc-types', {
      method: 'POST',
      headers: {
        ['Content-Type']: 'application/json',
      },
      body: JSON.stringify(pd),
    })
  ).json()
}
