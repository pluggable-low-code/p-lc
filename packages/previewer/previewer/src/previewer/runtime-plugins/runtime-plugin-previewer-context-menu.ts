import type { ContextMenuElement } from '@p-lc/editor'
import { CONTEXT_MENU_ENTITY_TYPE_ELEMENT } from '@p-lc/editor'
import type { RuntimePlugin } from '@p-lc/runtime'
import type { Point } from '@p-lc/shared'
import { createPointByEventClient } from '@p-lc/shared'
import { isNil } from 'lodash-uni'
import type { Promisable } from 'type-fest'
import { type runtimePluginElementDom } from './runtime-plugin-element-dom'

/**
 * 运行时预览器上下文菜单插件属性扩展
 */
export interface RuntimePluginPreviewerContextMenuPropertiesExt {
  runtime: {
    /**
     * 编辑器调用
     */
    editorCall: ContextMenuEditorApis
  }
}

/**
 * 上下文菜单编辑器接口
 */
export interface ContextMenuEditorApis {
  /**
   * 打卡上下文菜单
   * @param entity 实体
   * @param point 点
   */
  openContextMenu(entity: ContextMenuElement, point: Point): Promisable<boolean>
}

/**
 * 运行时预览器上下文菜单插件
 */
export const runtimePluginPreviewerContextMenu: RuntimePlugin<
  RuntimePluginPreviewerContextMenuPropertiesExt,
  typeof runtimePluginElementDom
> = {
  id: 'previewer-context-menu',
  initRuntime(ctx) {
    // window 可能会停止冒泡阻止点击
    document.addEventListener('contextmenu', handleDocContextMenu, true)
    return () =>
      document.removeEventListener('click', handleDocContextMenu, true)

    function handleDocContextMenu(ev: MouseEvent): void {
      const { editorCall } = ctx
      const elementId = ctx.getFirstElementInfoByChildNode(ev.target)?.[0]
      if (isNil(elementId)) return
      if (
        // preventDefault 不能异步，这里暂时不兼容异步
        editorCall.openContextMenu(
          {
            type: CONTEXT_MENU_ENTITY_TYPE_ELEMENT,
            elementId,
          },
          createPointByEventClient(ev),
        )
      ) {
        ev.preventDefault()
      }
    }
  },
}
