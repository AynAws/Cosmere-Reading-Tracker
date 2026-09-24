<script setup>
import ReadStatusBadge from './ReadStatusBadge.vue'

defineProps(['book', 'status', 'highlighted'])
defineEmits(['setRead'])

function nextStatus(current) { // loops 0 -> 1 -> 2 -> 0
    return (current + 1) % 3
}
</script>

<template>
    <div class="book-row" :class="{ highlighted }">
        <span class="title">{{ book.title }}</span>
        <span class="series" v-if="book.series">{{ book.series }}</span>
        <ReadStatusBadge
          :status="status"
          @change="$emit('setRead', book.id, nextStatus(status))"
        />
    </div>
</template>

<style scopes>
.book-row {
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 0.5rem;
    border-bottom: 1px solid #ddd;
}
.highlighted {
    background-color: #fff8dc;
}
.series {
    color: #888;
    font-size: 0.9em;
}
</style>