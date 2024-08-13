import type { RuntimePlugin } from '@p-lc/runtime'

/**
 * 运行时预览器视图副作用插件属性扩展
 */
export interface RuntimePluginPreviewerViewEffectPropertiesExt {
  runtime: {
    /**
     * 编辑器调用
     */
    editorCall: ViewEffectEditorApis
  }
}

/**
 * 视图副作用编辑器接口
 */
export interface ViewEffectEditorApis {
  /**
   * 视图副作用事件，当视图挂载、更新时触发
   */
  onViewEffect(): void
}

/**
 * 运行时预览器视图副作用插件
 */
export const runtimePluginPreviewerViewEffect: RuntimePlugin<RuntimePluginPreviewerViewEffectPropertiesExt> =
  {
    id: 'previewer-ve',
  }
