import {Express} from 'express'
import email from './auth'

const mountRoutes = (app:Express) => {

    app.use('/auth', email);
}

export default mountRoutes;