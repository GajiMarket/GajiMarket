import { Express } from 'express'
import path from './pathFinder.index';
import products from './product.index';
import { userLocation } from './controller/userLocation.ctrl';

const mountRoutes = (app:Express) => {
    
    app.post('/', userLocation)

    app.use('/product', products)
    app.use('/navigation', path)


}

export default mountRoutes;