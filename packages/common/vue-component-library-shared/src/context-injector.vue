<script setup lang="ts">
import { inject } from 'vue'

const props = defineProps<{
  /**
   * 上下文键值
   */
  ctxKey: string | symbol
}>()
defineSlots<{
  default(slotProps: { value: unknown }): unknown
}>()
const value = inject(props.ctxKey)
</script>

<template>
  <slot :value="value" />
</template>
