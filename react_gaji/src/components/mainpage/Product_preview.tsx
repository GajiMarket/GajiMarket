import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/Product_preview.css';
import useProducts from '../../hooks/map/useProducts';

const Product_preview: React.FC = () => {

    const navigate = useNavigate();
    const { products } = useProducts();

    const Directions = async () => {
        navigate('/navigation');
    }

    return (
        <div>
            {products.map((item) => (
                <div key={item.id} className='product_preview'>
                    <p>{item.product_preview_name}</p>
                    <p>{item.product_preview_price}</p>
                    <p>{item.product_preview_explanation}</p>
                    <p>{item.product_preview_distance}</p>
                </div>
            ))}
            <button onClick={Directions} className='product_preview_navigation'>길찾기</button>
        </div>
    );

}

export default Product_preview;