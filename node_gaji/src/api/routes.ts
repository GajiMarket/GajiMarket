import {Express} from 'express'
import path from './pathFinder.index';
import product from './product.index';

const mountRoutes = (app:Express) => {

    app.use('/', product)

    app.use('/navigation', path)
    
}

export default mountRoutes;