import { LcTypesEditorRenderer } from '@p-lc/lc-types-suite'
import lcTypesJson from '@p-lc/lc-types-ui/lc-types.json'
import type { Pd } from '@p-lc/pd'
import { LocalStorageDataLoader } from '@p-lc/shared'
import { memo, type FC } from 'react'

/**
 * PD 加载器
 */
const pdLoader = new LocalStorageDataLoader<Pd>(
  'demo:lc-types:pd',
  lcTypesJson as unknown as Pd,
)

/**
 * 初始化 PD
 */
const initPd = pdLoader.load()

/**
 * 保存事件
 */
const onSavePd = pdLoader.save.bind(pdLoader)

/**
 * 低代码类型演示页面
 */
const PageDemoLcTypes: FC = memo(() => {
  return <LcTypesEditorRenderer pd={initPd} onSavePd={onSavePd} />
})

export default PageDemoLcTypes
