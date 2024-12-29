import { useState, useEffect } from "react";

// 타입 정의
interface Location {
    lat: number;
    lng: number;
}
interface GeolocationError {
    code: number;
    message: string;
}

const useLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setLocation({ lat: latitude, lng: longitude });
          // console.log("Location fetched:", { lat: latitude, lng: longitude });
        },
        (err: GeolocationError) => {
          // console.error(`Error (${err.code}): ${err.message}`);
          setError(`위치 정보 조회 실패 (${err.code}): ${err.message}`);
        },
        {
            // 정확도를 올리는 작업
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
  }, []);

  return { location, error };
};

export default useLocation;