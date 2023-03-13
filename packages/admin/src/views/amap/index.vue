<template>
  <div
    id="map"
    class="map"
  ></div>
</template>

<script>
// 初始化一个map变量存储map对象
import initMap from './initMap.js'
import dataJson from './geo.json' // 事先准备好的geojson

export default {
  mounted() {
    this.init()
  },
  methods: {
    init: function () {
      initMap().then((AMap) => {
        const map = new AMap.Map('map', {
          zIndex: 15,
          zoom: 18,
          pitch: 50,
          rotation: -6,
          showIndoorMap: false,
          showLabel: false,
          center: [121.294438, 31.295581],
          features: ['point', 'line', 'road'],
          // viewMode: '3D',
        })
        this.locaInit(map)
      })
    },
    locaInit: function (map) {
      const loca = new Loca.Container({
        map,
      })
      const geo = new Loca.GeoJSONSource({
        data: dataJson,
      })
      // 设置光源效果
      loca.ambLight = {
        intensity: 0.55,
        color: '#fff',
      }
      loca.dirLight = {
        intensity: 1,
        color: '#5BD6EA',
        target: [0, 0, 0],
        position: [0, -1, 1],
      }
      loca.pointLight = {
        color: '#EFFFFF',
        position: [112.028276, 31.58538, 2000000],
        intensity: 0.2,
        distance: 5000000,
      }

      const pl = new Loca.PolygonLayer({
        map,
        zIndex: 11,
        hasSide: true,
      })
      pl.setSource(geo)
      pl.setStyle({
        unit: 'meter',
        texture: 'https://a.amap.com/Loca/static/loca-v2/demos/images/windows.jpg',
        textureSize: [350, 200],
        height: (index, f) => {
          const name = f.properties.name
          const condition1 = name === '公路' || name === '不重要建筑'
          const condition2 = hospitals.indexOf(name) > -1
          if (condition1 || condition2) {
            return 0
          } else {
            return f.properties.floor * 1.5 + 15
          }
        },
        topColor: (index, f) => {
          const name = f.properties.name
          return hospitals.indexOf(name) > -1
            ? 'rgba(255,255,255,0)'
            : name.indexOf('公路') > -1
            ? '#1C70AF'
            : '#282B3B'
        },
        sideTopColor: (index, f) => {
          const name = f.properties.name
          return hospitals.indexOf(name) > -1 ? '#fff00' : name.indexOf('公路') > -1 ? '#E2FFFF' : '#06477F'
        },
        sideBottomColor: (index, f) => {
          const name = f.properties.name
          return hospitals.indexOf(name) > -1 ? '#fff00' : name.indexOf('公路') > -1 ? '#E2FFFF' : '#032653'
        },
      })
    },
  },
}
</script>
