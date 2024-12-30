import { useState, useEffect } from "react";

// 타입 정의
interface Location {
  lng: number;
  lat: number;
}
interface GeolocationError {
    code: number;
    message: string;
}

const useLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser.");
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        ({ coords: { longitude, latitude } }) => {
          setLocation({ lng: longitude, lat: latitude });
          setLoading(false)
        },
        (err: GeolocationError) => {
          setError(`위치 정보 조회 실패 (${err.code}): ${err.message}`);
          setLoading(false)
        },
        {
            // 정확도를 올리는 작업
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
  }, []);

  return { location, error, loading };
};

export default useLocation;