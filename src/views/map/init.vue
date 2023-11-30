<template>
    <div id="map"></div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { app } from '../../main'
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MzhjNzg5ZC0zY2JlLTRiMzYtYmU4YS02OGRmMmUyNTVhYmMiLCJpZCI6MTc4MzQ4LCJpYXQiOjE3MDAwMTIwODB9.nqxwRlQvcw3eppW5CuRJ2NrnWQAaYtnKbOizCDj_nqg'
onMounted(() => {
    const esri = new Cesium.ArcGisMapServerImageryProvider({
        url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
    });
    // const viewer = new Cesium.Viewer('map', {})
    const viewer = new Cesium.Viewer('map', {
        imageryProvider: esri,
        // 关闭沙盒
        infoBox: false,
        // 控件关闭 
        baseLayerPicker: false,  //是否显示图层选择控件
        // animation: false, //是否显示动画控件
        timeline: false,  //是否显示时间轴控件
        fullscreenButton: false, //是否显示全屏按钮
        geocoder: false, //是否显示搜索按钮
        homeButton: false, //是否显示主页按钮
        navigationHelpButton: false,//是否显示帮助提示按钮
        sceneModePicker: false,//是否显示投影方式按钮
        shouldAnimate: true,
        // shadows: true,  //显示阴影
        //地形图层TerrainProvider
        // 有问题
        terrainProvider: Cesium.createWorldTerrain({
            // requestWaterMask: true, // Water surface effects
        })
    })


    // 创建一个笛卡尔坐标
    // let cartPosition = new Cesium.Cartesian3(114, 30, 0)
    // 经纬度转笛卡尔坐标，高度可以不传,高度改变结果的三个值都会改
    let position = Cesium.Cartesian3.fromDegrees(114, 30, 20000)
    // console.log('position', position);

    // 笛卡尔转经纬度
    // let lnglat = Cesium.Cartographic.fromCartesian(position)
    // let lon = Cesium.Math.toDegrees(lnglat.longitude)
    // let lat = Cesium.Math.toDegrees(lnglat.latitude)
    // console.log('lnghlayt', lnglat, lon, lat);
    // 有问题
    // viewer.camera.flyTo({
    //     destination: position,
    //     orientation: {
    //         heading: Cesium.Math.toRadians(0),
    //         pitch: Cesium.Math.toRadians(-90),
    //         roll: Cesium.Math.toRadians(0)
    //     }
    // })

    const position2 = Cesium.Cartesian3.fromDegrees(121, 30)
    viewer.camera.lookAt(position2, new Cesium.HeadingPitchRange(
        Cesium.Math.toRadians(0),
        Cesium.Math.toRadians(-90),
        20000,//中心点距离地面的距离
    ))
    app.provide('$viewer', viewer)

})
</script>

<style lang="scss" scoped>
#map {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
</style>