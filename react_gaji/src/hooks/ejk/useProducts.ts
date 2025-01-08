import { useEffect, useState } from "react";
// import { productMarker } from '../../utils/mapUtils';
import { Destination, getProductsList } from "../../api/products.api";

const useProducts = () => {
    const [products, setProducts] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProductsList();
                setProducts(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [])

    return { products, loading, error };
};

export default useProducts;