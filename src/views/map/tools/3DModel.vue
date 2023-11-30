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
    const position = Cesium.Cartesian3.fromDegrees(114.30, 30.50, 200);
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(position,
        Cesium.HeadingPitchRoll.fromDegrees(-90, 0, 0))
    const entity = viewer.entities.add({
        position: position,
        orientation: orientation,
        model: {
            scale: 0.3,
            uri: '/src/assets/Cesium_Air.glb',
            minimumPixelSize: 200, //模型最小尺寸
            maximunScale: 5000,//最大比例尺大小
            show: true
        }
    })
    viewer.zoomTo(entity)
    // 粒子系统
    viewer.scene.primitives.add(new Cesium.ParticleSystem({
        image: '/src/assets/fire.png',
        imageSize: new Cesium.Cartesian2(20, 20), //尺寸
        startScale: 1.0, //初始大小
        endScale: 4.0, //最后大小 
        particleLife: 3.0, ////设置每一个粒子存在的时间
        speed: 5.0, //发射粒子的速度
        emitter: new Cesium.CircleEmitter(2),  //设置发射器(圆形发射器) 
        // emitter: new Cesium.BoxEmitter(new Cesium.Cartesian3(10, 10, 10)),
        emissionRate: 5,//例子发射数量
        modelMatrix: entity.computeModelMatrix(
            viewer.clock.startTime,  //时间控件中的起始时间
            new Cesium.Matrix4()  //4*4矩阵数据
        ),  //设置位置
        lifetime: 16, //生命期属性为所需的持续时间
        // loop: false,  //只循环一次
    }));
})
</script>

<style lang="scss" scoped></style>