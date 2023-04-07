import React from 'react'
import { Map, MarkerCluster } from '@pansy/react-amap'
import points from './marker.json'

interface Lnglat {
  lng: number
  lat: number
}
export interface MarkerData {
  id: string
  lnglat: Lnglat
  amapMarker: {
    count: number
    originData: MarkerData[]
  }
}

export const ReactAmap = () => {
  const count = points.length
  const renderCluster = (clusterCount: number, markers: [MarkerData]) => {
    const defaultColor = ['204,235,197', '168,221,181', '123,204,196', '78,179,211', '43,140,190']
    let bgColor
    if (clusterCount >= 0 && clusterCount < 10) bgColor = defaultColor[0]
    else if (clusterCount >= 10 && clusterCount < 100) bgColor = defaultColor[1]
    else if (clusterCount >= 100 && clusterCount < 1000) bgColor = defaultColor[2]
    else if (clusterCount >= 1000 && clusterCount < 10000) bgColor = defaultColor[3]
    else if (clusterCount >= 10000) bgColor = defaultColor[4]

    const size = Math.round(25 + (clusterCount / count) ** (1 / 5) * 40)
    return (
      <div
        className="relative"
        onClick={() => {
          console.log(markers)
        }}
        style={{
          backgroundColor: `rgba(${bgColor || ''},.5)`,
          width: size,
          height: size,
          border: `solid 1px rgba(${bgColor || ''},1)`,
          borderRadius: size / 2,
          lineHeight: `${size}px`,
          color: '#fff',
          fontSize: 12,
          textAlign: 'center',
        }}
      >
        {clusterCount}
      </div>
    )
  }
  const renderMarker = (ctx: AnyToFix) => {
    return (
      <div
        onClick={() => {
          console.log(ctx)
        }}
        style={{
          backgroundColor: 'rgba(255,255,178,.9)',
          height: 18,
          width: 18,
          border: '1px solid rgba(255,255,178,1)',
          borderRadius: 12,
          boxShadow: 'rgba(0, 0, 0, 1) 0px 0px 3px',
        }}
      />
    )
  }
  return (
    <Map>
      <MarkerCluster
        data={points as unknown as AMap.MarkerCluster.DataOptions[]}
        offset={[-9, -9]}
        clusterByZoomChange
        maxZoom={30}
        gridSize={60}
        zoomOnClick={false}
        render={(ctx) => renderMarker(ctx)}
        renderCluster={({ count, list }) => renderCluster(count, list)}
      />
    </Map>
  )
}
