import express from 'express';
import { createTestimonials, getTestimonials, updateTestimonials, deleteTestimonials } from './testimonialsService.js';

const router = express.Router();

router.get("/", getTestimonials);
router.post("/", createTestimonials);
router.put("/:id", updateTestimonials);
router.delete("/:id", deleteTestimonials);

export default router;