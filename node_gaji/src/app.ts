import express from 'express'
import compression from 'compression'
import helmet from 'helmet'
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import chatRoutes from './api/chat'
import pinoHttp from 'pino-http'
import mountRoutes from './api/routes'
import logger from './logger'

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

app.use(pinoHttp({logger, // logger를 연결
    customLogLevel: (req, res, err) => {
        if (res.statusCode >= 500 || err) return 'error';
        if (res.statusCode >= 400) return 'warn';

        return 'info';
        },
    })
);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/chat', chatRoutes);

mountRoutes(app);

app.get('/', async(req:express.Request, res:express.Response) => {

    res.log.info('Root route accessed');
    res.send('GajiMarket API Server');
})


app.get('/test', async (req:express.Request, res:express.Response) => {
    req.log.info('Test route accessed');
    res.send('Testing Pino Logging');
})



export default app;