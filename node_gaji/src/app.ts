import express from 'express'
import compression from 'compression'
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import chatRoutes from './api/chat.index'
import cookieParser from 'cookie-parser'
import mountRoutes from './api/routes'
import { httpLogger } from './logger'

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("__dirname 경로", __dirname);

const app = express();



app.use(express.json());



app.use(cors({
    origin: [`http://localhost:${process.env.FRONT_PORT}`, `https://test-shpark-dot-winged-woods-442503-f1.du.r.appspot.com`],
    credentials: true
}));

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));


app.use(compression());

// app.use(pinoHttp({logger, // logger를 연결
//     customLogLevel: (req, res, err) => {
//         if (res.statusCode >= 500 || err) return 'error';
//         if (res.statusCode >= 400) return 'warn';


//         return 'info';
//         },
//     })
// );

app.use(httpLogger);
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'dist')));

// const reactPath = path.join(__dirname, '..', 'react_gaji', 'dist');

const distPath = path.join(__dirname, 'dist');

// console.log("reactPath", reactPath);


app.use(express.static(distPath));



app.use('/api/chat', chatRoutes);

mountRoutes(app);

// app.get('/', async (req: express.Request, res: express.Response) => {
//     if(process.env.NODE_ENV === 'production') {
//         res.sendFile(path.join(reactPath, 'index.html'));
//     } else {
//         // res.log.info('Root route accessed');
//         res.json({message: 'GajiMarket API Server'});
//         // res.send('GajiMarket API Server');

//     }

// });

app.get('/', async (req: express.Request, res: express.Response) => {
    res.json({message: 'GajiMarket API Server'});
});

app.get("*", (req: express.Request, res: express.Response) => {
    
    res.sendFile(path.join(distPath, 'index.html'));
});

// process.env.NODE_ENV === 'production' ? app.get('*', (req, res) => { res.sendFile(path.join(reactPath, 'index.html'));}) : app.get('/', async (req: express.Request, res: express.Response) => { res.log.info('Root route accessed'); res.json({ message: 'gcloud API server' }); /*res.send('GajiMarket API Server');*/ })



// app.get('/favicon.ico', (req, res) => {
//     res.status(204).end(); // 빈 응답을 반환 (204 No Content)
//   });

// app.get('*', (req, res) => {

//         res.sendFile(path.join(reactPath, 'index.html'));

//     });



// app.get('/test', async (req: express.Request, res: express.Response) => {
//     req.log.info('Test route accessed');
//     res.send('Testing Pino Logging');
// })



export default app;