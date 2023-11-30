<template>
    <div>

    </div>
</template>

<script setup>
import * as Cesium from 'cesium'
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MzhjNzg5ZC0zY2JlLTRiMzYtYmU4YS02OGRmMmUyNTVhYmMiLCJpZCI6MTc4MzQ4LCJpYXQiOjE3MDAwMTIwODB9.nqxwRlQvcw3eppW5CuRJ2NrnWQAaYtnKbOizCDj_nqg'
let viewer = null

let pointArray = []
onMounted(() => {
    viewer = inject('$viewer')
    // const point = new Cesium.Entity({
    //     position: new Cesium.Cartesian3(-4129988.7174613113, 2897438.6009727255, -3889396.77967062),
    //     point: {
    //         color: Cesium.Color.BLUE,
    //         pixelSize: 10
    //     }
    // })
    // viewer.entities.add(point)
    const tileset = viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
            url: Cesium.IonResource.fromAssetId(75343)
        })
    )
    viewer.flyTo(tileset)
    const line = viewer.entities.add({
        polyline: {
            positions: [],
            masterial: Cesium.Color.AQUA
        }
    })
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)

    // 拾取元素
    // handler.setInputAction((evt) => {
    //     const position = viewer.scene.pickPosition(evt.position)
    //     const feature = viewer.scene.pick(evt.position)
    //     if (feature && feature.id) {
    //         feature.id.point.color = Cesium.Color.GREEN
    //     }
    // }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

    handler.setInputAction((evt) => {

        const position = viewer.scene.pickPosition(evt.position)
        // 没有3D瓦片， position 为 undefined
        console.log('handle', evt.position, position);
        if (position) {
            viewer.entities.add({
                position,
                point: {
                    color: Cesium.Color.BLUE,
                    pixelSize: 10
                }
            })
            // positions不是一个数组，是一个对象，不能直接push
            pointArray.push(position)
            line.polyline.positions = pointArray
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

    handler.setInputAction(e => {
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
        handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK)
        viewer.entities.removeAll()
        viewer.entities.add(line)
        pointArray = []
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)


    // 鼠标移到瓦片上悬停的瓦片高亮
    let lastPick = null
    handler.setInputAction(e => {
        let feature = viewer.scene.pick(e.endPosition)
        console.log('feature', feature);
        if (feature) {
            if (lastPick) {
                lastPick.color = Cesium.Color.WHITE
            }
            // 只有这个瓦片（75343）有color属性
            feature.color = Cesium.Color.AQUA

            lastPick = feature
        }

    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
})

</script>

<style lang="scss" scoped></style>