export interface mapConfig {
    MAPBOX_TOKEN: string;
    container: string;
    style: string;
    center: [number, number];
    zoom: number;
    defaultLanguage: string;
    attributionControl: boolean;
}

export const mapConfig: mapConfig = {
    MAPBOX_TOKEN: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [126.8821177, 37.4808173],
    zoom: 16,
    defaultLanguage: 'ko',
    attributionControl: false,
};