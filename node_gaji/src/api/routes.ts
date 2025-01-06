import { Express } from 'express'
import path from './pathFinder.index';
import products from './product.index';
import member from './member.index';

const mountRoutes = (app:Express) => {

    app.use('/', products)
    app.use('/navigation', path)
    app.use('/auth', member);
    
}

export default mountRoutes;