import React from "react";
import useProducts from "../../hooks/ejk/useProducts";

const ProductsList:React.FC = () => {
    const { products } = useProducts();

    return (
        <div>
            {products.map}
        </div>
    )
}

export default ProductsList;