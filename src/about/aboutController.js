import express from 'express';
import { createAbout, getAbout, updateAbout, deleteAbout } from './aboutService.js';

const router = express.Router();

router.get("/", getAbout);
router.post("/", createAbout);
router.put("/:id", updateAbout);
router.delete("/:id", deleteAbout);

export default router;