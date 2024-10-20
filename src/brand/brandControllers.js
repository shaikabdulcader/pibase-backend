import express from 'express';
import { createBrand, getBrand, updateBrand, deleteBrand } from './brandService.js';

const router = express.Router();

router.get("/", getBrand);
router.post("/", createBrand);
router.put("/:id", updateBrand);
router.delete("/:id", deleteBrand);

export default router;