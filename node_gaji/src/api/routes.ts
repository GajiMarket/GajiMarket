import {Express} from 'express'
// import pathFinder from './pathFinder/pathFinder.index';
import member from './member'

const mountRoutes = (app:Express) => {

    app.use('/user', user)
    app.use('/auth', auth)
    
    // app.use('/path_finder', pathFinder)
}

export default mountRoutes;