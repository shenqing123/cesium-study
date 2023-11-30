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
    // const primitive = new Cesium.Primitive({
    //     geometryInstances: new Cesium.GeometryInstance({
    //         geometry: new Cesium.EllipseGeometry({
    //             center: Cesium.Cartesian3.fromDegrees(-100.0, 20.0),
    //             semiMinorAxis: 500000.0,
    //             semiMajorAxis: 1000000.0,
    //             rotation: Cesium.Math.PI_OVER_FOUR,
    //             vertexFormat: Cesium.VertexFormat.POSITION_AND_ST
    //         }),
    //     }),
    //     appearance: new Cesium.EllipsoidSurfaceAppearance({
    //         material: Cesium.Material.fromType('Stripe')
    //     })
    // })
    // viewer.scene.primitives.add(primitive);

    const rectangleInstance = new Cesium.GeometryInstance({
        geometry: new Cesium.RectangleGeometry({
            rectangle: Cesium.Rectangle.fromDegrees(-140.0, 30.0, -100.0, 40.0),
            vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
        }),
        id: 'rectangle',
        attributes: {
            color: new Cesium.ColorGeometryInstanceAttribute(0.0, 1.0, 1.0, 0.5)
        }
    });
    const triangleInstance = new Cesium.GeometryInstance({
        geometry: new Cesium.PolygonGeometry({
            polygonHierarchy: {
                positions: Cesium.Cartesian3.fromDegreesArray([-100, 50, -100, 10, -90, 30])
            }
        }),

        id: 'triangle',
        attributes: {
            color: new Cesium.ColorGeometryInstanceAttribute(0.0, 1.0, 1.0, 0.5)
        }
    });
    const ellipsoidInstance = new Cesium.GeometryInstance({
        geometry: new Cesium.EllipsoidGeometry({
            radii: new Cesium.Cartesian3(500000.0, 500000.0, 1000000.0),
            vertexFormat: Cesium.VertexFormat.POSITION_AND_NORMAL
        }),
        modelMatrix: Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(
            Cesium.Cartesian3.fromDegrees(-95.59777, 40.03883)), new Cesium.Cartesian3(0.0, 0.0, 500000.0), new Cesium.Matrix4()),
        id: 'ellipsoid',
        attributes: {
            color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.AQUA)
        }
    });
    viewer.scene.primitives.add(new Cesium.Primitive({
        geometryInstances: [rectangleInstance, triangleInstance],
        appearance: new Cesium.PerInstanceColorAppearance()
    }));


})
</script>

<style lang="scss" scoped></style>