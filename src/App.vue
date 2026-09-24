<script setup>
import { computed } from 'vue'
import booksData from './data/books.json'
import ordersData from './data/readingOrders.json'
import { getOrderedBooks, getPublicationOrder, isUnlocked, getRecommendations, getNextInOrder } from './utils/readingOrder.js'
import { useReadStatus } from './composables/useReadStatus.js'
import BookList from './components/BookList.vue'

const { readStatus, setRead, activeOrder, setOrder } = useReadStatus()

const bookMap = Object.fromEntries(booksData.map(b => [b.id, b]))

const displayedBooks = computed(() => {
    if (activeOrder.value === null) return getPublicationOrder(booksData)
    const orderDef = ordersData.find(o => o.name === activeOrder.value)
    return getOrderedBooks(booksData, orderDef.order)
})

const highlighted = computed(() => {
    if (activeOrder.value === null) return getRecommendations(booksData, readStatus.value)
    const orderDef = ordersData.find(o => o.name === activeOrder.value)
    const nextId = getNextInOrder(orderDef.order, readStatus.value)
    return nextId ? [booksData.find(b => b.id === nextId)] : []
})

const highlightedIds = computed(() => new Set(highlighted.value.map(b => b.id)))

const unlocked = computed (() => isUnlocked(booksData, readStatus.value, bookMap))

const unlockedIds = computed(() => new Set(unlocked.value.map(b => b.id)))
</script>

<template>
    <div class="app">
        <h1>Cosmere Reading Tracker</h1>
        <p>Yellow highlight means you</p>

        <label>
            Reading order:
            <select :value="activeOrder ?? ''" @change="setOrder($event.target.value || null)">
                <option value="">Custom (recommendations)</option>
                <option v-for="o in ordersData" :key="o.name" :value="o.name">{{ o.name }}: {{ o.description }}</option>
            </select>
        </label>

        <BookList
          :books="displayedBooks"
          :readStatus="readStatus"
          :highlightedIds="highlightedIds"
          :unlockedIds="unlockedIds"
          @setRead="setRead"
        />
    </div>
</template>