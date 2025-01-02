import mapboxgl from "mapbox-gl";
import { Destination } from "../api/products.api";

// 내좌표 마커
export const mapMarker = (map: mapboxgl.Map, position: [number, number]) => {
  const marker = new mapboxgl.Marker({
    color: "#AC86DD"
  })
    .setLngLat(position)
    .addTo(map)
  return marker;
}

// 상품 마커
export const productMarker = (map: mapboxgl.Map, destination: Destination[]) => {
  const markers: mapboxgl.Marker[] = [];

  destination.forEach((item) => {
    // 팝업 생성
    const popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML(`
        <div>
          <h3>${item.product_preview_name}</h3>
          <p>${item.product_preview_explanation}</p>
          <p>가격: ${item.product_preview_price}</p>
          <p>거리: ${item.product_preview_distance}</p>
          <DirectionButton latitude={item.coordinates.latitude} longitude={item.coordinates.longitude} />
        </div>
      `);

    // 마커 생성
    const marker = new mapboxgl.Marker({ color: '#8142D6' })
      .setLngLat([item.coordinates.longitude, item.coordinates.latitude])
      .setPopup(popup)
      .addTo(map);

    // 마커 클릭 이벤트: 지도 중심 이동
    marker.getElement().addEventListener('click', () => {
      // 팝업 열기 (자동으로 열림)
      popup.addTo(map).setLngLat([item.coordinates.longitude, item.coordinates.latitude]);

      // 지도 중심 부드럽게 이동
      map.flyTo({
        center: [item.coordinates.longitude, item.coordinates.latitude],
        zoom: map.getZoom(), // 현재 줌 유지
        speed: 1.2, // 이동 속도
        curve: 1.5, // 곡률
        essential: true, // 사용자 움직임 중에도 동작
      });
    });

    markers.push(marker);
  });

  return markers;
};