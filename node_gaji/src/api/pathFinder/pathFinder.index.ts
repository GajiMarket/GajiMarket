import express from "express";
import Path from "./pathFinder.ctrl";

const router = express.Router();

router.get('/', Path)

export default router
