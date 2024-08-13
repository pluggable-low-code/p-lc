<script setup lang="ts">
import type { DefaultElement } from '@p-lc/runtime'
import { STR_CHILDREN } from '@p-lc/shared'
import { isFunction, keys, mapValues, omit, pick } from 'lodash-uni'
import { computed } from 'vue'
import { isVueSlot } from '../runtime-plugin-expression-slot-vue'
import type { VueRendererProps } from '../runtime-plugin-vue-renderer-hocs'
import ControllerRenderer from './controller-renderer.vue'
import { useRenderers } from './renderer-vue-context'

const props = defineProps<VueRendererProps<DefaultElement>>()
const slots = defineSlots<{ default?: unknown }>()
const component = computed(() => props.__ctx__.component)
const ctxProps = computed(() => props.__ctx__.props)
const hasPropChildren = computed(() => STR_CHILDREN in ctxProps.value)
const namedSlotKeys = computed(() => {
  return keys(ctxProps.value).filter(
    (key) => key === STR_CHILDREN || isVueSlot(ctxProps.value[key]),
  )
})
const finalSlots = computed(() => {
  let ret = pick(ctxProps.value, namedSlotKeys.value)
  if (hasPropChildren.value) {
    ret.default = ret.children
    delete ret.children
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  ret = mapValues(ret, (value) => (isFunction(value) ? value : () => value))
  ret = {
    ...ret,
    ...slots,
  }
  return ret
})
const ctxPropsOmitSlots = computed(() =>
  omit(ctxProps.value, namedSlotKeys.value),
)
const children = computed(() => props.__ctx__.children)
const { ControllerRenderer: FinalControllerRenderer = ControllerRenderer } =
  useRenderers()
</script>

<template>
  <component :is="component" v-bind="{ ...ctxPropsOmitSlots, ...$attrs }">
    <template v-if="!hasPropChildren">
      <FinalControllerRenderer
        v-for="child of children"
        :key="child.key"
        :__ctx__="child"
      />
    </template>
    <template v-for="(value, key) in finalSlots" #[key]>
      <component :is="value" />
    </template>
  </component>
</template>
