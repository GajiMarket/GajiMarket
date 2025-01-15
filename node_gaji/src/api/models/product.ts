export interface IProduct {
    title: string;
    description: string;
    status: string;
    sell_price: number;
    created_at: Date;
    view_count: number;
    location: {lng: number; lat: number;};
    userNo: number;
}