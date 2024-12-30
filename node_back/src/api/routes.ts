import {Express} from 'express'
import auth from './auth'

const mountRoutes = (app:Express) => {

    app.use('/auth', auth);
}

export default mountRoutes;