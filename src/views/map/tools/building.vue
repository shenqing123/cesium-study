<template>
    <div>

    </div>
</template>

<script setup>
import * as Cesium from 'cesium'

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MzhjNzg5ZC0zY2JlLTRiMzYtYmU4YS02OGRmMmUyNTVhYmMiLCJpZCI6MTc4MzQ4LCJpYXQiOjE3MDAwMTIwODB9.nqxwRlQvcw3eppW5CuRJ2NrnWQAaYtnKbOizCDj_nqg'
let viewer = null

onMounted(() => {
    viewer = inject('$viewer')
    import('../../../assets/build.json').then(res => {
        // viewer.dataSources.add(res)
        console.log('res', res);
    })

})
</script>

<style lang="scss" scoped></style>