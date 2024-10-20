import express from 'express';
import { createPosbytz, getPosbytz, updatePosbytz, deletePosbytz } from './posbytzService.js';

const router = express.Router();

router.get("/", getPosbytz);
router.post("/", createPosbytz);
router.put("/:id", updatePosbytz);
router.delete("/:id", deletePosbytz);

export default router;