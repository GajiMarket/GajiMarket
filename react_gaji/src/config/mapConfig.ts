export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export interface MapConfig {
    defaultStyle: string;
    initialCenter: [number, number];
    initialZoom: number;
    defaultLanguage: string;
    attributionControl: boolean;
}

export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export const mapConfig = {
    defaultStyle : 'mapbox://styles/mapbox/streets-v11' as string,
    initialCenter : [126.878302 , 37.494589] as [number, number],
    initialZoom : 15 as number,
    defaultLanguage: 'ko' as string,
    attributionControl: false,
}