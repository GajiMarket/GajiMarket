import { Express } from 'express'
import path from './pathFinder.index';
import products from './product.index';
import Product_preview from './map.index';

const mountRoutes = (app:Express) => {

    app.use('/', products)
    app.use('/navigation', path)
    app.use('/map', Product_preview)
    
}

export default mountRoutes;