import type { Pd } from '@p-lc/pd'
import { jsonStringifyTwoSpaces, type AnyObject } from '@p-lc/shared'
import type { FastifyInstance } from 'fastify'
import fs from 'fs'
import { isObject } from 'lodash-uni'
import path from 'path'
import type { ApiResLoadLcTypes, ApiResSaveLcTypes } from '../shared'

/**
 * Current working directory
 */
const cwd = process.cwd()
console.log(`cwd: ${cwd}`)

/**
 * package.json 路径
 */
const PACKAGE_JSON_PATH = path.join(cwd, 'package.json')

if (!fs.existsSync(PACKAGE_JSON_PATH)) {
  console.log(`The package.json file does not exists. ${PACKAGE_JSON_PATH}`)
  process.exit(-1)
}

/**
 * 低代码类型字段
 */
const FIELD_LC_TYPES = 'lc-types'

/**
 * 默认的低代码类型相对路径
 */
const DEFAULT_LC_TYPES_RELATIVE_PATH = 'lc-types.json'

/**
 * 路由：接口
 */
export async function routeApis(fastify: FastifyInstance): Promise<void> {
  fastify.get('/load-lc-types', async (req, res) => {
    void req
    res.type('application/json').code(200)
    const packageJson = await getPackageJson()
    const defaultRet = {
      code: 0,
      data: createDefaultPd(packageJson),
    } satisfies ApiResLoadLcTypes
    const lcTypesPath = getLcTypesPath(packageJson)
    if (!lcTypesPath) return defaultRet
    const lcTypesJson: Pd = await readJson(lcTypesPath)
    return {
      code: 0,
      data: lcTypesJson,
    } satisfies ApiResLoadLcTypes
  })
  fastify.post('/save-lc-types', async (req, res) => {
    res.type('application/json').code(200)
    const pd = req.body as Pd
    const packageJson = await getPackageJson()
    if (!packageJson) return { code: -1 }
    fillPdByPackageJson(pd, packageJson)
    let lcTypesPath = getLcTypesPath(packageJson)
    if (!lcTypesPath) {
      writeJson(PACKAGE_JSON_PATH, {
        ...packageJson,
        [FIELD_LC_TYPES]: DEFAULT_LC_TYPES_RELATIVE_PATH,
      })
      lcTypesPath = path.join(
        PACKAGE_JSON_PATH,
        '..',
        DEFAULT_LC_TYPES_RELATIVE_PATH,
      )
    }
    await writeJson(lcTypesPath, pd)
    return {
      code: 0,
    } satisfies ApiResSaveLcTypes
  })
}

/**
 * 获取 package.json 内容
 */
async function getPackageJson(): Promise<AnyObject | undefined> {
  if (!fs.existsSync(PACKAGE_JSON_PATH)) return
  const json = await readJson(PACKAGE_JSON_PATH)
  if (isObject(json)) return json
}

/**
 * 读 JSON （文件）
 * @param p 路径
 */
async function readJson<T = unknown>(p: string): Promise<T> {
  const str = await fs.promises.readFile(p, 'utf-8')
  return JSON.parse(str)
}

/**
 * 写 JSON （文件）
 * @param p 路径
 * @param json JSON
 */
async function writeJson<T = unknown>(p: string, json: T): Promise<void> {
  await fs.promises.writeFile(p, jsonStringifyTwoSpaces(json) + '\n')
}

/**
 * 创建默认的 PD
 * @param packageJson package.json 内容
 */
function createDefaultPd(packageJson: AnyObject | undefined): Pd {
  return fillPdByPackageJson(
    {
      pkgName: '',
      pkgVersion: '',
      name: 'Package display name',
      components: [],
    },
    packageJson,
  )
}

/**
 * 通过 package.json 填充 PD
 * @param pd PD
 * @param packageJson package.json 内容
 */
function fillPdByPackageJson(pd: Pd, packageJson: AnyObject | undefined): Pd {
  return {
    ...pd,
    pkgName: packageJson?.name,
    pkgVersion: packageJson?.version,
  }
}

/**
 * 获取低代码类型路径
 * @param packageJson package.json 内容
 */
function getLcTypesPath(
  packageJson: AnyObject | undefined,
): string | undefined {
  if (!packageJson) return
  const lcTypesRelativePath = packageJson[FIELD_LC_TYPES]
  if (!lcTypesRelativePath) return
  return path.join(PACKAGE_JSON_PATH, '..', lcTypesRelativePath)
}
