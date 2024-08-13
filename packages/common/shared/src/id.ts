// export const urlAlphabet =
//   'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'

import { customAlphabet, urlAlphabet } from 'nanoid'

/**
 * 变量 ID 字母表，可以用做 JS 变量
 */
export const varIdAlphabet = urlAlphabet.replace('-', '$')

/**
 * 创建随机变量 ID，用做变量时，注意加前缀避免数字开头
 */
export const createRandomVarId = customAlphabet(varIdAlphabet)
