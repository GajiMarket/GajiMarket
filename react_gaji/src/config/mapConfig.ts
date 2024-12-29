export interface mapConfig {
    defaultStyle: string;
    initialCenter: [number, number];
    initialZoom: number;
    dafaultLanguage: string;
}

export const mapConfig: mapConfig = {
    defaultStyle : 'mapbox://styles/mapbox/light-v11',
    initialCenter : [126.878302 , 37.494589],
    initialZoom : 15, 
    dafaultLanguage: 'ko',
}