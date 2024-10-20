import express from 'express';
import { createHome, getHome, updateHome, deleteHome } from './homeService.js';

const router = express.Router();

router.get("/", getHome);
router.post("/", createHome);
router.put("/:id", updateHome);
router.delete("/:id", deleteHome);

export default router;