import {create} from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';
import mapboxgl from "mapbox-gl";




interface IProductProps {
    // image: string | null;
    // setImage:(image: string) => void;
    userMarker: mapboxgl.Marker | null;
    userLocation: [lng: number, lat: number] | null;
    profileNick: string | null;
    mapInstance: mapboxgl.Map | null;
    error: string | null;
    setError: (error: string) => void;
    setMapInstance: (mapInstance: mapboxgl.Map) => void;
    setProfileNick: (profileNick: string) => void;
    setUserMarker: (userMarker: mapboxgl.Marker) => void; 
    setUserLocation: (userLocation: [lat: number, lng: number]) => void;

}

type ProductProps = Partial<IProductProps>

const productStroe = create<ProductProps>()
    ((set) => ({
    userMarker: null,
    userLocation: null,
    profileNick: null,
    mapInstance: null,
    error: null,
    setError: (error) => set({error}),
    setMapInstance: (mapInstance) => set({mapInstance}),
    setProfileNick: (profileNick) => set({profileNick}),
    setUserMarker: (userMarker) => set({userMarker}),
    setUserLocation: (userLocation) => set({userLocation})
    
}),

// { // 세션에 저장할 키이름과 storage 설정
//     name: 'map-storage',
//     storage: {
//     getItem: (name: string) => {
//         const value = sessionStorage.getItem(name);
//         return value ? JSON.parse(value) : null;
//     },
//     setItem: (name: string, value: {}) => {
//         sessionStorage.setItem(name, JSON.stringify(value));
//     },
//     removeItem: (name: string) => sessionStorage.removeItem(name)
// },
//     partialize: (state) => ({mapInstance: state.mapInstance})
// }

);

// storage: {
//     getItem: (name: string) => {
//         const value = sessionStorage.getItem(name);
//         return value ? JSON.parse(value) : null;
//     },
//     setItem: (name: string, value: {}) => {
//         sessionStorage.setItem(name, JSON.stringify(value));
//     },
//     removeItem: (name: string) => sessionStorage.removeItem(name)
// }/*as PersistStorage<string>*/,

export default productStroe