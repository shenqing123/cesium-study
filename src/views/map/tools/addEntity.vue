<template>
    <div id="map"></div>
    <button id="btn-tools-delete" @click="deleteEntity">直接删</button>
    <button id="btn-tools-deleteById" @click="deleteById">先查再删</button>
    <button id="btn-tools-deleteFromArray" @click="deleteFromArray">数组当图层删</button>
    <button id="btn-tools-deleteAll" @click="deleteAll">全删</button>
    <button id="btn-tools-callbackProperty" @click="addDynamicEntity">动态实体</button>
</template>

<script setup>
import * as Cesium from 'cesium'
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MzhjNzg5ZC0zY2JlLTRiMzYtYmU4YS02OGRmMmUyNTVhYmMiLCJpZCI6MTc4MzQ4LCJpYXQiOjE3MDAwMTIwODB9.nqxwRlQvcw3eppW5CuRJ2NrnWQAaYtnKbOizCDj_nqg'
let viewer = null
let cusMark = null
// let viewer2 = null
onMounted(() => {
    viewer = inject('$viewer')
    // viewer = new Cesium.Viewer('map', {})
    const point = new Cesium.Entity({
        position: Cesium.Cartesian3.fromDegrees(100, 30),
        point: {
            color: Cesium.Color.BLUE,
            pixelSize: 10
        }
    })
    viewer.entities.add(point)

    const lebal = viewer.entities.add({
        id: 'lebal',
        position: Cesium.Cartesian3.fromDegrees(121, 30, 100),
        label: {
            fillColor: Cesium.Color.BLUE,
            pixelSize: 20,
            text: 'abc',
            pixelOffset: new Cesium.Cartesian2(0, -60)
        }
    })
    const polygon = viewer.entities.add({
        polygon: {
            hierarchy: {
                positions: Cesium.Cartesian3.fromDegreesArray([120, 25, 121, 25, 121, 26])
            },
            material: Cesium.Color.fromRandom().withAlpha(0.5),
            height: 100000,
            extrudedHeight: 200000
        }
    })
    const billboard = viewer.entities.add({
        id: 'billboard',
        position: Cesium.Cartesian3.fromDegrees(121, 30, 100),
        billboard: {
            image: 'src/assets/position.png',
            scale: 0.3,
            color: Cesium.Color.GREEN
        }

    })

    const polylineForBillboard = viewer.entities.add({
        polyline: {
            positions: Cesium.Cartesian3.fromDegreesArrayHeights([121, 30, 100, 121, 30, 0]),
            masterial: Cesium.Color.AQUA
        }
    })

    const polyline = viewer.entities.add({
        polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray([120, 25, 123, 25, 123, 30]),
            material: Cesium.Color.YELLOW,
            width: 10
        }
    })

    const box = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(119, 20),
        box: {
            dimensions: new Cesium.Cartesian3(1000, 500, 200),
            masterial: Cesium.Color.GREEN
        }
    })

    const ellips = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(114, 30),
        ellipse: {
            semiMajorAxis: 500, //半长轴
            semiMinorAxis: 300, //半短轴
            rotation: Math.PI / 2
        }
    })

    const rect = viewer.entities.add({
        rectangle: {
            // 顺序：左下-》右上 （西南东北）
            coordinates: Cesium.Rectangle.fromDegrees(120, 30, 124, 40),
            material: 'src/assets/position.png'
        }
    })

    cusMark = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(121, 30, 100),
        label: {
            fillColor: Cesium.Color.BLUE,
            pixelSize: 20,
            text: 'abc',
            pixelOffset: new Cesium.Cartesian2(0, -60)
        },
        billboard: {
            image: 'src/assets/position.png',
            scale: 0.3,
            color: Cesium.Color.GREEN
        },
        polyline: {
            positions: Cesium.Cartesian3.fromDegreesArrayHeights([121, 30, 100, 121, 30, 0]),
            masterial: Cesium.Color.AQUA
        }
    })

    viewer.zoomTo(cusMark)

})
function deleteEntity() {
    viewer.entities.remove(cusMark)
}
function deleteById() {
    viewer.entities.removeById('lebal')
}
function getById() {
    console.log(viewer.entities.getById('billboard'));
}
function deleteFromArray() {
    // 定义一个空数组，要一起删的放进来
    // 注意删完了要把数组清空
}

function deleteAll() {
    viewer.entities.removeAll()
}
let lng, lat, num = 0
function addDynamicEntity() {
    const line = viewer.entities.add({
        polyline: {
            positions: new Cesium.CallbackProperty(() => {
                num += 0.002
                lng = 120 + num
                lat = 30 + num
                if (lng < 121) {
                    return Cesium.Cartesian3.fromDegreesArray([120, 30, lng, lat])
                } else {
                    // callbackProperty会创建一个死循环一直执行，当渲染完毕后
                    // 给positions重新赋一个新值，不用callbackProperty再提供
                    // 这样就能跳出循环，停止性能损耗
                    line.polyline.positions = Cesium.Cartesian3.fromDegreesArray([120, 30, 121, 30])
                }
            }, false),
            masterial: Cesium.Color.YELLOW,
            width: 5
        }
    })
    let position = Cesium.Cartesian3.fromDegrees(120, 30, 1000000)
    viewer.camera.setView({
        destination: position
    })
}
</script>

<style lang="scss" scoped>
#btn-tools-delete {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 99
}

#btn-tools-deleteAll {
    position: absolute;
    top: 20px;
    left: 150px;
    z-index: 99
}

#btn-tools-deleteById {
    position: absolute;
    top: 20px;
    left: 90px;
    z-index: 99
}

#btn-tools-callbackProperty {
    position: absolute;
    top: 80px;
    left: 20px;
    z-index: 99
}
</style>