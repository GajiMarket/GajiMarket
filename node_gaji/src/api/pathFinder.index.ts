import express from "express";
import { productPathCtrl } from "./controller/productPath.ctrl";
// import { pathFinderAPI } from "./service/productPath.service";

const router = express.Router();

router.post('/', productPathCtrl)
router.get('/', productPathCtrl)

export default router