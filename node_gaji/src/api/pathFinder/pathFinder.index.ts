import express from "express";
import testPath from "./pathFinder.ctrl";

const router = express.Router();

router.get('/testpath', testPath)

export default router;