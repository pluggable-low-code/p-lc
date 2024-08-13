<script setup lang="ts">
import type { DefaultRuntime } from '@p-lc/runtime'
import type { VueRendererProps } from '../runtime-plugin-vue-renderer-hocs'
import ControllerRenderer from './controller-renderer.vue'
import { useRenderers } from './renderer-vue-context'

const props = defineProps<VueRendererProps<DefaultRuntime>>()
const { ControllerRenderer: FinalControllerRenderer = ControllerRenderer } =
  useRenderers()
</script>

<template>
  <FinalControllerRenderer
    :key="props.__ctx__.view.key"
    :__ctx__="props.__ctx__.view"
  />
</template>
