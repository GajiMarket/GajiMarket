import mapboxgl from "mapbox-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";

export const mapMarker = (map: mapboxgl.Map, position: [number, number]) => {
  const marker = new mapboxgl.Marker({
    draggable: false,
    anchor: 'center',
  })
  .setLngLat(position)
  .addTo(map)

  return marker;
}