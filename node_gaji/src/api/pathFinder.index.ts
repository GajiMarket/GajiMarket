import express from "express";
import testPath from "./controller/pathFinder.ctrl";

const router = express.Router();

router.get('/path_finder', testPath)

export default router
