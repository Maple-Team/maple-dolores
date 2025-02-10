import AMapLoader from '@amap/amap-jsapi-loader'

const initMap = function () {
  //   window._AMapSec = {}

  return AMapLoader.load({
    key: 'b6497f95082184591368f2d6c7eac458',
    version: '2.0',
    Loca: {
      version: '2.0.0',
    },
  })
}
export default initMap
