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
    var linestring1 = turf.lineString([[-24, 63], [-23, 60], [-25, 65], [-20, 69]], { name: 'line 1' });
    var multiPoly = turf.multiPolygon([[[[0, 0], [0, 10], [10, 10], [10, 0], [0, 0]]]]);
    console.log('linestriing', linestring1);
    const data = Cesium.GeoJsonDataSource.load(linestring1)
    // data.then(res => {
    //     console.log('res', res);
    //     // 添加到entities里
    //     // viewer.entities.add(res.entities.values[0])
    //     // viewer.zoomTo(res.entities.values[0])
    //     // 添加到datasource里
    //     viewer.dataSources.add(res)
    //     viewer.zoomTo(res)
    // })

    // 可以直接添加promise《datasource》
    // const dataSoiurcepromise = Cesium.GeoJsonDataSource.load(multiPoly)
    // viewer.dataSources.add(dataSoiurcepromise)
    // viewer.zoomTo(dataSoiurcepromise)

    // topojson文件：
    // const dataSoiurcepromise = Cesium.GeoJsonDataSource.load('src/assets/test.topojson')
    // viewer.dataSources.add(dataSoiurcepromise)
    // viewer.zoomTo(dataSoiurcepromise)

    //kmz/kml文件：
    // const dataSoiurcepromise = Cesium.KmlDataSource.load('src/assets/gdp.kmz')
    // viewer.dataSources.add(dataSoiurcepromise)
    // viewer.zoomTo(dataSoiurcepromise)

    // czml动态文件：
    // const dataSoiurcepromise = Cesium.CzmlDataSource.load('src/assets/Vehicle.czml')
    // dataSoiurcepromise.then(res => {
    //     viewer.dataSources.add(res);
    //     let entity = res.entities.getById("Vehicle")
    //     viewer.trackedEntity = entity;  //trackedEntity 可以实现一直移动相机跟踪entity目标
    // })
})
</script>

<style lang="scss" scoped></style>