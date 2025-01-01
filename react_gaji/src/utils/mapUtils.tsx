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

  destination.forEach((destination) => {
    const marker = new mapboxgl.Marker()
      .setLngLat([
        destination.coordinates.longitude,
        destination.coordinates.latitude
      ])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div>
            <h3>${destination.product_preview_name}</h3>
            <p>${destination.product_preview_explanation}</p>
            <p>가격: ${destination.product_preview_price}</p>
            <p>거리: ${destination.product_preview_distance}</p>
          </div>
        `)
      )
      .addTo(map)
      return marker;
  })
};