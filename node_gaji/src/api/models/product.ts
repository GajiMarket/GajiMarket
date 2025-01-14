export interface IProduct {
    product_id: number;
    title: string;
    description: string;
    status: string;
    sell_price: number;
    created_at: Date;
    view_count: number;
    location: {lng: number; lat: number;};
    member_no: number;
}