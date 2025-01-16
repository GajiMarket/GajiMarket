import mapboxgl, { Map } from "mapbox-gl";
import { Feature, LineString, GeoJsonProperties, Geometry } from "geojson";

export interface IPathRoute {
  coordinates?: [number, number][];
  features?: Feature<Geometry, GeoJsonProperties>[];
}

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

export const mapRoute = (map: Map, pathData: IPathRoute) => {
  const coordinates = pathData.coordinates || processCoordinates(pathData.features || []);
  
  if (coordinates.length === 0) {
    console.error("유효하지 않은 path data입니다.");
    return;
  }

  const routeGeoJSON: Feature<LineString> = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates
    },
  }

  const sourceId = 'route';
  if (map.getSource(sourceId)) {
    (map.getSource(sourceId) as mapboxgl.GeoJSONSource).setData(routeGeoJSON);
  } else {
    map.addSource(sourceId, {
      type: 'geojson',
      data: routeGeoJSON
    });
    map.addLayer({
      id: sourceId,
      type: 'line',
      source: sourceId,
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#888',
        'line-width': 6
      },
    })
  }
}

export const processCoordinates = (features: Feature<Geometry, GeoJsonProperties>[]): [number, number][] => {
  if (!features || !Array.isArray(features)) {
      console.error("Invalid features input:", features);
      return [];
  }

  return features.flatMap((feature) => {
      const { geometry } = feature;

      if (geometry.type === "Point") {
          // Point 타입인 경우 좌표를 배열에 추가
          return [geometry.coordinates as [number, number]];
      } else if (geometry.type === "LineString") {
          // LineString 타입인 경우 배열로 반환
          return geometry.coordinates as [number, number][];
      }

      // 처리할 수 없는 경우 빈 배열 반환
      return [];
  });
};