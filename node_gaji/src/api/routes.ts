import {Express} from 'express'
import pathFinder from './pathFinder/walk.index';
import auth from './auth'

const mountRoutes = (app:Express) => {

    app.use('/auth', auth)
    
    app.use('/path_finder', pathFinder)
}

export default mountRoutes;