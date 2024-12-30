import express from "express";
import dao from "./pathFinder.dao";

const router = express.Router();

router.get('/path_finder', dao)