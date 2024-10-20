import express from 'express';
import { createSupport, getSupport, updateSupport, deleteSupport } from './service.js';

const router = express.Router();

router.get("/", getSupport);
router.post("/", createSupport);
router.put("/:id", updateSupport);
router.delete("/:id", deleteSupport);

export default router;
