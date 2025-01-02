import React, { useState, useEffect } from 'react';
import '../../style/location.css';
import gps_icon from '../../img/gps_icon.png';

//latitude : 위도, longitude : 경도
interface Coordinates {
  latitude: number;
  longitude: number;
}

const Location: React.FC = () => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let watchId: number | null = null;

    const startWatching = () => {
      if ('geolocation' in navigator) {
        watchId = navigator.geolocation.watchPosition(
          (position) => {
            setCoordinates({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            setError(null); // 기존 오류 초기화
          },
          (err) => {
            console.error('Error watching location:', err.message);
            setError(err.message);
          },
          {
            enableHighAccuracy: true, // 높은 정확도의 위치 데이터를 요청합니다.
            timeout: 10000, // 10초 이내에 위치 가져오기
            maximumAge: 0, // 캐시된 데이터 사용하지 않음
          }
        );
      } else {
        setError('Geolocation API is not supported in this browser.');
      }
    };

    // 실시간 위치 업데이트 시작
    startWatching();

    // 컴포넌트가 언마운트되면 watchPosition 중지
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return (
    <div className='location'>
      <button onClick={() => window.location.reload()}><img src={gps_icon} alt="내위치" className='gps_icon' /></button>
      {coordinates ? (
        <p>
          Latitude: {coordinates.latitude}, Longitude: {coordinates.longitude}
        </p>
      ) : (
        <p>No location data available.</p>
      )}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default Location;
