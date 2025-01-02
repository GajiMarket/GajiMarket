export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export interface MapConfig {
    defaultStyle: string;
    initialCenter: [number, number];
    initialZoom: number;
    defaultLanguage: string;
    attributionControl: boolean;
}
export const mapConfig: MapConfig = {
    defaultStyle : 'mapbox://styles/mapbox/streets-v11',
    initialCenter : [126.8821177, 37.4808173],
    initialZoom : 16,
    defaultLanguage: 'ko',
    attributionControl: false,
}