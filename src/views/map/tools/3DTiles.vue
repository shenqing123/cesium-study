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
    const tileset = viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
            url: Cesium.IonResource.fromAssetId(69380)
        })
    )
    viewer.flyTo(tileset)

})
</script> 

<style lang="scss" scoped></style>