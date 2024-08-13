/**
 * 集合里的首个值
 * @param s 集合
 */
export function firstValueOfSet<T>(s: Set<T>): T | undefined {
  for (const v of s) {
    return v
  }
}
