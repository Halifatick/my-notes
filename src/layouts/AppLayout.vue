<script setup>
import { useRoute } from 'vue-router'
import { useLifecycleLogger } from '@/common/hooks/lifecycleLogger.js'

const route = useRoute()

useLifecycleLogger({ name: 'AppLayout' })
</script>

<template>
    <component :is="route.meta.layoutComponent || 'div'">
        <slot />
    </component>
</template>

<style scoped></style>
