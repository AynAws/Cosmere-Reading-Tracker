<script setup>
import BookRow from './BookRow.vue'
defineProps(['books', 'readStatus', 'highlightedIds', 'unlockedIds'])
defineEmits(['setRead'])
</script>

<template>
    <BookRow
      v-for="book in books"
      :key="book.id"
      :book="book"
      :status="readStatus[book.id] ?? 0"
      :highlighted="highlightedIds.has(book.id)"
      :unlocked="unlockedIds.has(book.id)"
      @setRead="(id, status) => $emit('setRead', id, status)"
    />
</template>