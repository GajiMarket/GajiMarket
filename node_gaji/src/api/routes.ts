import { Express } from 'express'
import path from './pathFinder.index';
import products from './product.index';
// import Product_preview from './map.index';
import { userLocation } from './controller/userLocation.ctrl';
import member from './member.index';

const mountRoutes = (app:Express) => {

    app.use('/auth', member);

    // app.use('/map', Product_preview)
    
    app.post('/', userLocation)

    app.use('/product', products)
    app.use('/navigation', path)


}

export default mountRoutes;