import { Express, Router } from 'express'
import path from './pathFinder.index';
import products from './product.index';
import Product_preview from './map.index';
import { userLocation } from './controller/userLocation.ctrl';
import member from './member.index';
import chatRoutes from '../api/chat.index';
import productListRoutes from "../api/rpoductlist.index";

const mountRoutes = (app:Express) => {

    app.use('/auth', member);

    app.use('/map', Product_preview)

    app.use('/product', products)
    
    app.use('/navigation', path)
    
    app.post('/', userLocation)

    app.use('/chatpage', chatRoutes);

    app.use("/api/products", products);
    
    app.use("/api/productlist", productListRoutes);
}

export default mountRoutes;