import mapboxgl, { Map } from "mapbox-gl";
import { Feature, LineString, GeoJsonProperties, Geometry } from "geojson";

export interface IPathRoute {
  coordinates?: [number, number][];
  features?: Feature<Geometry, GeoJsonProperties>[];
}

/**
 * 마커를 업데이트하거나 없으면 새로 생성합니다.
 */
export const updateOrCreateMarker = (
  map: mapboxgl.Map,
  position: [number, number],
  existingMarker: mapboxgl.Marker | null,
  options?: { imageUrl?: string; className?: string }
): mapboxgl.Marker => {
  const { imageUrl = "/default-marker.png", className = "marker" } = options || {};

  /**
   * 커스텀 마커 요소 생성
   */
  const createMarkerElement = (): HTMLElement => {
    const el = document.createElement("div");
    el.className = className;
    const img = document.createElement("img");
    img.src = imageUrl;
    img.style.width = "40px";
    img.style.height = "47px";
    el.appendChild(img);
    return el;
  };

  if (existingMarker) {
    const markerElement = existingMarker.getElement();
    markerElement.className = className;
    const img = markerElement.querySelector("img");
    if (img) img.src = imageUrl;
    existingMarker.setLngLat(position);
    return existingMarker;
  }

  const newMarker = new mapboxgl.Marker({
    element: createMarkerElement(),
    draggable: false,
  });
  newMarker.setLngLat(position).addTo(map);
  return newMarker;
};

/**
 * GeoJSON 데이터를 기반으로 경로를 지도에 추가합니다.
 */
export const mapRoute = (map: Map, pathData: IPathRoute) => {
  const coordinates = pathData.coordinates || processCoordinates(pathData.features || []);
  if (coordinates.length === 0) {
    console.error("유효하지 않은 경로 데이터입니다.");
    return;
  }

  const routeGeoJSON: Feature<LineString> = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates,
    },
  };

  const sourceId = "route";
  if (map.getSource(sourceId)) {
    (map.getSource(sourceId) as mapboxgl.GeoJSONSource).setData(routeGeoJSON);
  } else {
    map.addSource(sourceId, {
      type: "geojson",
      data: routeGeoJSON,
    });
    map.addLayer({
      id: sourceId,
      type: "line",
      source: sourceId,
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#AC86DD",
        "line-width": 6,
      },
    });
  }
};

/**
 * GeoJSON Feature에서 좌표를 추출합니다.
 */
export const processCoordinates = (
  features: Feature<Geometry, GeoJsonProperties>[]
): [number, number][] => {
  if (!features || !Array.isArray(features)) {
    console.error("유효하지 않은 Feature 데이터:", features);
    return [];
  }

  return features.flatMap((feature) => {
    const { geometry } = feature;

    if (geometry.type === "Point") {
      return [geometry.coordinates as [number, number]];
    } else if (geometry.type === "LineString") {
      return geometry.coordinates as [number, number][];
    }

    return [];
  });
};