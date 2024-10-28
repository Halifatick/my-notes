<script setup>
const props = defineProps({
  id: {
    type: String,
    default: 'input'
  },
  name: {
    type: String,
    default: ''
  },
  inputClasses: {
    type: [String, Array],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  isDisabled: {
    type: Boolean,
    default: false
  },
  autocomplete: {
    type: String,
    default: 'off'
  },
})

const model = defineModel({})
</script>

<template>
  <input
      :id="id"
      :name="name"
      :type="type"
      class="form-control"
      :class="[inputClasses]"
      :placeholder="placeholder"
      :disabled="isDisabled"
      v-model="model"
      :autocomplete="autocomplete"
  />
</template>

<style scoped lang="scss">

</style>