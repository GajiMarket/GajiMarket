export interface ILocation {
    lng: number;
    lat: number;
}

export interface IProduct {
    title: string;
    description: string;
    status: string;
    sell_price: number;
    created_at: Date;
    view_count: number;
    location: ILocation | string;
    // location: {lng: string, lat: string};
    userNo: number;
}