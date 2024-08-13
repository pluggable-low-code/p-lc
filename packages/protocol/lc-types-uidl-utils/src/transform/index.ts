import type { LcTypesUidl } from '@p-lc/lc-types-uidl'
import type { Cd, Pd } from '@p-lc/pd'

export * from './common'
export * from './implements-for'
export * from './implements-if'
export * from './implements-style'

/**
 * CD 转低代码类型 UIDL，基础部分，不含 implements 转换
 * @param cd CD
 * @param pd PD
 */
export function cdToLcTypesUidlBase(cd: Cd, pd: Pd): LcTypesUidl {
  const uidl: LcTypesUidl = {
    ...cd,
    i18n: pd.i18n,
  }
  return uidl
}

/**
 * 低代码类型 UIDL 转 CD
 * @param uidl 低代码类型 UIDL
 */
export function lcTypesUidlToCd(uidl: LcTypesUidl): Cd {
  const { i18n, ...restUidl } = uidl
  void i18n
  const cd = restUidl
  return cd
}

/**
 * 通过低代码类型 UIDL 编辑 PD
 * @param uidl 低代码类型 UIDL
 * @param pd PD
 * @param cdIndex 需要编辑的 CD 下标
 */
export function editPdByLcTypesUidl(
  uidl: LcTypesUidl,
  pd: Pd,
  cdIndex: number,
): void {
  const cd = lcTypesUidlToCd(uidl)
  pd.components[cdIndex] = cd
  pd.i18n = uidl.i18n
}
