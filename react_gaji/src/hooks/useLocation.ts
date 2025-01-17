import { useState, useEffect } from "react";

interface UserLocation {
    lat: number;
    lng: number;
}

interface UseLocationOptions {
    enableHighAccuracy?: boolean;
}

const useLocation = (options: UseLocationOptions = { enableHighAccuracy: true }) => {
    const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
    const [error, setError] = useState<string | null>(null);

    const createCustomMarker = (): HTMLElement => {
      const markerElement = document.createElement("div");
      markerElement.className = "custom-marker"; // CSS로 스타일링
      return markerElement;
  };

    useEffect(() => {
        const handleSuccess = (position: GeolocationPosition) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ lat: latitude, lng: longitude });
            setError(null); // 이전 에러 상태 초기화
        };

        const handleError = (error: GeolocationPositionError) => {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    setError("위치 권한이 필요합니다. 브라우저 설정에서 위치 권한을 허용해주세요.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    setError("위치 정보를 가져올 수 없습니다.");
                    break;
                case error.TIMEOUT:
                    setError("위치 정보를 가져오는 데 시간이 초과되었습니다.");
                    break;
                default:
                    setError("알 수 없는 오류가 발생했습니다.");
            }
        };

        const watchId = navigator.geolocation.watchPosition(handleSuccess, handleError, options);

        return () => navigator.geolocation.clearWatch(watchId);
    }, [options]);

    return { userLocation, error,createCustomMarker };
};

export default useLocation;