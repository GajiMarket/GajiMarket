import express from 'express'
import compression from 'compression'
import helmet from 'helmet'
import path from 'path'
import mountRouters from 'api/router'

const app = express()

app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')))

mountRouters(app);

export default app;