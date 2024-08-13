import { toLower } from 'lodash-uni'
import { uaLanguages } from './ua'

/**
 * 通过用户代理获取语言
 * @param candidates 候选语言
 */
export function getLanguageByUa(candidates: string[]): string {
  const m = new Map(candidates.map((c) => [toLower(c), c]))
  for (const lng of uaLanguages) {
    const c = m.get(toLower(lng))
    if (c) return c
  }
  return candidates[0]
}
