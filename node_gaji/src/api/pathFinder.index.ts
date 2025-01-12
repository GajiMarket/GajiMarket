import express from "express";
import pathFinderAPI from "./service/pathFinder.service";

const router = express.Router();

router.get('/', pathFinderAPI)

export default router
