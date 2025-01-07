import mapboxgl, { Map } from "mapbox-gl";
import { IPathResponse } from "../api/pathFinder.api";

export const mapMarker = (map: mapboxgl.Map, position: [number, number]) => {
  const marker = new mapboxgl.Marker({
    draggable: false,
    anchor: 'center',
  })
  .setLngLat(position)
  .addTo(map)

  return marker;
}

export const mapPopup = (map: mapboxgl.Map, position: [number, number]) => {
  const popup = new mapboxgl.Popup()
    .setLngLat(position)
    .addTo(map);

  return popup;
}

export const mapRoute = (map: Map, pathData: { coordinates: [number, number][]}) => {
  const routeGeoJSON = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: pathData.coordinates, // 경로 데이터
    },
  };

  if (map.getSource('route')) {
    // 이미 소스가 있는 경우 데이터를 업데이트
    (map.getSource('route') as mapboxgl.GeoJSONSource).setData(routeGeoJSON);
  } else {
    // 소스가 없으면 새로 추가
    map.addSource('route', {
      type: 'geojson',
      data: routeGeoJSON,
    });

    map.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#888',
        'line-width': 6,
      },
    });
  }
}
