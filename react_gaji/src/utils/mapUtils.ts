import mapboxgl from "mapbox-gl";

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