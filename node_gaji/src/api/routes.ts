import { Express } from 'express'
import auth from './auth'
import path from './pathFinder/pathFinder.index';

const mountRoutes = (app:Express) => {

    app.use('/auth', auth)
    app.use('/pathfinder', path)

}

export default mountRoutes;