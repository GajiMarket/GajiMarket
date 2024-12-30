export interface mapConfig {
    defaultStyle: string;
    initialCenter: [number, number];
    initialZoom: number;
    defaultLanguage: string;
    attributionControl: boolean;
}

export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export const mapConfig: mapConfig = {
    defaultStyle : 'mapbox://styles/mapbox/streets-v11',
    initialCenter : [126.878302 , 37.494589],
    initialZoom : 15,
    defaultLanguage: 'ko',
    attributionControl: false,
}