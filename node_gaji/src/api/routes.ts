import { Express } from 'express'
import auth from './auth'
import path from './pathFinder/pathFinder.index';
import product from './products/product.index';

const mountRoutes = (app:Express) => {

    app.use('/', product)
    app.use('/auth', auth)
    app.use('/navigation', path)

}

export default mountRoutes;