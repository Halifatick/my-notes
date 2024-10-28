<script setup>
import { reactive } from 'vue'

defineOptions({
  inheritAttrs: false
});

defineProps({
  disabled: {
    type: Boolean,
    required: false,
    default: false
  },
  type: {
    type: String,
    required: false,
    default: 'primary'
  },
})

const types = reactive({
  'primary': 'btn-primary',
})

const typesButtonRounded = reactive({
  'close': 'btn-close',
  'plus': 'btn-plus',
})
</script>

<template>
  <button
      v-bind="$attrs"
      class="btn"
      :class="[types[type] || typesButtonRounded[type] || `btn-${type}`]"
      :disabled="disabled"
  >
    <slot>
      {{ !typesButtonRounded[type] ? 'Button' : '' }}
    </slot>
  </button>
</template>

<style scoped>

</style>