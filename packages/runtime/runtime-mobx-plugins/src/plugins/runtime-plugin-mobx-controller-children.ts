import type { LoopOrigin, RuntimePlugin } from '@p-lc/runtime'
import {
  initControllerChildren,
  runtimePluginControllerChildren,
} from '@p-lc/runtime'
import { STR_CHILDREN, definePropertyByGetter } from '@p-lc/shared'
import { once } from 'lodash-uni'
import type { IReactionDisposer } from 'mobx'
import { observable, reaction, runInAction } from 'mobx'

/**
 * 运行时 MobX 控制器子（上下文）插件
 */
export const runtimePluginMobxControllerChildren: RuntimePlugin = {
  id: 'mobx-controller-children',
  position: {
    target: runtimePluginControllerChildren,
  },
  replace: [runtimePluginControllerChildren],
  initController(ctx) {
    const childrenBox = observable.box<undefined | typeof ctx.children>(
      undefined,
      { deep: false },
    )
    let disposer: IReactionDisposer | undefined
    const startReactionOnce = once(() => {
      runInAction(() => effect(expression()))
      // fireImmediately 并不一定立即执行，可能会命中批量逻辑
      disposer = reaction(expression, effect)

      function expression(): LoopOrigin | undefined {
        return ctx.childrenLoopOrigin
      }
      function effect(loopOrigin?: LoopOrigin): void {
        disposeChildren()
        const children = initControllerChildren(ctx, loopOrigin)
        childrenBox.set(children)
      }
    })
    definePropertyByGetter(ctx, STR_CHILDREN, () => {
      startReactionOnce()
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return childrenBox.get()!
    })
    return dispose

    function dispose(): void {
      disposer?.()
      disposeChildren()
    }
    function disposeChildren(): void {
      childrenBox.get()?.map((c) => c.dispose())
    }
  },
}
