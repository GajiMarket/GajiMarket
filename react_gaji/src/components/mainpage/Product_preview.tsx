import React from 'react';
import '../../style/Product_preview.css';
import preview_icon from '../../img/preview_icon.png';
import test from '../../img/test.png';
import { useNavigate } from 'react-router-dom';

const Product_preview:React.FC = () => {
    const navigate = useNavigate();

    const Directions = () => {
        navigate('/navigation');
    }

    return (
        <div className='product_preview'>
            <img src={preview_icon} className='product_preview_icon'/>
            <img src={test} className='product_preview_img' />
            <h3 className='product_preview_name'>뜨끈한패딩</h3>
            <p className='product_preview_explanation'>설명쌸라쌸라설명쌸라쌸라설명쌸라쌸라설명쌸라쌸라설명쌸라쌸라설명쌸라쌸라설명쌸라쌸라설명쌸라쌸라설명쌸라쌸라설명쌸라쌸라</p>
            <p className='product_preview_price'>19000원</p>
            <p className='product_preview_distance'>나와거리19M</p>
            <button className='product_preview_navigation' onClick={Directions}>길찾기</button>
        </div>
    )
}
export default Product_preview