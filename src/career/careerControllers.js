import express from 'express';
import { createCareer, getCareer, updateCareer, deleteCareer } from './careerService.js';

const router = express.Router();

router.get("/", getCareer);
router.post("/", createCareer);
router.put("/:id", updateCareer);
router.delete("/:id", deleteCareer);

export default router;