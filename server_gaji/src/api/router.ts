import { Express } from "express";
import pathFinder from './pathFinder/walk.index';

const mountRouters = (app:Express) => {
    app.use('/path_finder', pathFinder)
}

export default mountRouters;