import express from 'express'
import compression from 'compression'
import helmet from 'helmet'
import path from 'path'
import mountRoutes from './api/routes'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config();

const app = express();

const corsOptions: any = {
    origins: [`http://localhst:${process.env.FRONT_PORT}`],
    credentials: true
}

app.use(cors(corsOptions));

app.use(express.json());

app.use(helmet());

app.use(compression());

app.use(express.static(path.join(__dirname, 'public')));

mountRoutes(app);

app.get('/', async(req:express.Request, res:express.Response) => {

    res.send('codelab TypeScript API Server');
})

export default app;