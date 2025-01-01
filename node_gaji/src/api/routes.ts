import {Express} from 'express'
// import pathFinder from './pathFinder/pathFinder.index';
import user from './user'
import auth from './auth'

const mountRoutes = (app:Express) => {

    app.use('/user', user)
    app.use('/auth', auth)
    
    // app.use('/path_finder', pathFinder)
}

export default mountRoutes;