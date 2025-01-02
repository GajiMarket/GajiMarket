import mapboxgl from "mapbox-gl";
import { Destination } from "../api/products.api";

export const mapMarker = (map: mapboxgl.Map, position: [number, number]) => {
  const marker = new mapboxgl.Marker()
    .setLngLat(position)
    .addTo(map)
  return marker;
}

export const productMarker = (map: mapboxgl.Map, destination: Destination[]) => {
  if (!map || typeof map.getCanvasContainer !== "function") {
    throw new Error("Invalid Mapbox map instance");
  }

  // 생성된 마커들을 담을 배열
  const markers: mapboxgl.Marker[] = [];

  destination.forEach((item) => {
    const marker = new mapboxgl.Marker()
      .setLngLat([item.coordinates.longitude, item.coordinates.latitude])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div>
            <h3>${item.product_preview_name}</h3>
            <p>${item.product_preview_explanation}</p>
            <p>가격: ${item.product_preview_price}</p>
            <p>거리: ${item.product_preview_distance}</p>
          </div>
        `)
      )
      .addTo(map);
    
    markers.push(marker);
  });

  // 생성된 마커 배열을 반환 (필요하면 사용)
  return markers;
};