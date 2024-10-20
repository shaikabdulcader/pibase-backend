import express from 'express';
import { createFaq, getFaq, updateFaq, deleteFaq } from './faqService.js';

const router = express.Router();

router.get("/", getFaq);
router.post("/", createFaq);
router.put("/:id", updateFaq);
router.delete("/:id", deleteFaq);

export default router;