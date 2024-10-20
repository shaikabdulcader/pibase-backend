import express from 'express';
import { createCarousal, getCarousal, updateCarousal, deleteCarousal } from './carousalService.js';

const router = express.Router();

router.get("/", getCarousal);
router.post("/", createCarousal);
router.put("/:id", updateCarousal);
router.delete("/:id", deleteCarousal);

export default router;