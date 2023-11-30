import { defineStore } from "pinia";

export const useDemoStore = defineStore('demo', () => {
    // state
    let count = ref(1)
    // action, 异步的同样写法
    function addCount() {
        count++
    }
    // getter
    let count10 = computed(() => {
        return count * 10
    })
    return {
        count,
        addCount,
        count10
    }
})