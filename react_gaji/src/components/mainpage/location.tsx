import React,{useState} from 'react';
import '../style/My_location.css';
import gps_icon from '../../img/gps_icon.png'

//latitude : 위도, longitude : 경도
interface Coordinates {
    latitude: number;
    longitude: number;
  }

const location:React.FC = () => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setError(null); // 기존 오류 초기화
        },
        (err) => {
          console.error('Error getting location:', err.message);
          setError(err.message);
        },
        {
          enableHighAccuracy: true, //높은 정확도의 위치 데이터를 요청합니다. (배터리 소모 증가 가능)
          timeout: 10000, // 10초 이내에 위치 가져오기
          maximumAge: 0, // 캐시된 데이터 사용하지 않음
        }
      );
    } else {
      setError('Geolocation API is not supported in this browser.');
    }
  };

  return (
    <div className='location'>
      <button onClick={requestLocation}><img src={gps_icon} alt="내위치" className='gps_icon' /></button>
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
}

export default location