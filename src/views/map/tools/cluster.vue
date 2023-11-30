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
    const data = Cesium.GeoJsonDataSource.load('src/assets/camera.json')
    const pinBuilder = new Cesium.PinBuilder();
    const pin50 = pinBuilder
        .fromText("50+", Cesium.Color.RED, 48)
        .toDataURL();
    const pin40 = pinBuilder
        .fromText("40+", Cesium.Color.ORANGE, 48)
        .toDataURL();
    const pin30 = pinBuilder
        .fromText("30+", Cesium.Color.YELLOW, 48)
        .toDataURL();
    const pin20 = pinBuilder
        .fromText("20+", Cesium.Color.GREEN, 48)
        .toDataURL();
    const pin10 = pinBuilder
        .fromText("10+", Cesium.Color.BLUE, 48)
        .toDataURL();
    data.then(res => {
        viewer.dataSources.add(res)
        viewer.flyTo(res)
        const pixelRange = 30;
        const minimumClusterSize = 5;
        const enabled = true;

        res.clustering.enabled = enabled;
        res.clustering.pixelRange = pixelRange;
        res.clustering.minimumClusterSize = minimumClusterSize;

        res.clustering.clusterEvent.addEventListener(
            function (clusteredEntities, cluster) {
                cluster.label.show = false;
                cluster.billboard.show = true;

                if (clusteredEntities.length >= 50) {
                    cluster.billboard.image = pin50;
                } else if (clusteredEntities.length >= 40) {
                    cluster.billboard.image = pin40;
                } else if (clusteredEntities.length >= 30) {
                    cluster.billboard.image = pin30;
                } else if (clusteredEntities.length >= 20) {
                    cluster.billboard.image = pin20;
                } else if (clusteredEntities.length >= 10) {
                    cluster.billboard.image = pin10;
                } else {
                    cluster.billboard.image =
                        'src/assets/camera.png'
                    cluster.billboard.scale = 0.1
                }
            })

        res.entities.values.forEach(item => {
            item.billboard.image = 'src/assets/camera.png'
            item.billboard.scale = 0.1
        })

    })
})
</script>

<style lang="scss" scoped></style>