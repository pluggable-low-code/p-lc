import lcTypesJson from '@lc-types/antd/lc-types.json'
import type { InitOptionsOfEditor } from '@p-lc/editor'
import type { Pd } from '@p-lc/pd'
import { initAntdPreviewerRuntime } from './previewer'
import type { AntdEditor } from './types'

/**
 * P-LC 网站链接
 */
const P_LC_WEBSITE_URL = 'https://p-lc.github.io'

/**
 * antd 编辑器初始化选项
 */
export const antdEditorInitOptions: Partial<InitOptionsOfEditor<AntdEditor>> = {
  name: 'antd-editor',
  layout: {
    footer: {
      disable: true,
    },
  },
  pds: [lcTypesJson as unknown as Pd],
  initInlineRuntime: initAntdPreviewerRuntime,
  logo: {
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    iconLink: P_LC_WEBSITE_URL,
    title: 'Ant Design',
    titleLink: P_LC_WEBSITE_URL,
  },
}
