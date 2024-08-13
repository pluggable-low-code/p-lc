<script setup lang="ts">
import { provide } from 'vue'

const props = defineProps<{
  /**
   * 上下文键值
   */
  ctxKey: string | symbol
  /**
   * 上下文值
   */
  value: unknown
}>()
provide(props.ctxKey, props.value)
</script>

<template>
  <slot />
</template>
