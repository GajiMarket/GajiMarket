export interface mapConfig {
    defaultStyle: string;
    initialCenter: [number, number];
    initialZoom: number;
    defaultLanguage: string;
}


export const mapConfig: mapConfig = {
    defaultStyle: 'mapbox://styles/mapbox/streets-v11',
    initialCenter: [127.0463292,37.4926982],
    initialZoom: 15,
    defaultLanguage: 'ko',
}