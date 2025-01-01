import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/Product_preview.css';
import { Destination, getProductsList } from '../../api/products.api';

const Product_preview: React.FC = () => {

    const navigate = useNavigate();

    const Directions = async () => {
        navigate('/navigation');
    }

    const [products, setProducts] = useState<Destination[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
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
        // console.log(fetchData);
        fetchData();
    }, [])

}

export default Product_preview;