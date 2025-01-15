import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/Product_preview.css';


const naviButton:React.FC = () => {
    const navigate = useNavigate();

    const Directions = () => {
        navigate('/navigation');
    }

    return (
        <div>
            <button className='product_preview_navigation' onClick={Directions}>길찾기</button>
        </div>
    );
}

export default naviButton;