<template>
    <div id="map-tools-bl">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>Card name</span>
                </div>
            </template>
            <div v-for="item in list" @click="flyTo(item)">{{ item.name }}</div>
        </el-card>
    </div>
</template>

<script setup>
import building from '../../../assets/build.json'
import { load3dtiles, update3dtiles } from '../../../utils/load'
import * as Cesium from 'cesium'
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MzhjNzg5ZC0zY2JlLTRiMzYtYmU4YS02OGRmMmUyNTVhYmMiLCJpZCI6MTc4MzQ4LCJpYXQiOjE3MDAwMTIwODB9.nqxwRlQvcw3eppW5CuRJ2NrnWQAaYtnKbOizCDj_nqg'
let viewer = null
let list = ref([])
let handler = null
let highLightFeature = null
let lastEntity = null
onMounted(() => {
    viewer = inject('$viewer')
    // const tileset = viewer.scene.primitives.add(
    //     new Cesium.Cesium3DTileset({
    //         url: 'Cesium.IonResource.fromAssetId(69380)'
    //     })
    // )
    // viewer.flyTo(tileset)
    drawEntity()
    load3dtiles(viewer, 'src/assets/b3dm/b3dm/tileset.json', tileset => {
        update3dtiles(tileset)
        viewer.zoomTo(tileset)
        getList()
        handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
        addMouseMoveListener()
        addClickListenr()
    })

})
function getList() {
    fetch('src/assets/facilities.json').then(res => res.json()).then(res => {
        list.value = res
    })
}
function flyTo(item) {
    let cart3 = item.cameraPosition.split(',').map(item => Number(item))
    let ort = item.cameraOrt.split(',').map(item => Number(item))
    viewer.camera.flyTo({
        destination: new Cesium.Cartesian3(...cart3),
        // orientation: item.cameraOrt
        orientation: {
            heading: ort[0],
            pitch: ort[1],
            roll: ort[2]
        }
    })
}
function drawEntity() {
    // 对象遍历
    // for(let key in building) {
    //     building[key]
    // }
    Object.keys(building).forEach(key => {
        let item = building[key]
        viewer.entities.add({
            id: key,
            position: Cesium.Cartesian3.fromDegrees(...item.center),
            label: {
                //     fillColor: Cesium.Color.BLUE,
                scale: 0.6,
                text: item.type,
                showBackground: true,
                backgroundColor: Cesium.Color.GRAY
                // pixelOffset: new Cesium.Cartesian2(0, -60)
            },
            polygon: {
                hierarchy: {
                    positions: Cesium.Cartesian3.fromDegreesArray(item.range)
                },
                material: Cesium.Color.fromCssColorString(item.color).withAlpha(0.1)
            },
            polyline: {
                positions: Cesium.Cartesian3.fromDegreesArray(item.range),
                material: new Cesium.PolylineGlowMaterialProperty({
                    glowPower: 0.1,
                    color: Cesium.Color.fromCssColorString(item.color)
                }),
                clampToGround: true,
                width: 20
            }
        })
    })

}
function addMouseMoveListener() {
    handler.setInputAction((e) => {
        let feature = viewer.scene.pick(e.endPosition)
        // 第一种方法，未成功，新建一个高亮实体，如果不hover就移除
        // if (feature && feature.id && feature.id.polygon) {
        //     if (!highLightFeature)
        //         highLightFeature = viewer.entities.add({
        //             polygon: {
        //                 hierarchy: feature.id.polygon.hierarchy,
        //                 material: Cesium.Color.RED.withAlpha(0.5)
        //             }
        //         })
        //     console.log('highlight id', highLightFeature.id);

        // } else if (highLightFeature) {
        //     console.log('dd', highLightFeature);
        //     viewer.entities.remove(highLightFeature)
        // }

        // 第二种方法： 通过id去json里找原来的颜色并恢复
        if (feature && feature.id) {

            // 点击建筑转视角
            if (lastEntity) {
                lastEntity.polygon.material.color = Cesium.Color.fromCssColorString(building[lastEntity.id].color).withAlpha(0.1)
            }
            feature.id.polygon.material.color = Cesium.Color.RED.withAlpha(0.3)
            lastEntity = feature.id


        } else {
            if (lastEntity) {
                lastEntity.polygon.material.color = Cesium.Color.fromCssColorString(building[lastEntity.id].color).withAlpha(0.1)
            }
        }

    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
}
function addClickListenr() {
    handler.setInputAction(e => {


        let entity = viewer.scene.pick(e.position)


        if (entity && entity.id) {
            console.log('entity', entity.id);
            // 点击lebal出弹框
            if (entity.id.name) {
                ElMessageBox.confirm(
                    entity.id.name,
                    entity.id.id,
                    {
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Cancel',
                        type: 'warning',
                        center: true,
                    }
                )
            } else {
                // 清除其他实体
                clear()
                // 镜头转到地方,这边也通过实体的id来联系build.json和实体
                let info = building[entity.id.id]
                flyTo(info.view)
                let children = info.child
                // 添加新的lebal
                children.forEach(item => addChildrenEntities(item, entity.id.id))
            }
        }

    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
}
function addChildrenEntities(item, type) {
    viewer.entities.add({
        name: item.owner,
        id: item.name,
        position: Cesium.Cartesian3.fromDegrees(...item.position),
        label: {
            scale: 0.6,
            text: item.name,
            showBackground: true,
            backgroundColor: Cesium.Color.GRAY
        },
        description: type
    })
}
function clear() {
    viewer.entities.removeAll()
    handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
}

</script>

<style lang="scss" scoped>
#map-tools-bl {
    position: absolute;
    top: 20px;
    left: 20px;
    background-color: white;
}
</style>