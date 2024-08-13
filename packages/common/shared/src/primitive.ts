/**
 * 创建大整数
 * @param v BigInt 参数
 * @param defaultValue 默认值
 */
export function createBigInt(
  v: Parameters<typeof BigInt>[0],
  defaultValue: bigint,
): bigint {
  try {
    return BigInt(v)
  } catch (err) {
    void err
  }
  return defaultValue
}
