interface Destination {
    id: string;
    name: string;
    coordinates: {
        longitude: number;
        latitude: number;
    };
    description?: string;
}

const description: Destination[] = [
    {
        id: "dest1",
        name: "강남역",
        coordinates: {
            longitude: 127.0281551,
            latitude: 37.4979462
        },
        description: "2호선 강남역 주변"
    },
    {
        id: "dest2",
        name: "판교역",
        coordinates: {
            longitude: 127.1119435,
            latitude: 37.3947664
        },
        description: "판교역 출구 1번"
    },
    {
        id: "dest3",
        name: "광화문",
        coordinates: {
            longitude: 126.9769882,
            latitude: 37.5757627
        },
        description: "광화문 광장"
    }
]

export {
    Destination,
    description,
}