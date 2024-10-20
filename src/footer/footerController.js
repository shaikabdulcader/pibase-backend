import express from 'express';
import { createFooter, getFooter, updateFooter, deleteFooter } from './footerService.js';

const router = express.Router();

router.get("/", getFooter);
router.post("/", createFooter);
router.put("/:id", updateFooter);
router.delete("/:id", deleteFooter);

export default router;
