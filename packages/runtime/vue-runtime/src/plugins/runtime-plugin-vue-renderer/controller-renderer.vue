<script setup lang="ts">
import type { DefaultController } from '@p-lc/runtime'
import type { VueRendererProps } from '../runtime-plugin-vue-renderer-hocs'
import ElementRenderer from './element-renderer.vue'
import { useRenderers } from './renderer-vue-context'

const props = defineProps<VueRendererProps<DefaultController>>()
const { ElementRenderer: FinalElementRenderer = ElementRenderer } =
  useRenderers()
</script>

<template>
  <FinalElementRenderer
    v-for="child of props.__ctx__.children"
    v-bind="props.__ctx__.children.length === 1 ? $attrs : {}"
    :key="child.key"
    :__ctx__="child"
  />
</template>
