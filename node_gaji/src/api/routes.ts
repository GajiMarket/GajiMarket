import { Express } from 'express'
import path from './pathFinder.index';
import products from './product.index';

const mountRoutes = (app:Express) => {

    app.use('/', products)
    app.use('/navigation', path)
    
}

export default mountRoutes;