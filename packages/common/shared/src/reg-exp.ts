/**
 * 通过正则表达式过滤字符串
 * @param strings 字符串
 * @param regExp 正则表达式
 */
export function filterStringsByRegExp(
  strings: string[],
  regExp: string,
): string[] {
  if (!regExp) return strings
  const exp = new RegExp(regExp, 'i')
  return strings.filter((str) => exp.test(str))
}
