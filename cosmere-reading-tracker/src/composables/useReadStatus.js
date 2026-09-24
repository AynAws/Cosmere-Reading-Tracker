import { act } from 'react'
import { ref, watch } from 'vue'

const ACTIVE_ORDER_KEY = 'cosmere-active-order'
const STORAGE_KEY = 'cosmere-reading'

export function useReadStatus() {
    const readStatus = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}' )) // 0 => not started, 1 => in-progress, 2 => completed

    watch(readStatus, (newVal) => { // updates local storage whenever readStatus changes
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
    }, { deep: true })

    function setRead(bookId, status) { // changes readStatus
        readStatus.value[bookId] = status
    }

    const activeOrder = ref(JSON.parse(localStorage.getItem(ACTIVE_ORDER_KEY) ?? null))

    watch(activeOrder, (val) => {
        if (!val) localStorage.removeItem(ACTIVE_ORDER_KEY)
        else localStorage.setItem(ACTIVE_ORDER_KEY, val)
    })

    function setOrder(orderName) {
        activeOrder.value = orderName
    }

    return { readStatus, setRead, activeOrder, startOrder }
}