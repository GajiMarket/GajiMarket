export interface Destination {
    id: string;
    product_preview_name: string;
    product_preview_explanation: string;
    product_preview_price: string;
    coordinates: {
        longitude: number;
        latitude: number;
    };
    product_preview_distance: string;
}

export const getProductsList = async(): Promise<Destination[]> => {
    const response = await fetch('http://localhost:8000');
    if (!response.ok) {
        throw new Error('Failed to fetch product data');
    }
    return response.json();
}