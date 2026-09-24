<script setup>
defineProps(['status'])
defineEmits(['change'])

const labels = ['Not started', 'In progress', 'Finished']
</script>

<template>
    <button
      class="badge"
      :class="`status-${status}`"
      @click="$emit('change')"
    >
        {{ labels[status] }}
    </button>
</template>

<style scoped>
.badge {
    border: none;
    border-radius: 999px;
    padding: 0.25rem 0.75erm;
    font-size: 0.85rem;
    cursor: pointer;
}
.status-0 { background-color: #e0e0e0; color: #555; }
.status-1 { background-color: #ffe08a; color: #7a5900; }
.status-2 { background-color: #a3e6a3; color: #1a5c1a; }
</style>